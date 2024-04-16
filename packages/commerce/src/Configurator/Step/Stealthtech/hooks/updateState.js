/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { INIT, LOAD } from '../../../Context/State';
import { NO_STEALTHTECH_CODE, SET_STEALTHTECH, SET_STEALTHTECH_ELIGIBLE } from '../constants';
import {
    SET_CONFIGURATION,
    SET_CONFIGURATION_TYPE,
    TYPE_PREBUILT,
    RESET_CONFIGURATION,
} from '../../Configure/constants';
import { TYPE_SUBWOOFER } from '../../Options/constants';
import { getStealthtechSkus } from './usePlayerSync';

export const updateState = (
    state,
    { stealthtech, saved, isStealthtech, preBuilt, isConfigureMode, sideStealthtech },
    { type: actionType = null, value = null, error = null },
) => {
    switch (actionType) {
        case INIT: {
            state.stealthtech = NO_STEALTHTECH_CODE;
            state.stealthTechEligible = [];
            state.stealthtechError = '';
            state.subwooferError = '';
            state.stealthtechChanged = false;
            break;
        }
        case RESET_CONFIGURATION: {
            state.stealthtechError = '';
            state.subwooferError = '';
            state.stealthtechChanged = false;

            if (isStealthtech === false) {
                state.stealthtech = NO_STEALTHTECH_CODE;
            }

            if (saved && saved.stealthtech) {
                state.stealthTechEligible = [state.stealthtech];
            }
            break;
        }
        case LOAD: {
            if (saved.stealthtech) {
                state.stealthtech = saved.stealthtech;
                state.stealthTechEligible = [state.stealthtech];
                if (isConfigureMode) {
                    state.stealthtechChanged = true;
                }
            }
            break;
        }
        case SET_CONFIGURATION_TYPE:
        case SET_CONFIGURATION: {
            if (state.configurationType === TYPE_PREBUILT) {
                const stealthTechEligible = getStealthtechSkus(
                    preBuilt,
                    sideStealthtech,
                    state.configuration,
                    state.armStyle,
                    state.backStyle,
                );

                if (isStealthtech) {
                    state.stealthtech = stealthTechEligible[stealthTechEligible.length - 1];
                    state.stealthtechChanged = false;
                }
                if (!stealthTechEligible.includes(state.stealthtech)) {
                    state.stealthtech = NO_STEALTHTECH_CODE;
                }
            }
            break;
        }
        case SET_STEALTHTECH: {
            if (!stealthtech?.[value] || !state.stealthTechEligible.includes(value)) {
                value = NO_STEALTHTECH_CODE;
            }
            state.stealthtech = value;
            state.stealthtechChanged = true;
            break;
        }
        case SET_STEALTHTECH_ELIGIBLE: {
            state.stealthTechEligible = value ?? [];
            state.previous = state.previous?.previous;

            // set stealthtech as the last available if isStealthtech = true
            if (isStealthtech && state.stealthTechEligible.length && !state.stealthtechChanged) {
                const newStealthtech = state.stealthTechEligible.slice(-1)[0];
                state.stealthtech = newStealthtech ? newStealthtech : NO_STEALTHTECH_CODE;
                state.stealthtechError = state.stealthtech === NO_STEALTHTECH_CODE ? error : '';
            }

            if (state.stealthtech !== NO_STEALTHTECH_CODE && !state.stealthTechEligible.includes(state.stealthtech)) {
                if (state.stealthTechEligible.length) {
                    // if the selected stealthtech is not available, try to find stealthtech with the same size
                    const stealthTechSize = parseInt(state.stealthtech, 10);
                    for (const eligible of state.stealthTechEligible) {
                        const size = parseInt(eligible, 10);
                        if (size === stealthTechSize) {
                            state.stealthtech = eligible;
                            state.stealthtechError = '';
                            break;
                        }
                    }
                }

                if (!state.stealthTechEligible.includes(state.stealthtech)) {
                    state.stealthtech = NO_STEALTHTECH_CODE;
                    state.stealthtechError = error;
                }
            }
            break;
        }
    }

    if (state.stealthtech === NO_STEALTHTECH_CODE) {
        const subwoofer = state.options[TYPE_SUBWOOFER];
        if (subwoofer && subwoofer.qty > 0) {
            state.options[TYPE_SUBWOOFER] = { ...subwoofer, qty: 0, prevQty: 0 };
        }
    }
};
