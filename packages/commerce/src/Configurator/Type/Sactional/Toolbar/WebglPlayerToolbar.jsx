/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { MeasurementButton } from '../../../View/Player/Toolbar/MeasurementButton';
import { FloorButton } from '../../../View/Player/Toolbar/FloorButton';
import ConfigureModals from '../../../Step/Configure/Modal';
import ToolbarModals from '../../../View/Player/Toolbar/Modal';
import { ModalContextProvider } from '../../../View/Modal';
import { ZoomButton } from '../../../View/Player/Toolbar/ZoomButton';
import { HelpButton } from './ToolbarButtons/Webgl/HelpButton';
import { VrayButton } from './ToolbarButtons/Webgl/VrayButton';
import { RotateButton } from './ToolbarButtons/Webgl/RotateButton';
import { PlayerBottomButtons } from './ToolbarButtons/Webgl/PlayerBottomButtons';
import { UndoButton } from './ToolbarButtons/Webgl/UndoButton';
import styles from './style.module.css';
import mobileSignal from '~/Api/Mobile';

const modalTypes = { ...ConfigureModals, ...ToolbarModals };

export const WebglPlayerToolbar = () => {
    const isMobile = mobileSignal.value;

    return (
        <ModalContextProvider types={modalTypes}>
            <div className={`${styles.playerToolbar} ${styles.webgl}`}>
                <HelpButton title={t`Help`} />
                <VrayButton title={t`Detailed view`} />
                <FloorButton title={t`Floor Texture`} />
                <MeasurementButton title={t`Dimensions`} isWebGl={true} />
                <RotateButton title={t`360 View`} isWebGl={true} />
                <ZoomButton title={t`Augmented Reality`} />
                {!isMobile ? <UndoButton title={t`Reset`} /> : null}
            </div>
            {isMobile ? <UndoButton title={t`Reset`} /> : null}
            <PlayerBottomButtons />
        </ModalContextProvider>
    );
};
