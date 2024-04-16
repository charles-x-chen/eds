/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { getPiecesTitle } from '../../calculator';
import { buildMarketingSku } from '../../hooks/buildMarketingSku';
import { getEdgeUrl } from '~/Api/Url';

export const configuration = (index, stateContext, totalsContext, shareCode) => {
    const {
        type: { code, steps },
        config: { basePath },
    } = index;
    const {
        last: { options },
        modules,
        total: price,
    } = totalsContext;
    const { state } = stateContext;
    const { pieces } = options;

    const sharingcode = shareCode || index?.saved?.shareCode || null;

    return {
        sku: buildMarketingSku(code, index, pieces, state, false),
        remarketingSku: buildMarketingSku(code, index, pieces, state, true),
        name: getPiecesTitle(index, options),
        description: getDescription(steps, modules),
        sharingcode,
        type: code.replace('Piece', '').replace('Cover', ''),
        items: Object.fromEntries(Object.entries(pieces).filter(([, qty]) => qty > 0)),
        price,
        url: getEdgeUrl(sharingcode ? `${basePath}/id/${sharingcode}` : basePath),
    };
};

const getDescription = (steps, modules) => {
    return steps
        .map(({ code = null, title = null }) => {
            if (modules?.[code]?.title) {
                return `${title}: ${modules?.[code]?.title}`;
            }
        })
        .join('|');
};
