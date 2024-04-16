/**
 * @package     BlueAcorn/Reviews
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { createContext } from 'preact';
import { useContext, useMemo } from 'preact/hooks';
import { useInitiateSubmissionMutation } from '../hooks/useInitiateSubmissionMutation';
import { useSubmitReducer } from './hooks/useSubmitReducer';

const SubmitStateContext = createContext();
const SubmitDispatchContext = createContext();
const SubmitDataContext = createContext();

export const SubmitStateProvider = ({ children }) => {
    const [state, dispatch] = useSubmitReducer();

    return (
        <SubmitDispatchContext.Provider value={dispatch}>
            <SubmitStateContext.Provider value={state}>{children}</SubmitStateContext.Provider>
        </SubmitDispatchContext.Provider>
    );
};

export const SubmitDataProvider = ({ children }) => {
    const [data, initiate] = useInitiateSubmissionMutation();
    const value = useMemo(() => ({ ...data, initiate }), [data, initiate]);
    return <SubmitDataContext.Provider value={value}>{children}</SubmitDataContext.Provider>;
};

export const useSubmitStateContext = () => useContext(SubmitStateContext);
export const useSubmitDispatchContext = () => useContext(SubmitDispatchContext);
export const useSubmitDataContext = () => useContext(SubmitDataContext);
