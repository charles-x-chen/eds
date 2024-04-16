/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useStateContext } from '../../../Context/State';
import { TYPE_CUSTOM } from '../constants';
import { PLAYER_VRAY_MODE, PLAYER_WEBGL_MODE } from '../../../View/Player/constants';
import { usePlayerProductId } from './usePlayerProductId';

export const usePlayerInitParams = (params) => {
    const {
        state: { configurationType },
    } = useStateContext();
    const playerMode = configurationType === TYPE_CUSTOM ? PLAYER_WEBGL_MODE : PLAYER_VRAY_MODE;
    params.initialConfiguration.productId = usePlayerProductId(playerMode);
    params.mode = playerMode === PLAYER_WEBGL_MODE ? 'webgl' : 'vray';
};
