/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */

export const buildIndex = (index) => {
    index.accessoryList = index.accessories;

    const squattoman = index.squattoman?.inserts?.[0]?.pieces?.[0];
    if (squattoman) {
        index.accessoryList.unshift({
            piece: squattoman,
            name: 'Squattoman',
            description: null,
            images: [],
        });

        index.squattoman.insert = squattoman;

        const fabricOptions = {};
        for (const leadTime of index.squattoman.fabrics) {
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
        index.squattoman.fabricOptions = fabricOptions;
    }

    index.accessories = index.accessoryList.reduce((acc, item, index) => {
        const {
            piece: { type, key },
        } = item;
        acc[type] = acc[type] || {};
        acc[type][key] = item;
        item.sortOrder = index;
        return acc;
    }, {});
};
