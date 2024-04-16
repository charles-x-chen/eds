/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { INIT, LOAD } from '../../../Context/State';
import { SET_FILL } from '../constants';
import { RESET_CONFIGURATION } from '../../Configure/constants';

export const updateState = (state, { defaultFill, saved }, action) => {
    switch (action.type) {
        case INIT: {
            state.fill = defaultFill;
            break;
        }
        case RESET_CONFIGURATION: {
            state.fill = defaultFill;
            break;
        }
        case LOAD: {
            if (saved.fill) {
                state.fill = saved.fill;
            }
            break;
        }
        case SET_FILL: {
            state.fill = action.value;
            break;
        }
    }
};
