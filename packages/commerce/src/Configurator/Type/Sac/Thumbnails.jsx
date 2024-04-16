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
        pieces: indexPieces,
    } = useConfiguratorContext();
    const {
        state: { fabricId, piece: statePiece },
    } = useStateContext();

    const getImageSrc = useCallback(
        (code) => {
            switch (code) {
                case '360': {
                    return getCommerceUrl(`media/wysiwyg/rotation-thumbnail.svg`);
                }
                case 'zoom': {
                    return null;
                }
                default: {
                    const configuration = indexPieces[statePiece].key;
                    const parts = [
                        'media',
                        'threekit',
                        configuration[0].toUpperCase() + configuration.slice(1),
                        fabricId,
                        `angle${code}.webp`,
                    ];
                    return getCommerceUrl(parts.join('/'));
                }
            }
        },
        [fabricId, indexPieces, statePiece],
    );
    return (
        <PlayerThumbnails
            angles={angles}
            getImageSrc={getImageSrc}
            code={code}
            currentConfiguration={indexPieces[statePiece].key}
            currentFabric={`fabric${fabricId}`}
        />
    );
};
