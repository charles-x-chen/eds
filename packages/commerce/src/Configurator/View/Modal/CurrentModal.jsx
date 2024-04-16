/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useEffect } from 'preact/hooks';
import { useModalContext } from './ModalContext';

export const CurrentModal = ({ types }) => {
    const { modal } = useModalContext();

    useEffect(() => {
        const bodyClassList = document.body.classList;
        if (modal && types[modal.type]) {
            bodyClassList.add('modal-active');
        } else {
            bodyClassList.remove('modal-active');
        }
    }, [modal, types]);

    if (!modal) {
        return;
    }

    return types[modal.type];
};
