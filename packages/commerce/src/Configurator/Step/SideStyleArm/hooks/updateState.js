/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { INIT, LOAD } from '../../../Context/State';
import { SET_ARM_STYLE } from '../constants';

export const updateState = (state, { armStyle: indexArmStyle, defaultArmStyle, saved }, action) => {
    const { type: actionType = null, value = null } = action;
    switch (actionType) {
        case INIT: {
            state.armStyle = defaultArmStyle;
            state.armStyleChanged = false;
            break;
        }

        case LOAD: {
            if (saved.armStyle) {
                state.armStyle = saved.armStyle;
            } else {
                // legacy logic
                const { items = [] } = saved;
                for (const { type = null, key = null } of items) {
                    if (type === 'side' && key === 'rollArm') {
                        state.armStyle = 'rollArm';
                    }
                }
            }
            if (!indexArmStyle[state.armStyle]) {
                state.armStyle = defaultArmStyle;
            }
            break;
        }

        case SET_ARM_STYLE: {
            state.armStyle = value;
            state.armStyleChanged = true;
            break;
        }
    }
};
