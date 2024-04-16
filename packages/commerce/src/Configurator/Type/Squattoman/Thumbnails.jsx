/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */

import { useConfiguratorContext } from '../../Context/Configurator';
import { useStateContext } from '../../Context/State';
import { ThumbnailCarousel } from '../../View/ThumbnailCarousel';

export const Thumbnails = () => {
    const { pieces: indexPieces } = useConfiguratorContext();
    const {
        state: { fabricId, piece: statePiece },
    } = useStateContext();

    return (
        <div className="player-thumbnails__wrapper">
            <ThumbnailCarousel currentConfiguration={indexPieces[statePiece].key} currentFabric={`fabric${fabricId}`} />
        </div>
    );
};
