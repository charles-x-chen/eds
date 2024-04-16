/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { createContext } from 'preact';
import { useContext, useState, useMemo } from 'preact/hooks';
import { useConfiguratorContext } from './Configurator';

const NavigatorContext = createContext({});

export const useNavigatorContext = () => useContext(NavigatorContext);

export const NavigatorContextProvider = ({ children }) => {
    const navigator = useNavigator();

    return <NavigatorContext.Provider value={navigator}>{children}</NavigatorContext.Provider>;
};

const useNavigator = () => {
    const [summaryExpanded, setSummaryExpanded] = useState(false);
    const {
        type: { steps },
        config: { initialStep = 1 },
    } = useConfiguratorContext();
    const [stepIndex, setStepIndex] = useState(initialStep - 1);

    return useMemo(() => {
        const step = steps[stepIndex];
        const stepQty = steps.length;

        return {
            stepIndex,
            setStepIndex,
            step,
            stepQty,
            summaryExpanded,
            setSummaryExpanded,
        };
    }, [stepIndex, setStepIndex, steps, summaryExpanded, setSummaryExpanded]);
};
