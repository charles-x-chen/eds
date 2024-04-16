/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useStateContext } from '../../../Context/State';
import { useConfiguratorContext } from '../../../Context/Configurator';
import { usePlayerContext } from '../../../Context/Player';
import { PLAYER_WEBGL_MODE } from '../../../View/Player/constants';

export const usePlayerProductId = (playerMode = null) => {
    const { preBuilt } = useConfiguratorContext();
    const {
        state: { configuration, savedConfigurationId = null },
    } = useStateContext();
    const {
        state: { mode },
    } = usePlayerContext();
    if (!playerMode) {
        playerMode = mode;
    }

    if (playerMode === PLAYER_WEBGL_MODE && savedConfigurationId) {
        return savedConfigurationId;
    }

    const { webglId, vrayId } = preBuilt[configuration];
    return playerMode === PLAYER_WEBGL_MODE ? webglId : vrayId;
};
