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
    { type: actionType = null, value = null },
) => {
    switch (actionType) {
        case INIT: {
            let piece = Object.keys(indexPieces)[0];
            for (const pieceKey in indexPieces) {
                if (indexPieces[pieceKey].key === defaultConfiguration) {
                    piece = pieceKey;
                    break;
                }
            }
            state.piece = piece;
            // Cover step uses pieces
            state.pieces = getPieces(piece);
            break;
        }
        case LOAD: {
            const { items = [] } = saved;
            for (const { type = null, key = null } of items) {
                if (indexPieces[`${key}_${type}`]) {
                    const piece = `${key}_${type}`;
                    state.piece = piece;
                    state.pieces = getPieces(piece);
                    break;
                }
            }
            break;
        }
        case SET_PIECE: {
            state.piece = value;
            // Cover step uses pieces
            state.pieces = getPieces(value);
            break;
        }
    }
};

const getPieces = (piece) => {
    const pieces = {};
    pieces[piece] = 1;
    return pieces;
};
