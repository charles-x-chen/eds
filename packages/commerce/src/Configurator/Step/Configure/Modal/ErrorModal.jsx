/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { useCallback, useMemo } from 'preact/hooks';
import { BsX } from 'react-icons/bs';
import { useStateContext } from '../../../Context/State';
import { Modal, useModalContext } from '../../../View/Modal';
import styles from './style.module.css';

export const ErrorModal = () => {
    const { dispatch } = useStateContext();

    const {
        modal: { name, value },
    } = useModalContext();

    const { setModal } = useModalContext();

    const proceedCallback = useCallback(
        (event) => {
            event.preventDefault();
            dispatch({
                type: name,
                value,
            });
            setModal(null);
        },
        [dispatch, name, value, setModal],
    );

    const cancelCallback = useCallback(() => {
        setModal(null);
    }, [setModal]);

    return useMemo(() => {
        return (
            <Modal modalClass={styles.warningModal}>
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
                                    <p className="error-body">
                                        {t`If you leave your configuration now, your customizations will be removed.`}
                                    </p>
                                    <p className="error-summary">{t`Are you sure you want to proceed?`}</p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.footer}>
                            <button
                                className={styles.dismiss}
                                type="button"
                                onClick={cancelCallback}
                                data-role="action"
                            >
                                <span>{t`Undo`}</span>
                            </button>
                            <button
                                className={styles.accept}
                                type="button"
                                onClick={proceedCallback}
                                data-role="action"
                            >
                                <span>{t`Accept Change`}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }, [cancelCallback, proceedCallback]);
};
