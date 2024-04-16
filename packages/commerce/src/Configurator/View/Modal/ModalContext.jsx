/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { createContext } from 'preact';
import { useContext, useState, useMemo } from 'preact/hooks';
import { CurrentModal } from './CurrentModal';

const ModalContext = createContext({});

export const useModalContext = () => useContext(ModalContext);

export const ModalContextProvider = ({ children, types }) => {
    const [modal, setModal] = useState();
    const value = useMemo(() => ({ modal, setModal }), [modal, setModal]);

    return (
        <ModalContext.Provider value={value}>
            <CurrentModal types={types} />
            {children}
        </ModalContext.Provider>
    );
};
