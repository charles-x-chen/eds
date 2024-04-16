/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { createContext } from 'preact';
import { useContext } from 'preact/hooks';
import { useTotals } from '../hooks/useTotals';
import { useStateContext } from './State';

const TotalsContext = createContext({});

export const useTotalsContext = () => useContext(TotalsContext);

export const TotalsContextProvider = ({ children }) => {
    const { state } = useStateContext();
    const totals = useTotals(state);
    return <TotalsContext.Provider value={totals}>{children}</TotalsContext.Provider>;
};
