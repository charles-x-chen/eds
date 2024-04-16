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
import { useConfiguratorContext } from '../../../Context/Configurator';
import styles from './style.module.css';
import mobileSignal from '~/Api/Mobile';

export const PlayerToolbar = () => {
    const isMobile = mobileSignal.value;
    const { pieces: indexPieces } = useConfiguratorContext();
    const {
        state: { fabricId, piece: statePiece },
    } = useStateContext();

    return (
        <ModalContextProvider types={ToolbarModals}>
            <div className={`${styles.playerToolbar}`}>
                <FloorButton title={t`Floor Texture`} />
                <MeasurementButton title={t`Dimensions`} />
                <ZoomButton title={t`Augmented Reality`} />
                {isMobile ? (
                    <ThumbnailCarousel
                        currentConfiguration={indexPieces[statePiece].key}
                        currentFabric={`fabric${fabricId}`}
                    />
                ) : null}
            </div>
        </ModalContextProvider>
    );
};
