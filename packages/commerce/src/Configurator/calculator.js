/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */

export const getPiecesTitle = (index, { pieces: statePieces }) => {
    const theOnlyPiece = Object.values(statePieces).filter((qty) => qty > 0).length <= 1;

    const pieceQtys = {};
    for (const pieceKey in statePieces) {
        const qty = statePieces[pieceKey];
        const [key, type] = pieceKey.replace('_outdoor', '').split('_');
        if (!pieceQtys[type]) {
            pieceQtys[type] = {};
        }
        pieceQtys[type][key] = qty;
    }

    const titleParts = [];
    for (const type in pieceQtys) {
        if (type.includes('Pillow') && !theOnlyPiece) {
            continue;
        }

        const titleExtra = [];
        const typeQtys = pieceQtys[type];
        let qty = 0;
        for (const key in typeQtys) {
            const pieceQty = typeQtys[key];
            if (pieceQty > 0) {
                qty += pieceQty;
                if (key !== 'standard') {
                    titleExtra.push(`${pieceQty} ${capitalize(key)}`);
                }
            }
        }

        if (qty > 0) {
            let titlePart = `${qty} ${capitalize(type)}${qty >= 2 ? 's' : ''}`;
            if (titleExtra.length) {
                titlePart += ` (${titleExtra.join(' + ')})`;
            }
            titleParts.push(titlePart);
        }
    }

    return titleParts.join(' + ');
};

export const capitalize = (str, lower = false) => {
    const matchedString = (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
        match.toUpperCase(),
    );

    return matchedString.replace(/([a-z])([A-Z])/g, '$1 $2');
};

export const calculateTotalPrice = (index, options) => {
    const objects = calculateObjectPrices(index, options);

    let total = 0;
    let msrp = 0;

    for (const object of objects) {
        total += object.rowTotal;
        msrp += object.msrpTotal;
    }

    const discount = getTotalRuleDiscount(index, objects);
    total -= discount;

    total = Math.max(0, total);
    total = Math.round((total + Number.EPSILON) * 100) / 100;
    msrp = Math.max(0, msrp);
    msrp = Math.round((msrp + Number.EPSILON) * 100) / 100;

    return {
        total,
        msrp,
        objects,
    };
};

const calculateObjectPrices = (index, options) => {
    const objects = getObjects(index, options);
    const priceRules = getObjectPriceRules(index, objects);

    for (const object of objects) {
        let { price, msrp } = object;
        msrp = Math.max(msrp || 0, price);

        if (price > 0) {
            const rulePrice = getObjectRulePrice(object, priceRules, msrp);
            if (rulePrice !== null) {
                price = Math.min(price, rulePrice);
            }
        }

        object.calculatedMsrp = msrp;
        object.calculatedPrice = price;
        object.msrpTotal = msrp * object.qty;
        object.rowTotal = price * object.qty;
    }
    return objects;
};

const getObjects = (index, options) => {
    const { defaultFill } = index;
    const {
        fill = defaultFill,
        fabricId = null,
        fabricLeadTime = null,
        coversOnly = false,
        pieces = {},
        qty: qtyMultiplier = 1,
    } = options;
    const { fabricOptions, fills } = index;

    const result = [];

    for (const [code, qty] of Object.entries(pieces)) {
        if (qty <= 0) {
            continue;
        }

        let first = true;

        if (!coversOnly) {
            const fillObject = fills[fill].pieces[code] || fills['standard'].pieces[code];
            if (fillObject) {
                result.push({
                    ...fillObject,
                    qty: qty * qtyMultiplier,
                    originalQty: qty,
                    first,
                });
                first = false;
            }
        }

        if (fabricId) {
            const coverObject = fabricOptions?.[fabricLeadTime]?.[fabricId]?.pieces?.[code];
            if (coverObject) {
                result.push({
                    ...coverObject,
                    qty: qty * qtyMultiplier,
                    originalQty: qty,
                    first,
                });
            }
        }
    }

    if (options.objects) {
        for (const data of options.objects) {
            let newObject = null;

            if (data.length) {
                const [object, qty, first = true] = data;
                newObject = { ...object, qty, first };
            } else if (data.qty) {
                newObject = { ...data };
            }

            if (newObject) {
                if (newObject.options) {
                    result.push({ ...newObject, price: 0, first: true });
                    for (const option of newObject.options) {
                        if (option.replace) {
                            // replace stealthtech inserts
                            const replace = result.find((object) => object.sku === option.replace);
                            if (replace) {
                                replace.qty = Math.max(replace.qty - option.qty, 0);
                            }
                        }
                        result.push({ ...option.piece, qty: option.qty, first: false });
                    }
                } else {
                    result.push(newObject);
                }
            }
        }
    }

    return result;
};

const getObjectSkuMap = (objects, prop) => {
    const skuMap = {};
    for (const object of objects) {
        if (object.sku) {
            if (!skuMap[object.sku]) {
                skuMap[object.sku] = 0;
            }
            skuMap[object.sku] += object[prop];
        }
    }
    return skuMap;
};

const getObjectPriceRules = (index, objects) => {
    const skuQtyMap = getObjectSkuMap(objects, 'qty');
    return index.objectPriceRules.filter((rule) => {
        if (rule.minQty >= 1) {
            const qty = getRuleSkuMapSum(rule, skuQtyMap);
            return qty >= rule.minQty;
        }
        return true;
    });
};

const getObjectRulePrice = (object, priceRules, regularPrice) => {
    const priceRule = priceRules.find((rule) =>
        rule.categoryIds.find((categoryId) => object.categoryIds.includes(categoryId)),
    );
    if (priceRule) {
        const discountAmount = Math.min(Math.max(priceRule.discount, 0), 100);
        const cartRulePrice = regularPrice * (1 - discountAmount / 100);
        return Math.round((cartRulePrice + Number.EPSILON) * 100) / 100;
    }
    return null;
};

const getTotalRuleDiscount = (index, objects) => {
    const skuPriceMap = getObjectSkuMap(objects, 'rowTotal');
    const priceRule = index.totalPriceRules.find((rule) => {
        const price = getRuleSkuMapSum(rule, skuPriceMap);
        return price >= rule.minQty;
    });
    if (priceRule) {
        const step = priceRule.minQty;
        const price = getRuleSkuMapSum(priceRule, skuPriceMap);
        const timesToApply = Math.floor(price / Math.max(1, step));
        const discount = timesToApply * price.discountAmount;
        return Math.round((discount + Number.EPSILON) * 100) / 100;
    }
    return 0;
};

const getRuleSkuMapSum = ({ skus }, skuMap) => {
    let value = 0;
    for (const sku in skus) {
        if (skuMap[skus[sku]]) {
            value += skuMap[skus[sku]];
        }
    }
    return value;
};

export const getPiecesStepTitle = ({ pieces = null }) => {
    const piecesArray = [];
    const theOnlyPiece = Object.values(pieces).filter((qty) => qty > 0).length <= 1;

    for (const [key, value] of Object.entries(pieces)) {
        if (value > 0 && (theOnlyPiece || !key.includes('Pillow'))) {
            const label = key.split('_');
            piecesArray.push(capitalize(`${value} ${label[0]} ${label[1]}${value >= 2 ? 's' : ''}`));
        }
    }

    return piecesArray.join(' + ');
};
