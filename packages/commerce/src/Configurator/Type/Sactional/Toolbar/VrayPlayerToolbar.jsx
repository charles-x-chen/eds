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
import { useStateContext } from '../../../Context/State';
import { ThumbnailCarousel } from '../../../View/ThumbnailCarousel';
import styles from './style.module.css';
import mobileSignal from '~/Api/Mobile';

export const VrayPlayerToolbar = () => {
    const {
        state: { configuration, fabricId },
    } = useStateContext();
    const isMobile = mobileSignal.value;

    return (
        <ModalContextProvider types={ToolbarModals}>
            <div className={`${styles.playerToolbar}`}>
                <MeasurementButton title={t`Toggle Measurement`} />
                <FloorButton title={t`Change Floor`} />
                <ZoomButton title={t`Augmented Reality`} />
                {isMobile ? (
                    <ThumbnailCarousel currentConfiguration={configuration} currentFabric={`fabric${fabricId}`} />
                ) : null}
            </div>
        </ModalContextProvider>
    );
};
