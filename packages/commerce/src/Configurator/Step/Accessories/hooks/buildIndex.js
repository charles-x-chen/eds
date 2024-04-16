/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */

export const buildIndex = (index) => {
    index.accessoryList = index.accessories;
    index.accessories = index.accessoryList.reduce((acc, item, index) => {
        const {
            piece: { type, key },
        } = item;
        acc[type] = acc[type] || {};
        acc[type][key] = item;
        item.sortOrder = index;
        return acc;
    }, {});

    /*if (shouldHideAccessoriesStep(index)) {
        type.steps = type.steps.filter(({ code }) => code !== 'accessories');
    }*/
};

/*const shouldHideAccessoriesStep = ({ preBuilt = null }) => {
    if (preBuilt) {
        const preBuiltSkus = Object.keys(preBuilt);
        if (preBuiltSkus.length === 1) {
            const preBuiltSku = preBuiltSkus[0];
            const { pieces } = preBuilt[preBuiltSku];
            if (pieces) {
                for (const key in pieces) {
                    if (pieces[key] > 0 && key.toLowerCase().includes('angled_sidepillow')) {
                        return true;
                    }
                }
                return false;
            }
        }
    }
    return false;
};*/
