/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */

export const buildIndex = (index) => {
    index.defaultConfiguration = index.params?.configuration || index.config?.configuration;
    index.pieces = index.pieceInfo.reduce((acc, info) => {
        const { key, type } = info;
        acc[`${key}_${type}`] = info;
        return acc;
    }, {});
};
