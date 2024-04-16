/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useCallback, useEffect, useState } from 'preact/hooks';
import { t } from 'ttag';
import { SET_CONFIGURATION_CHANGED, SET_PIECES, SET_SELECTED_PIECE, TYPE_CUSTOM } from '../constants';
import { getThreekitApi } from '../../../View/Player/playerApi';
import { useStateContext } from '../../../Context/State';
import {
    PLAYER_VRAY_MODE,
    PLAYER_WEBGL_MODE,
    SET_INITIALIZED,
    SET_UNINITIALIZED,
    TOGGLE_PLAYER_MESSAGE,
} from '../../../View/Player/constants';
import { usePlayerContext } from '../../../Context/Player';
import { usePlayerArmType } from '../../SideStyleArm/hooks/usePlayerArmType';
import { usePlayerBackType } from '../../SideStyleBack/hooks/usePlayerBackType';
import { usePlayerProductId } from './usePlayerProductId';

export const usePlayerSync = (playerState, state, index) => {
    useProductIdSync(playerState);
    usePlusSignSync(playerState, state, index);
    usePlayerModeSync(playerState, state);
    usePlayerEventSync(playerState);
    usePiecesSync(playerState);
};

const useProductIdSync = ({ api, mode }) => {
    const productId = usePlayerProductId(PLAYER_VRAY_MODE);
    useEffect(() => {
        if (mode === PLAYER_VRAY_MODE && api.setProduct) {
            api.setProduct(productId);
        }
    }, [api, mode, productId]);
};

const usePlusSignSync = ({ api, mode, isOrthographic }, { selectedPiece, pieces: statePieces }) => {
    useEffect(() => {
        if (mode === PLAYER_WEBGL_MODE) {
            const show = isOrthographic && selectedPiece;
            if (show && api.displayPlusSign) {
                const [key, type] = selectedPiece.split('_');
                api.displayPlusSign(type, key);
            } else if (!show && api.hidePlusSign) {
                api.hidePlusSign();
            }
        }
    }, [api, mode, isOrthographic, selectedPiece, statePieces]);
};

const usePlayerModeSync = ({ mode }, { configurationType }) => {
    const newMode = configurationType === TYPE_CUSTOM ? PLAYER_WEBGL_MODE : PLAYER_VRAY_MODE;
    const { dispatch: playerDispatch } = usePlayerContext();
    const productId = usePlayerProductId(newMode);
    const armType = usePlayerArmType();
    const backType = usePlayerBackType();

    useEffect(() => {
        (async () => {
            if (mode !== newMode) {
                playerDispatch({
                    type: SET_UNINITIALIZED,
                    mode: newMode,
                });
                const setPlayerMode = getThreekitApi('setPlayerMode');
                await setPlayerMode(newMode);
                const newApi = getThreekitApi('configurator');
                if (newApi) {
                    await newApi.setProduct(productId, { ArmType: armType, BackType: backType });
                    playerDispatch({
                        type: SET_INITIALIZED,
                        api: newApi,
                        mode: newMode,
                    });
                }
            }
        })();
    }, [newMode, mode, playerDispatch, productId, armType, backType]);
};

const usePiecesSync = ({ api, mode }) => {
    const { dispatch: stateDispatch } = useStateContext();
    const armType = usePlayerArmType();
    const backType = usePlayerBackType();

    useEffect(() => {
        if (mode === PLAYER_WEBGL_MODE) {
            updatePieces(api, stateDispatch);
        }
    }, [api, mode, stateDispatch, armType, backType]);
};

const updatePieces = (api, dispatch) => {
    const pieces = {};
    const itemCount = api.getItemCount();
    const sideStyles = api.getSideStyles();
    for (const { key, type, count } of itemCount) {
        pieces[`${key}_${type}`] = count;
    }
    dispatch({ type: SET_PIECES, value: pieces, sideStyles });
};

const usePlayerEventSync = ({ api, mode }) => {
    const { dispatch } = useStateContext();
    const playerContext = usePlayerContext();
    const [seatsArray, updateSeatsArray] = useState([]);

    const itemSelectedCallback = useCallback(
        (event) => {
            if (mode === PLAYER_WEBGL_MODE) {
                const id = event.detail.id;
                const selectItem = id && api.getItemById(id);
                if (selectItem) {
                    dispatch({ type: SET_SELECTED_PIECE, value: null });
                }
            }
        },
        [mode, api, dispatch],
    );

    const itemMovedCallback = useCallback(
        (event) => {
            event.preventDefault();
            dispatch({ type: SET_CONFIGURATION_CHANGED });
        },
        [dispatch],
    );

    const updatePiecesCallback = useCallback(
        (event) => {
            event.preventDefault();
            setTimeout(() => {
                updatePieces(api, dispatch);
            }, 200);
        },
        [api, dispatch],
    );

    const showDeepSeatMessage = useCallback(
        (event) => {
            const newSideType = event.detail.newSideType;
            event.preventDefault();
            const sideTypeKey = newSideType.includes('deep') ? 'deep' : 'standard';

            const playerMessage = {
                deep: `${t`This Seat configuration requires a Deep Side. Your current Side will be swapped with a Deep Side to fill the gap created by the rotation of the Seat.`}`,
                standard: `${t`This Seat configuration requires a Standard Side. Your current Side will be swapped with a Standard Side to fill the gap created by the rotation of the Seat.`}`,
            };

            if (!seatsArray.includes(newSideType)) {
                playerContext.dispatch({
                    type: TOGGLE_PLAYER_MESSAGE,
                    data: {
                        subtitle: `${t`This seat configuration requires a different side.`}`,
                        description: playerMessage[`${sideTypeKey}`],
                        action: `${t`Got It`}`,
                    },
                });
            }
            updateSeatsArray((arr) => [...arr, `${newSideType}`]);
        },
        [playerContext, updateSeatsArray, seatsArray],
    );

    useEffect(() => {
        if (mode === PLAYER_WEBGL_MODE) {
            window.addEventListener('itemAdd', updatePiecesCallback);
            window.addEventListener('itemDelete', updatePiecesCallback);
            window.addEventListener('convertSide', updatePiecesCallback);
            window.addEventListener('itemMoveEnd', itemMovedCallback);
            window.addEventListener('itemSelect', itemSelectedCallback);
            window.addEventListener('convertSide', showDeepSeatMessage);
        }

        return () => {
            if (mode === PLAYER_WEBGL_MODE) {
                window.removeEventListener('itemAdd', updatePiecesCallback);
                window.removeEventListener('itemDelete', updatePiecesCallback);
                window.removeEventListener('convertSide', updatePiecesCallback);
                window.removeEventListener('itemMoveEnd', itemMovedCallback);
                window.removeEventListener('itemSelect', itemSelectedCallback);
                window.removeEventListener('convertSide', showDeepSeatMessage);
            }
        };
    }, [updatePiecesCallback, itemMovedCallback, itemSelectedCallback, mode, showDeepSeatMessage]);
};
