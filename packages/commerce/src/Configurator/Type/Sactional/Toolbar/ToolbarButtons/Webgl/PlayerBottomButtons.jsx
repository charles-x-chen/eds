/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useCallback, useEffect, useState } from 'preact/hooks';
import { t } from 'ttag';
import { usePlayerContext } from '../../../../../Context/Player';
import { PLAYER_WEBGL_MODE } from '../../../../../View/Player/constants';
import { useModalContext } from '../../../../../View/Modal';
import { useStateContext } from '../../../../../Context/State';
import { NO_STEALTHTECH_CODE } from '../../../../../Step/Stealthtech/constants';
import { SET_PIECES } from '../../../../../Step/Pieces/constants';
import { useConfiguratorContext } from '../../../../../Context/Configurator';
import { useHookCallback } from '../../../../../hooks/useHookCallback';
import { TYPE_SUBWOOFER } from '../../../../../Step/Options/constants';
import styles from '../../style.module.css';

export const PlayerBottomButtons = () => {
    const {
        state: { api, mode },
    } = usePlayerContext();

    const [selectItem, setSelectItem] = useState(null);

    const handleSelectChange = useCallback(
        (event) => {
            if (api && mode === PLAYER_WEBGL_MODE) {
                const id = event.detail.id;
                const selectItem = id && api.getItemById(id);
                setSelectItem(selectItem);
            }
        },
        [mode, api],
    );

    useEffect(() => {
        window.addEventListener('itemSelect', handleSelectChange);
        return () => {
            window.removeEventListener('itemSelect', handleSelectChange);
        };
    }, [handleSelectChange]);

    return selectItem ? <PlayerBottomButtonsVisible selectedItemType={selectItem._type} /> : null;
};

const PlayerBottomButtonsVisible = ({ selectedItemType }) => {
    return (
        <div className={styles.toolbarBottom}>
            {selectedItemType !== 'side' ? <RotateButton /> : null}
            <RemoveButton />
        </div>
    );
};

const RotateButton = () => {
    const {
        state: { api },
    } = usePlayerContext();

    const rotateCallback = useCallback(
        (event) => {
            event.preventDefault();
            if (api.incrementSelectItemRotation) {
                api.incrementSelectItemRotation();
            }
        },
        [api],
    );

    return (
        <button className={styles.bottomRotate} onClick={rotateCallback}>
            <span>{t`Rotate`}</span>
        </button>
    );
};

const RemoveButton = () => {
    const { setModal } = useModalContext();
    const {
        state: { api },
    } = usePlayerContext();
    const { state } = useStateContext();
    const { type, index } = useConfiguratorContext();
    const updateStateCallback = useHookCallback(type, 'updateState');

    const removeCallback = useCallback(
        (event) => {
            event.preventDefault();

            if (!api) {
                return;
            }

            if (shouldShowStealthtechModal(state, api)) {
                setModal({
                    type: 'deleteItemModal',
                });
            } else if (shouldShowSubwooferModal(updateStateCallback, index, state, api)) {
                setModal({
                    type: 'deleteItemModal',
                    isSubwoofer: true,
                });
            } else if (api.deleteItem) {
                api.deleteItem();
            }
        },
        [api, index, setModal, state, updateStateCallback],
    );

    return (
        <button className={styles.bottomRemove} onClick={removeCallback}>
            <span>{t`Remove`}</span>
        </button>
    );
};

const shouldShowSubwooferModal = (updateStateCallback, index, state, api) => {
    const selectedItem = api.getSelectItem();
    if (!selectedItem) {
        return false;
    }
    const newState = { ...state };
    const newPieces = { ...newState.pieces };
    const pieceKey = `${selectedItem._key}_${selectedItem._type}`;
    if (newPieces[pieceKey] > 0) {
        newPieces[pieceKey] -= 1;
        updateStateCallback(newState, index, {
            type: SET_PIECES,
            value: newPieces,
            isTest: true,
            sideStyles: newState.sideStyles,
        });
    }
    const subwoofer = newState.options[TYPE_SUBWOOFER];
    if (subwoofer) {
        const { prevQty, qty } = subwoofer;
        return prevQty > qty;
    }
    return false;
};

const shouldShowStealthtechModal = (state, api) => {
    const selectedItem = api.getSelectItem();
    if (!selectedItem) {
        return false;
    }

    const { stealthtech } = state;

    if (stealthtech && stealthtech !== NO_STEALTHTECH_CODE) {
        const itemId = selectedItem._id;
        const stealthTechEligible = api.checkEligibility(itemId);
        const eligibleStealthtechOptions = stealthTechEligible ? stealthTechEligible.map((item) => item.key) : [];
        if (!eligibleStealthtechOptions.includes(stealthtech)) {
            return true;
        }
    }
    return false;
};
