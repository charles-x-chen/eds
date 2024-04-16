/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useEffect, useState } from 'preact/hooks';
import { usePlayerContext } from '../../Context/Player';
import { useConfiguratorContext } from '../../Context/Configurator';
import { useHook } from '../../hooks/useHook';
import { getThreekitApi, getOrCreateDomNode } from './playerApi';
import { PlayerStateSync } from './PlayerStateSync';
import { PLAYER_VRAY_MODE, PLAYER_WEBGL_MODE, SET_FLOOR, SET_INITIALIZED, SET_LOADED } from './constants';
import { usePlayerFloorId } from './Toolbar/FloorButton';

const STATUS_DEFAULT = 0;
const STATUS_LOADING = 1;
const STATUS_LOADED = 2;
const STATUS_INITIALIZING = 3;
const STATUS_INITIALIZED = 4;

export const PlayerLoader = () => {
    const [status, setStatus] = useState(STATUS_DEFAULT);

    switch (status) {
        case STATUS_DEFAULT:
            return <PlayerJsLoader setStatus={setStatus} />;
        case STATUS_LOADED:
            return <PlayerInitializer setStatus={setStatus} />;
        case STATUS_INITIALIZED:
            return <PlayerSync />;
    }
};

const PlayerJsLoader = ({ setStatus }) => {
    const { dispatch } = usePlayerContext();
    const index = useConfiguratorContext();

    useEffect(() => {
        if (index.saved) {
            dispatch({ type: SET_FLOOR, value: index.saved.floor });
        }
    }, [dispatch, index]);

    useEffect(() => {
        (async () => {
            const {
                global: { 'threekit.player.script': playerJs, 'threekit.configurator.script': configuratorJs },
            } = index;

            setStatus(STATUS_LOADING);
            if (!playerJs || !configuratorJs) {
                return;
            }
            if (!getThreekitApi()) {
                await loadScript(playerJs);
            }
            if (!getThreekitApi('init')) {
                await loadScript(configuratorJs);
            }
            const domNode = getOrCreateDomNode();
            dispatch({ type: SET_LOADED, domNode });
            setStatus(STATUS_LOADED);
        })();
    }, [setStatus, dispatch, index]);
};

const PlayerInitializer = ({ setStatus }) => {
    const { dispatch } = usePlayerContext();
    const initParams = useInitParams();

    useEffect(() => {
        (async () => {
            if (!initParams.analyticsCustomId) {
                return;
            }
            setStatus(STATUS_INITIALIZING);
            const initPlayer = getThreekitApi('init');
            await initPlayer(initParams);
            const api = getThreekitApi('configurator');

            if (api) {
                dispatch({
                    type: SET_INITIALIZED,
                    api,
                    mode: initParams.mode === 'vray' ? PLAYER_VRAY_MODE : PLAYER_WEBGL_MODE,
                });
                setStatus(STATUS_INITIALIZED);
            }
        })();
    }, [initParams, dispatch, setStatus]);
};

const PlayerSync = () => {
    const {
        state: { isInitialized },
    } = usePlayerContext();
    if (isInitialized) {
        return <PlayerStateSync />;
    }
};

const useInitParams = () => {
    const domNodeId = useDomNodeId();
    const floor = usePlayerFloorId();
    const { type } = useConfiguratorContext();
    const params = {
        initialConfiguration: {
            floor,
        },
        el: domNodeId,
        analyticsCustomId: sessionStorage.getItem('DROPINS_CART_ID') || 'null',
    };
    useHook(type, 'usePlayerInitParams', [params]);
    return params;
};

const useDomNodeId = () => {
    const {
        state: {
            domNode: { id: domNodeId },
        },
    } = usePlayerContext();
    return domNodeId;
};

const loadScript = async (src) => {
    return new Promise((resolve, reject) => {
        /* eslint github/no-dynamic-script-tag: off */
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        script.async = true;
        document.head.appendChild(script);
    });
};
