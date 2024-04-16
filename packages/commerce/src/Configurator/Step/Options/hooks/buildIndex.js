/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */

export const buildIndex = (index) => {
    index.optionList = index.options;
    index.options = index.optionList.reduce((acc, item) => {
        const {
            piece: { type },
        } = item;
        acc[type] = item;
        return acc;
    }, {});
    /*if (index.preBuilt.angledSidePillow || index.preBuilt.acousticAngledSidePillow) {
        type.steps = type.steps.filter(({ code }) => code !== 'options');

        return;
    }*/
};
