/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useCallback, useMemo } from 'preact/hooks';
import { t } from 'ttag';
import { BsX } from 'react-icons/bs';
import { useModalContext } from '../../../View/Modal';
import { useConfiguratorContext } from '../../../Context/Configurator';
import { usePlayerContext } from '../../../Context/Player';
import { NO_STEALTHTECH_CODE, SET_STEALTHTECH } from '../../Stealthtech/constants';
import { useStateContext } from '../../../Context/State';
import styles from './style.module.css';

export const DeleteItemModal = () => {
    const { setModal, modal } = useModalContext();
    const { dispatch } = useStateContext();
    const { stealthtechCoreToNoneErrorMsg, satelliteSubwooferWarningMessage } = useConfiguratorContext();
    const {
        state: { api },
    } = usePlayerContext();
    const errorMessage = modal.isSubwoofer ? satelliteSubwooferWarningMessage : stealthtechCoreToNoneErrorMsg;
    const bodyClassList = document.body.classList;
    bodyClassList.add(modal.type);

    const proceedCallback = useCallback(
        (event) => {
            event.preventDefault();
            if (api.deleteItem) {
                api.deleteItem();
                if (!modal.isSubwoofer) {
                    dispatch({ type: SET_STEALTHTECH, value: NO_STEALTHTECH_CODE });
                }
            }
            setModal(null);
            bodyClassList.remove(modal.type);
        },
        [api, setModal, bodyClassList, modal.type, modal.isSubwoofer, dispatch],
    );

    const cancelCallback = useCallback(() => {
        setModal(null);
        bodyClassList.remove(modal.type);
    }, [setModal, bodyClassList, modal.type]);

    return useMemo(() => {
        return (
            <div role="dialog" className={styles.warningModalWrapper} style="z-index: 902;">
                <div className={styles.warningModalInnerWrapper} data-role="focusable-scope">
                    <div className={styles.modalHeader}>
                        <button
                            className={styles.actionClose}
                            data-role="closeBtn"
                            onClick={cancelCallback}
                            type="button"
                        >
                            <span>{t`Close`}</span>
                            <BsX />
                        </button>
                    </div>
                    <div className={styles.content} data-role="content">
                        <div>
                            <div className="configurator-error">
                                <p className="error-body">{errorMessage}</p>
                                <p className="error-summary">{t`Are you sure you want to proceed?`}</p>
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button className={styles.dismiss} type="button" onClick={cancelCallback} data-role="action">
                            <span>{t`Undo`}</span>
                        </button>
                        <button className={styles.accept} type="button" onClick={proceedCallback} data-role="action">
                            <span>{t`Accept Change`}</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }, [cancelCallback, proceedCallback, errorMessage]);
};
