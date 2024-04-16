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
        type: { code },
    } = useConfiguratorContext();
    const {
        state: { configuration, fabricId, armStyle, backStyle },
    } = useStateContext();

    const getImageSrc = useCallback(
        (code) => {
            switch (code) {
                case '360': {
                    return getCommerceUrl(`media/wysiwyg/rotation-thumbnail.svg`);
                }
                default: {
                    const parts = [
                        'media',
                        'threekit',
                        configuration.replace(/(_.*$|\s+)/g, ''),
                        fabricId,
                        armStyle,
                        backStyle,
                        `${code !== 'zoom' ? 'angle' : ''}${code}.webp`,
                    ];
                    return getCommerceUrl(parts.join('/'));
                }
            }
        },
        [fabricId, armStyle, backStyle, configuration],
    );
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
