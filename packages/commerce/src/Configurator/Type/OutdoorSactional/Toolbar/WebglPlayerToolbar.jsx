/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { MeasurementButton } from '../../../View/Player/Toolbar/MeasurementButton';
import { FloorButton } from '../../../View/Player/Toolbar/FloorButton';
import { ModalContextProvider } from '../../../View/Modal';
import ConfigureModals from '../../../Step/Configure/Modal';
import ToolbarModals from '../../../View/Player/Toolbar/Modal';
import { HelpButton } from '../../Sactional/Toolbar/ToolbarButtons/Webgl/HelpButton';
import { VrayButton } from '../../Sactional/Toolbar/ToolbarButtons/Webgl/VrayButton';
import { RotateButton } from '../../Sactional/Toolbar/ToolbarButtons/Webgl/RotateButton';
import { UndoButton } from '../../Sactional/Toolbar/ToolbarButtons/Webgl/UndoButton';
import { PlayerBottomButtons } from '../../Sactional/Toolbar/ToolbarButtons/Webgl/PlayerBottomButtons';
import { ZoomButton } from '../../../View/Player/Toolbar/ZoomButton';
import mobileSignal from '~/Api/Mobile';

const modalTypes = { ...ConfigureModals, ...ToolbarModals };

export const WebglPlayerToolbar = () => {
    const isMobile = mobileSignal.value;
    return (
        <ModalContextProvider types={modalTypes}>
            <div className="player-toolbar webgl">
                <HelpButton title={t`Help`} />
                <VrayButton title={t`Detailed view`} />
                <FloorButton title={t`Floor Texture`} />
                <MeasurementButton title={t`Dimensions`} />
                <RotateButton title={t`360 View`} />
                <ZoomButton title={t`Augmented Reality`} />
                {!isMobile ? <UndoButton title={t`Reset`} /> : null}
            </div>
            {isMobile ? <UndoButton title={t`Reset`} /> : null}
            <PlayerBottomButtons />
        </ModalContextProvider>
    );
};
