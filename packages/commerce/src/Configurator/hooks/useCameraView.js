/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */

import { useCallback, useLayoutEffect } from 'preact/hooks';
import { usePlayerContext } from '../Context/Player';
import { PLAYER_WEBGL_MODE, SET_ORTHOGRAPHIC } from '../View/Player/constants';
import { useNavigatorContext } from '../Context/Navigator';

export const useCameraView = () => {
    const {
        state: { api, mode },
        dispatch,
    } = usePlayerContext();
    const { step } = useNavigatorContext();

    const setCameraView = useCallback(
        async (orthographic) => {
            if (mode === PLAYER_WEBGL_MODE && api?.setCameraView) {
                const cameraView = orthographic ? 'orthographic' : 'perspective';
                await api.setCameraView(cameraView);
                dispatch({
                    type: SET_ORTHOGRAPHIC,
                    value: orthographic,
                });
            }
        },
        [api, mode, dispatch],
    );

    useLayoutEffect(() => {
        setCameraView(step.code === 'configure');
    }, [step, setCameraView]);

    return setCameraView;
};
