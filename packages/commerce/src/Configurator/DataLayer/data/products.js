/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { getPiecesTitle } from '../../calculator';
import { buildMarketingSku } from '../../hooks/buildMarketingSku';

export const products = (index, stateContext, totalsContext) => {
    const {
        type: { code },
    } = index;
    const {
        state: { fabricId, fabricLeadTime },
        state,
    } = stateContext;
    const {
        total: price,
        last: {
            options,
            options: { pieces },
        },
    } = totalsContext;
    const variant = index.fabricOptions?.[fabricLeadTime]?.[fabricId]?.fabricName;

    return [
        {
            name: getPiecesTitle(index, options),
            id: buildMarketingSku(code, index, pieces, state),
            price,
            brand: 'LoveSac',
            category: code.replace('Piece', '').replace('Cover', ''),
            variant,
        },
    ];
};
