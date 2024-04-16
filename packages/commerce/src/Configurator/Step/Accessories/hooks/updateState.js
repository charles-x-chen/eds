/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { INIT, LOAD } from '../../../Context/State';
import {
    DECREMENT_ACCESSORY_QTY,
    INCREMENT_ACCESSORY_QTY,
    SELECT_ACCESSORY_VARIANT,
    SET_ACCESSORY_QTY,
} from '../constants';
import { RESET_CONFIGURATION } from '../../Configure/constants';

export const updateState = (state, index, action) => {
    switch (action.type) {
        case INIT:
        case RESET_CONFIGURATION: {
            const indexAccessories = index.accessories;
            const stateAccessories = {};
            for (const type in indexAccessories) {
                stateAccessories[type] = {
                    key: Object.keys(indexAccessories[type])[0],
                    qty: 0,
                };
            }
            state.accessories = stateAccessories;
            break;
        }
        case LOAD: {
            const { items = [] } = index.saved;
            for (const { type = null, key = null } of items) {
                if (state.accessories[type]) {
                    state.accessories[type].key = key;
                    state.accessories[type].qty += 1;
                }
            }
            break;
        }
        case SELECT_ACCESSORY_VARIANT: {
            const item = state.accessories[action.itemType];
            item.key = action.value;
            break;
        }
        case SET_ACCESSORY_QTY: {
            const item = state.accessories[action.itemType];
            item.qty = Math.max(parseInt(action.value, 10), 0);
            if (isNaN(item.qty)) {
                item.qty = 0;
            }
            break;
        }
        case INCREMENT_ACCESSORY_QTY: {
            const item = state.accessories[action.itemType];
            item.qty = Math.max(item.qty + 1, 0);
            break;
        }
        case DECREMENT_ACCESSORY_QTY: {
            const item = state.accessories[action.itemType];
            item.qty = Math.max(item.qty - 1, 0);
            break;
        }
    }
};
