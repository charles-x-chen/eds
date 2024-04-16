/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';

export const buildIndex = (index) => {
    index.defaultConfiguration = index.params?.configuration || index.config?.configuration;
    index.pieces = index.pieceInfo.reduce((acc, info) => {
        const { key, type } = info;
        acc[`${key}_${type}`] = info;
        return acc;
    }, {});
    index.piecesGroups = index.pieceInfo.reduce((groups, piece) => {
        const { type } = piece;
        if (!['sidePillow', 'backPillow'].includes(type)) {
            groups[type] = groups[type] || [];
            groups[type].push(piece);
        }
        return groups;
    }, {});
    index.summaryStepTitle = t`Your Sactionals Covers`;
};
