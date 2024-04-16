/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { INIT, LOAD } from '../../../Context/State';
import {
    SET_FABRIC,
    SET_FABRIC_LEAD_TIME,
    SET_FABRIC_FILTER,
    RESET_FABRIC_FILTER,
    SET_FABRIC_TO_FILTER,
} from '../constants';
import { isCoverAvailable } from '../hooks/isCoverAvailable';
import { SET_CONFIGURATION, SET_CONFIGURATION_TYPE, SET_PIECES, RESET_CONFIGURATION } from '../../Configure/constants';

export const updateState = (state, index, action) => {
    switch (action.type) {
        case INIT:
        case RESET_CONFIGURATION: {
            state.fabricId = index.defaultFabricId;
            state.fabricLeadTime = index.defaultFabricLeadTime;
            state.fabricLeadTimeTab = state.fabricLeadTime;
            state.fabricMoreInfo = {};
            state.fabricFilter = [];
            state.fabricToFilter = [];
            break;
        }
        case LOAD: {
            const fabrics = index.saved.fabrics;
            if (fabrics) {
                const fabricId = Object.values(fabrics)[0];
                if (fabricId) {
                    const { fabricOptions } = index;
                    for (const fabricLeadTime in fabricOptions) {
                        if (fabricOptions[fabricLeadTime][fabricId]) {
                            state.fabricId = fabricId;
                            state.fabricLeadTime = fabricLeadTime;
                            state.fabricLeadTimeTab = fabricLeadTime;
                            break;
                        }
                    }
                }
            }
            break;
        }
        case SET_FABRIC_LEAD_TIME: {
            state.fabricLeadTimeTab = action.value;
            break;
        }
        case SET_FABRIC: {
            state.fabricId = action.value;
            state.fabricLeadTime = state.fabricLeadTimeTab;
            break;
        }
        case SET_FABRIC_TO_FILTER: {
            state.fabricToFilter = state.fabricToFilter.includes(action.value)
                ? state.fabricToFilter.filter((el) => el !== action.value)
                : [...state.fabricToFilter, action.value];
            break;
        }
        case SET_FABRIC_FILTER: {
            state.fabricFilter = state.fabricToFilter;
            break;
        }

        case RESET_FABRIC_FILTER: {
            state.fabricFilter = [];
            state.fabricToFilter = [];
            break;
        }
    }

    switch (action.type) {
        case INIT:
        case LOAD:
        case SET_FABRIC:
        case SET_CONFIGURATION_TYPE:
        case SET_FABRIC_LEAD_TIME:
        case SET_CONFIGURATION:
        case SET_PIECES: {
            updateFabricState(state, index);
        }
    }
};

const updateFabricState = (state, index) => {
    let { fabricLeadTime = null, fabricId = null } = state;
    const { fabricOptions, defaultFabricLeadTime, defaultFabricId } = index;
    if (!fabricLeadTime || !fabricOptions[fabricLeadTime] || !isCoverAvailable(index, state)) {
        fabricLeadTime = defaultFabricLeadTime;
        fabricId = defaultFabricId;
    }

    if (!fabricId || !fabricOptions[fabricLeadTime][fabricId]) {
        fabricId = Object.keys(fabricOptions[fabricLeadTime])[0];
    }

    state.fabricId = fabricId;
    state.fabricLeadTime = fabricLeadTime;
};
