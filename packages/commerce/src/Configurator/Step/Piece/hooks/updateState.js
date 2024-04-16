/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { INIT, LOAD } from '../../../Context/State';
import { SET_PIECE } from '../constants';

export const updateState = (
    state,
    { pieces: indexPieces, saved, defaultConfiguration },
    { type: actionType = null, value },
) => {
    switch (actionType) {
        case INIT: {
            let piece = Object.keys(indexPieces)[0];
            if (defaultConfiguration) {
                const loadByKey = !defaultConfiguration.includes('-');
                for (const pieceKey in indexPieces) {
                    const { key, type } = indexPieces[pieceKey];
                    const compareString = loadByKey ? key : `${key}-${type}`;
                    if (compareString === defaultConfiguration) {
                        piece = pieceKey;
                        break;
                    }
                }
            }
            state.piece = piece;
            state.pieces = getPieces(piece);
            break;
        }
        case LOAD: {
            const { items = [] } = saved;
            for (const { type = null, key = null } of items) {
                if (indexPieces[`${key}_${type}`]) {
                    state.piece = `${key}_${type}`;
                }
            }
            state.pieces = getPieces(state.piece);
            break;
        }
        case SET_PIECE: {
            state.piece = value;
            state.pieces = getPieces(state.piece);
            break;
        }
    }
};

const getPieces = (piece) => {
    const pieces = {};
    pieces[piece] = 1;
    return pieces;
};
