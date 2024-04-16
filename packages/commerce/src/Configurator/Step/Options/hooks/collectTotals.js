/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { TYPE_STORAGE_SEAT } from '../constants';

export const collectTotals = ({ options: prevOptions }, { options: stateOptions }, { options: indexOptions }) => {
    const objects = prevOptions.objects ? [...prevOptions.objects] : [];
    const options = { ...prevOptions, objects };

    const types = {};
    for (const code in stateOptions) {
        const { qty } = stateOptions[code];
        if (qty > 0) {
            if (code === TYPE_STORAGE_SEAT) {
                /* eslint camelcase: off */
                options.pieces = { ...options.pieces };

                const storageSeatQty = Math.min(options.pieces.standard_seat, qty);
                options.pieces.standard_seat -= storageSeatQty;
                options.pieces.storage_seat += storageSeatQty;

                if (qty > storageSeatQty) {
                    const deepStorageSeatQty = Math.min(options.pieces.deep_seat, qty - storageSeatQty);
                    options.pieces.deep_seat -= deepStorageSeatQty;
                    options.pieces.deepStorage_seat += deepStorageSeatQty;
                }
            } else {
                const { piece } = indexOptions[code];
                objects.push([piece, qty]);
            }
            types[code] = qty;
        }
    }

    return {
        options,
        types,
        title: types[TYPE_STORAGE_SEAT] > 0 ? `Storage Seat (x${types[TYPE_STORAGE_SEAT]})` : null,
    };
};
