/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useStateContext } from '../../../Context/State';
import { useConfiguratorContext } from '../../../Context/Configurator';

export const usePlayerProductId = () => {
    const { pieces: indexPieces } = useConfiguratorContext();
    const {
        state: { piece: statePiece },
    } = useStateContext();
    return indexPieces[statePiece].vrayId;
};
