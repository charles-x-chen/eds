/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { createContext } from 'preact';
import { useContext, useCallback, useReducer, useMemo } from 'preact/hooks';
import { useHookCallback } from '../hooks/useHookCallback';
import { useConfiguratorContext } from './Configurator';

const StateContext = createContext({});

export const useStateContext = () => useContext(StateContext);
export const INIT = 'init';
export const LOAD = 'load';
export const RESET = 'reset';

export const StateContextProvider = ({ children }) => {
    const value = useStateReducer();
    return <StateContext.Provider value={value}>{children}</StateContext.Provider>;
};

const useStateReducer = () => {
    const index = useConfiguratorContext();
    const updateStateCallback = useHookCallback(index.type, 'updateState');

    const initializer = useCallback(() => {
        const state = {};
        updateStateCallback(state, index, { type: INIT });
        if (index.saved) {
            updateStateCallback(state, index, { type: LOAD });
        }
        return state;
    }, [updateStateCallback, index]);

    const reducer = useCallback(
        (oldState, action) => {
            if (action.type === RESET) {
                return { ...oldState.previous, armStyleChanged: true };
            }
            const state = { ...oldState, previous: oldState };
            updateStateCallback(state, index, action);
            oldState.previous = null;
            return state;
        },
        [updateStateCallback, index],
    );

    const [state, dispatch] = useReducer(reducer, {}, initializer);

    return useMemo(() => {
        return { state, dispatch };
    }, [state, dispatch]);
};
