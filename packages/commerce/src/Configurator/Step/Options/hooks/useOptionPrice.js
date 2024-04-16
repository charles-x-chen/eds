/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useMemo } from 'preact/hooks';
import { useTotalsContext } from '../../../Context/Totals';
import { TYPE_STORAGE_SEAT } from '../constants';
import { calculateTotalPrice } from '../../../calculator';
import { useConfiguratorContext } from '../../../Context/Configurator';

export const useOptionPrice = (option, qty) => {
    const {
        modules: {
            options: { prevTotal },
        },
    } = useTotalsContext();
    const index = useConfiguratorContext();

    return useMemo(() => {
        const options = getOptionsForTotals(option, prevTotal, qty);
        const { total, msrp, objects } = calculateTotalPrice(index, options);

        if (option.piece.type !== TYPE_STORAGE_SEAT) {
            const object = objects?.slice(-1)?.[0];
            if (object) {
                return { price: object.rowTotal / qty, msrp: object.msrpTotal / qty };
            }
        }

        return {
            price: (total - prevTotal.total) / qty,
            msrp: (msrp - prevTotal.msrp) / qty,
        };
    }, [prevTotal, index, option, qty]);
};

const getOptionsForTotals = (option, prevTotal, qty) => {
    const options = { ...prevTotal.options };
    if (option.piece.type === TYPE_STORAGE_SEAT) {
        const pieces = { ...options.pieces };
        options.pieces = pieces;
        /* eslint camelcase: off */
        const storageSeatQty = Math.min(pieces.standard_seat, qty);
        pieces.standard_seat -= storageSeatQty;
        pieces.storage_seat += storageSeatQty;
        if (qty > storageSeatQty) {
            const deepStorageSeatQty = Math.min(pieces.deep_seat, qty - storageSeatQty);
            pieces.deep_seat -= deepStorageSeatQty;
            pieces.deepStorage_seat += deepStorageSeatQty;
        }
    } else {
        options.objects = options.objects ? [...options.objects] : [];
        options.objects.push([option.piece, qty]);
    }
    return options;
};
