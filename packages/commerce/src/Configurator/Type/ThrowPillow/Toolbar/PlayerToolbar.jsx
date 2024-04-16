/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { MeasurementButton } from '../../../View/Player/Toolbar/MeasurementButton';
import { useConfiguratorContext } from '../../../Context/Configurator';
import { useStateContext } from '../../../Context/State';
import { ThumbnailCarousel } from '../../../View/ThumbnailCarousel';
import styles from './style.module.css';
import mobileSignal from '~/Api/Mobile';

export const PlayerToolbar = () => {
    const isMobile = mobileSignal.value;
    const { pieces: indexPieces } = useConfiguratorContext();
    const {
        state: { fabricId, piece: statePiece },
    } = useStateContext();
    return (
        <div className={`${styles.playerToolbar}`}>
            <MeasurementButton title={t`Dimensions`} />
            {isMobile ? (
                <ThumbnailCarousel
                    currentConfiguration={indexPieces[statePiece].key}
                    currentFabric={`fabric${fabricId}`}
                />
            ) : null}
        </div>
    );
};
