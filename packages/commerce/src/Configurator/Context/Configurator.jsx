/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { createContext } from 'preact';
import { useContext, useMemo } from 'preact/hooks';
import { useHookCallback } from '../hooks/useHookCallback';
import { buildIndex } from '../hooks/buildIndex';

const ConfiguratorContext = createContext({});

export const useConfiguratorContext = () => useContext(ConfiguratorContext);

export const ConfiguratorContextProvider = ({ children, options: opts, ...rest }) => {
    const options = {
        ...opts,
        ...rest,
    };
    /* eslint no-console: off */
    console.log('Configurator', options);
    const index = useIndex(options);
    return <ConfiguratorContext.Provider value={index}>{children}</ConfiguratorContext.Provider>;
};

const useIndex = (options) => {
    const buildIndexCallback = useHookCallback(options.type, 'buildIndex');

    return useMemo(() => {
        const index = { ...options };
        buildIndex(index);
        buildIndexCallback(index);
        return index;
    }, [options, buildIndexCallback]);
};
