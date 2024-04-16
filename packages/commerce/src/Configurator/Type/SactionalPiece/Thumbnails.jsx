/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useCallback } from 'preact/hooks';
import { PlayerThumbnails } from '../../View/Player/PlayerThumbnails';
import { useConfiguratorContext } from '../../Context/Configurator';
import { useStateContext } from '../../Context/State';

const angles = [0, 1, 2, 3];

export const Thumbnails = () => {
    const {
        type: { code },
    } = useConfiguratorContext();
    const {
        state: { configuration, fabricId },
    } = useStateContext();

    const getImageSrc = useCallback(() => null, []);

    if (configuration && configuration.includes('InsertCover')) {
        return null;
    }

    return (
        <PlayerThumbnails
            angles={angles}
            getImageSrc={getImageSrc}
            code={code}
            currentConfiguration={configuration}
            currentFabric={`fabric${fabricId}`}
        />
    );
};
