/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { createContext } from 'preact';
import { useContext, useCallback, useEffect, useState } from 'preact/hooks';
import { push } from '../DataLayer/push';
import { useConfiguratorContext } from './Configurator';
import { useStateContext } from './State';
import { useTotalsContext } from './Totals';

const DataLayerContext = createContext({});

export const useDataLayerContext = () => useContext(DataLayerContext);

export const DataLayerContextProvider = ({ children }) => {
    const [queue, setQueue] = useState(['init', 'load']);

    const dataLayerPush = useCallback(
        (action) => {
            setQueue((queue) => [...queue, action]);
        },
        [setQueue],
    );

    return (
        <DataLayerContext.Provider value={dataLayerPush}>
            <DataLayerProcessor queue={queue} setQueue={setQueue} />
            {children}
        </DataLayerContext.Provider>
    );
};

const DataLayerProcessor = ({ queue, setQueue }) => {
    const configuratorContext = useConfiguratorContext();
    const stateContext = useStateContext();
    const totalsContext = useTotalsContext();

    useEffect(() => {
        if (queue.length) {
            setQueue([]);
            for (const action of queue) {
                push(action, configuratorContext, stateContext, totalsContext);
            }
        }
    }, [queue, configuratorContext, stateContext, totalsContext, setQueue]);
};
