/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */

export const buildIndex = (index) => {
    index.steps = index.steps || {};
    for (const step of index.type.steps) {
        const data = index.steps[step.code];
        if (data) {
            Object.assign(step, data);
        } else {
            index.steps[step.code] = {};
        }
    }
    index.messages = index.messages || {};
    index.global = index.global || {};

    const fills = Object.fromEntries(
        (index.inserts || []).map((insert) => [
            insert.code,
            {
                ...insert,
                pieces: Object.fromEntries(insert.pieces.map((piece) => [`${piece.key}_${piece.type}`, piece])),
            },
        ]),
    );
    const fillCandidates = [index.params?.fill, index.config?.fill, Object.keys(fills)[0]].filter(Boolean);
    index.defaultFill = fillCandidates.find((fill) => fills[fill]);
    index.fills = fills;

    const fabrics = index.fabrics.map((leadType) =>
        leadType.groups.flatMap((group) => group.items).map((item) => item.id),
    );
    const fabricCandidates = [index.params?.fabric, index.config?.fabric, ...fabrics.map((ids) => ids[0])]
        .filter(Boolean)
        .map(Number);
    index.defaultFabricId = fabricCandidates.find((fabric) => fabrics.some((ids) => ids.includes(fabric)));
    index.defaultFabricLeadTime = index.fabrics[fabrics.findIndex((ids) => ids.includes(index.defaultFabricId))].code;

    const priceRules = index.priceRules.sort((rule1, rule2) => {
        const priorityDiff = rule1.priority - rule2.priority;
        if (priorityDiff !== 0) {
            return priorityDiff;
        }
        return rule2.minQty - rule1.minQty;
    });
    index.priceRules = priceRules;
    index.objectPriceRules = priceRules.filter((rule) => rule.action === 'percent_discount');
    index.totalPriceRules = priceRules.filter((rule) => rule.action === 'spend_x_get_y');
    index.isConfigureMode = !!index.params?.edit;
};
