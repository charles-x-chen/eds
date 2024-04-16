/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { INIT, LOAD } from '../../../Context/State';
import { SET_PIECES } from '../constants';

export const updateState = (state, { pieces: indexPieces, saved }, { type: actionType = null, value = null }) => {
    switch (actionType) {
        case INIT: {
            state.pieces = getCustomPieces({}, indexPieces);
            break;
        }
        case LOAD: {
            const { items = [] } = saved;
            state.pieces = items.reduce((acc, item) => {
                const typeKey = `${item.key}_${item.type}`;
                acc[typeKey] = (acc[typeKey] || 0) + 1;
                return acc;
            }, {});
            break;
        }
        case SET_PIECES: {
            state.pieces = getCustomPieces(value, indexPieces);
            break;
        }
    }
};

const getCustomPieces = (newPieces, indexPieces) => {
    const pieces = {};
    for (const pieceKey in indexPieces) {
        pieces[pieceKey] = newPieces[pieceKey] || 0;
    }
    return pieces;
};
