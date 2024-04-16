/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { Player } from '../../View/Player';
import { ModalContextProvider } from '../../View/Modal';
import { StepTabs } from './StepTabs';
import ModalTypes from './Modal';

export const StepComponent = () => {
    return (
        <ModalContextProvider types={ModalTypes}>
            <Player show="mobile" />
            <StepTabs />
        </ModalContextProvider>
    );
};
