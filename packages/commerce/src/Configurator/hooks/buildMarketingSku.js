/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */

export const buildMarketingSku = (code, index, pieces, state, useConfiguration = false) => {
    const { configuration = null, fabricId = null, piece = null, fill = null } = state;
    const seatCount = pieces.standard_seat + pieces.deep_seat + pieces.storage_seat + pieces.wedge_seat;
    const sideCount = pieces.standard_side + pieces.deep_side + pieces.rollArm_side;
    let sku = '';

    if (useConfiguration && configuration) {
        return `${configuration.split('_')[0]}_${fabricId}`;
    }

    switch (code) {
        case 'sactional':
        case 'sactionalPiece':
        case 'sactionalCovers':
        case 'sactionalCover': {
            if (seatCount && sideCount) {
                sku += `${seatCount}Seat${seatCount > 1 ? 's' : ''}`;
                sku += `${sideCount}Side${sideCount > 1 ? 's' : ''}`;
            } else {
                sku += getPieceName(pieces);
                if (fill) {
                    sku += 'InsertCover';
                    sku += ucfirst(fill);
                } else {
                    sku += 'Cover';
                }
            }
            sku += `_${fabricId}`;
            return sku;
        }

        case 'outdoorSactional': {
            if (pieces.standard_outdoor_seat) {
                sku += `${pieces.standard_outdoor_seat}Seat${pieces.standard_outdoor_seat > 1 ? 's' : ''}`;
            }
            if (pieces.standard_outdoor_side) {
                sku += `${pieces.standard_outdoor_side}Side${pieces.standard_outdoor_side > 1 ? 's' : ''}`;
            }

            sku += `Outdoor_${fabricId}`;
            return sku;
        }

        default: {
            if (configuration) {
                return `${configuration.split('_')[0]}_${fabricId}`;
            }

            if (piece) {
                const { key } = index.pieces[piece];
                return `${ucfirst(key)}${code.includes('Cover') ? 'Cover' : ''}_${fabricId}`;
            }

            return null;
        }
    }
};

const ucfirst = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const getPieceName = (pieces) => {
    for (const pieceKey in pieces) {
        if (pieces[pieceKey] > 0) {
            const [key, type] = pieceKey.replace('_outdoor', '').split('_');
            if (key === 'standard') {
                return ucfirst(type);
            }
            return ucfirst(key) + ucfirst(type);
        }
    }
    return null;
};
