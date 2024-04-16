/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { INIT, LOAD } from '../../../Context/State';
import { SET_BACK_STYLE } from '../constants';

export const updateState = (state, { backStyle: indexBackStyle, defaultBackStyle, saved }, action) => {
    const { type: actionType = null, value = null } = action;
    switch (actionType) {
        case INIT: {
            state.backStyle = defaultBackStyle;
            state.backStyleChanged = false;
            break;
        }

        case LOAD: {
            if (saved.backStyle && indexBackStyle[saved.backStyle]) {
                state.backStyle = saved.backStyle;
            }
            break;
        }

        case SET_BACK_STYLE: {
            state.backStyle = value;
            state.backStyleChanged = true;
            break;
        }
    }
};
