/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */

export const buildIndex = (index) => {
    const fabricOptions = {};
    for (const leadTime of index.fabrics) {
        const fabrics = {};
        for (const group of leadTime.groups) {
            for (const item of group.items) {
                fabrics[item.id] = {
                    ...item,
                    pieces: Object.fromEntries(item.pieces.map((piece) => [`${piece.key}_${piece.type}`, piece])),
                };
            }
        }
        fabricOptions[leadTime.code] = fabrics;
    }
    index.fabricOptions = fabricOptions;
};
