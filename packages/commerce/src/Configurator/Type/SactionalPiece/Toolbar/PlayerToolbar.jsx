/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { MeasurementButton } from '../../../View/Player/Toolbar/MeasurementButton';
import { useStateContext } from '../../../Context/State';
import { ThumbnailCarousel } from '../../../View/ThumbnailCarousel';
import mobileSignal from '~/Api/Mobile';

export const PlayerToolbar = () => {
    const {
        state: { configuration, fabricId },
    } = useStateContext();
    const isMobile = mobileSignal.value;

    return (
        <div className="player-toolbar">
            <MeasurementButton title={t`Dimensions`} />
            {isMobile ? (
                <ThumbnailCarousel currentConfiguration={configuration} currentFabric={`fabric${fabricId}`} />
            ) : null}
        </div>
    );
};
