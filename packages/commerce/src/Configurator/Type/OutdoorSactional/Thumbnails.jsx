/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useCallback } from 'preact/hooks';
import { PlayerThumbnails } from '../../View/Player/PlayerThumbnails';
import { useConfiguratorContext } from '../../Context/Configurator';
import { useStateContext } from '../../Context/State';
import { getCommerceUrl } from '~/Api/Url';

const angles = [0, 1, 2, 3];

export const Thumbnails = () => {
    const {
        preBuilt,
        type: { code },
    } = useConfiguratorContext();
    const {
        state: { configuration, fabricId },
    } = useStateContext();

    const getImageSrc = useCallback(
        (code) => {
            switch (code) {
                case '360': {
                    return getCommerceUrl(`media/wysiwyg/rotation-thumbnail.svg`);
                }
                case 'zoom': {
                    return getCommerceUrl(`media/threekit/carousel/zoom/outdoor/${fabricId}-zoom.jpg`);
                }
                default: {
                    const vrayId = preBuilt[configuration].vrayId;
                    return getCommerceUrl(`media/threekit/carousel/${vrayId}/${fabricId}-${code}.jpg`);
                }
            }
        },
        [fabricId, preBuilt, configuration],
    );
    return <PlayerThumbnails angles={angles} getImageSrc={getImageSrc} code={code} />;
};
