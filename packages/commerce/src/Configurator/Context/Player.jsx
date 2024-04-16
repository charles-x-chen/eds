/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { createContext } from 'preact';
import { useContext, useMemo } from 'preact/hooks';
import { usePlayerReducer } from '../View/Player/hooks/usePlayerReducer';

const PlayerContext = createContext({});

export const usePlayerContext = () => useContext(PlayerContext);

export const PlayerContextProvider = ({ children }) => {
    const [state, dispatch] = usePlayerReducer();
    const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

    return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
};
