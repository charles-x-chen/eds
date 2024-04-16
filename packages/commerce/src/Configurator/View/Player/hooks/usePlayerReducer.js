/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useReducer } from 'preact/hooks';
import {
    PLAYER_VRAY_MODE,
    SET_FLOOR,
    SET_INITIALIZED,
    SET_LOADED,
    SET_ORTHOGRAPHIC,
    SET_ROOM_SIZE,
    SET_UNINITIALIZED,
    TOGGLE_PLAYER_MESSAGE,
    TOGGLE_MEASUREMENT,
} from '../constants';

export const usePlayerReducer = () => {
    return useReducer(playerReducer, defaultPlayerState);
};

const defaultPlayerState = {
    isLoaded: false,
    isInitialized: false,
    isMeasurementEnabled: false,
    isOrthographic: true,
    domNode: null,
    api: null,
    mode: PLAYER_VRAY_MODE,
    floor: 'none',
    roomSize: null,
};

const playerReducer = (oldState, action) => {
    const state = { ...oldState };
    switch (action.type) {
        case SET_LOADED:
            state.isLoaded = true;
            state.domNode = action.domNode;
            break;
        case SET_INITIALIZED:
            state.isInitialized = true;
            state.api = action.api;
            state.mode = action.mode;
            break;
        case SET_UNINITIALIZED:
            state.isInitialized = false;
            state.api = null;
            state.mode = action.mode;
            break;
        case TOGGLE_MEASUREMENT:
            state.isMeasurementEnabled = !state.isMeasurementEnabled;
            break;
        case SET_FLOOR:
            state.floor = action.value;
            break;
        case SET_ROOM_SIZE:
            state.roomSize = action.value;
            break;
        case SET_ORTHOGRAPHIC:
            state.isOrthographic = !!action.value;
            break;
        case TOGGLE_PLAYER_MESSAGE:
            state.showPlayerMessage = action;
            break;
    }
    return state;
};
