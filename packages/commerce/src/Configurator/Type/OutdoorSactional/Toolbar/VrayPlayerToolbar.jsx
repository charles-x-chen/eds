/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { MeasurementButton } from '../../../View/Player/Toolbar/MeasurementButton';
import { FloorButton } from '../../../View/Player/Toolbar/FloorButton';
import { ZoomButton } from '../../../View/Player/Toolbar/ZoomButton';
import ToolbarModals from '../../../View/Player/Toolbar/Modal';
import { ModalContextProvider } from '../../../View/Modal';

export const VrayPlayerToolbar = () => {
    return (
        <ModalContextProvider types={ToolbarModals}>
            <div className="player-toolbar">
                <MeasurementButton title={t`Toggle Measurement`} />
                <FloorButton title={t`Change Floor`} />
                <ZoomButton title={t`Augmented Reality`} />
            </div>
        </ModalContextProvider>
    );
};
