/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useCallback } from 'preact/hooks';
import { PlayerThumbnails } from '../../View/Player/PlayerThumbnails';
import { useConfiguratorContext } from '../../Context/Configurator';
import { useStateContext } from '../../Context/State';

const angles = [0, 4];

export const Thumbnails = () => {
    const {
        config: { baseUrl },
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
                    return `${baseUrl}media/wysiwyg/rotation-thumbnail.svg`;
                }
                case 'zoom': {
                    return null;
                }
                default: {
                    const parts = ['media', 'threekit', indexPieces[statePiece].key, fabricId, `angle${code}.webp`];
                    return `${baseUrl}${parts.join('/')}`;
                }
            }
        },
        [baseUrl, fabricId, indexPieces, statePiece],
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
