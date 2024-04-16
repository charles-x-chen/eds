/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useModalContext } from './ModalContext';
import { SaveLogin } from './Type/SaveLogin';
import { SaveLoginAfter } from './Type/SaveLoginAfter';
import { Share } from './Type/Share';

const modalTypes = {
    saveLogin: <SaveLogin />,
    saveLoginAfter: <SaveLoginAfter />,
    share: <Share />,
};

export const CurrentModal = () => {
    const { modal } = useModalContext();

    // This means that customer is logged-in, so no need to display Login form
    // TODO: But by some reason "mage-cache-storage" is always empty
    if (window.localStorage.getItem('mage-cache-storage')?.['customer']) {
        return modalTypes['saveLoginAfter'];
    }

    if (!modal) {
        return;
    }

    return modalTypes[modal.type];
};
