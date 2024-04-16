/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { INIT, LOAD } from '../../../Context/State';
import {
    DECREMENT_OPTION_QTY,
    INCREMENT_OPTION_QTY,
    SET_OPTION_QTY,
    TYPE_STORAGE_SEAT,
    TYPE_SUBWOOFER,
} from '../constants';
import { SET_CONFIGURATION, SET_PIECES, RESET_CONFIGURATION } from '../../Configure/constants';

export const updateState = (
    state,
    index,
    { type: actionType = null, code: actionCode = null, value = null, isTest = null },
) => {
    switch (actionType) {
        case INIT:
        case RESET_CONFIGURATION: {
            state.options = {};
            for (const code of Object.keys(index.options)) {
                state.options[code] = {
                    qty: 0,
                    minQty: 0,
                    maxQty: Number.MAX_SAFE_INTEGER,
                };
            }
            break;
        }
        case LOAD: {
            const { items = [] } = index.saved;
            for (const { type = null, key = null } of items) {
                let code = type;
                if (type === 'seat' && ['storage', 'deepStorage'].includes(key)) {
                    code = TYPE_STORAGE_SEAT;
                }
                if (state.options[code]) {
                    state.options[code].qty += 1;
                }
            }
            break;
        }
        case INCREMENT_OPTION_QTY:
        case DECREMENT_OPTION_QTY:
        case SET_OPTION_QTY: {
            const item = getOptionCopy(state, actionCode);
            if (item) {
                item.prevQty = item.qty;
                if (actionType === INCREMENT_OPTION_QTY) {
                    item.qty = item.qty + 1;
                } else if (actionType === DECREMENT_OPTION_QTY) {
                    item.qty = item.qty - 1;
                } else {
                    item.qty = parseInt(value, 10);
                }
                if (isNaN(item.qty)) {
                    item.qty = item.minQty;
                }
                item.qty = Math.min(Math.max(item.qty, item.minQty), item.maxQty);
            }
            break;
        }
    }

    switch (actionType) {
        case INIT:
        case LOAD:
        case SET_CONFIGURATION:
        case SET_PIECES:
        case INCREMENT_OPTION_QTY:
        case DECREMENT_OPTION_QTY:
        case SET_OPTION_QTY: {
            const storageSeat = getOptionCopy(state, TYPE_STORAGE_SEAT);
            const subwoofer = getOptionCopy(state, TYPE_SUBWOOFER);
            if (storageSeat) {
                const standardSeat = state.pieces.standard_seat || 0;
                const deepSeat = state.pieces.deep_seat || 0;
                storageSeat.maxQty = standardSeat + deepSeat;
                storageSeat.qty = Math.min(Math.max(storageSeat.qty, storageSeat.minQty), storageSeat.maxQty);
            }

            if (subwoofer) {
                subwoofer.maxQty = Math.max(storageSeat.maxQty - 1 - storageSeat.qty, subwoofer.minQty);
                subwoofer.prevQty = subwoofer.qty;
                subwoofer.qty = Math.min(Math.max(subwoofer.qty, subwoofer.minQty), subwoofer.maxQty);
                if (actionType === SET_PIECES && !isTest) {
                    // we have another popup for Delete button on CYO, prevent showing both
                    subwoofer.prevQty = subwoofer.qty;
                }
            }
            break;
        }
    }
};

const getOptionCopy = (state, type) => {
    state.options = { ...state.options };
    if (state.options[type]) {
        state.options[type] = { ...state.options[type] };
        return state.options[type];
    }
    return null;
};
