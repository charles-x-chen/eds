/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */

import { t } from 'ttag';
import { ModalContextProvider } from '../../../View/Modal';
import ToolbarModals from '../../../View/Player/Toolbar/Modal';
import { MeasurementButton } from '../../../View/Player/Toolbar/MeasurementButton';
import { FloorButton } from '../../../View/Player/Toolbar/FloorButton';
import { ZoomButton } from '../../../View/Player/Toolbar/ZoomButton';
import styles from './style.module.css';

export const PlayerToolbar = () => {
    return (
        <ModalContextProvider types={ToolbarModals}>
            <div className={`${styles.playerToolbar}`}>
                <MeasurementButton title={t`Toggle Measurement`} />
                <FloorButton title={t`Change Floor`} />
                <ZoomButton title={t`Augmented Reality`} />
            </div>
        </ModalContextProvider>
    );
};
