/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { INIT, LOAD } from '../../../Context/State';
import { SET_QTY } from '../constants';

export const updateState = (state, { saved }, { type: actionType = null, value }) => {
    switch (actionType) {
        case INIT: {
            state.qty = 1;
            break;
        }

        case LOAD: {
            state.qty = saved.qty || 1;
            break;
        }

        case SET_QTY: {
            state.qty = value;
            break;
        }
    }
};
