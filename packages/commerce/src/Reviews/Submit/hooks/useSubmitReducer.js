/**
 * @package     BlueAcorn/Reviews
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useReducer } from 'preact/hooks';
import { SET_FIELD, SET_VISIBLE } from '../constants';

const initialState = {
    visible: '',
    sku: '',
    photos: [],
    excludeFamily: false,
};

const formReducer = (oldState, action) => {
    const state = { ...oldState };
    switch (action.type) {
        case SET_VISIBLE: {
            state.visible = action.value;
            state.sku = action.sku;
            state.excludeFamily = action.excludeFamily;
            break;
        }
        case SET_FIELD: {
            state[action.name] = action.value;
            break;
        }
    }
    return state;
};

export const useSubmitReducer = () => useReducer(formReducer, initialState);
