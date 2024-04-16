/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useEffect, useState, useCallback } from 'preact/hooks';
import { t } from 'ttag';
import { BsX } from 'react-icons/bs';
import { NO_STEALTHTECH_CODE } from '../constants';
import { RESET, useStateContext } from '../../../Context/State';
import styles from './style.module.css';

export const Popup = () => {
    const [visible, setVisible] = useState(false);
    const {
        dispatch,
        state: { stealthtechError, stealthtech },
    } = useStateContext();

    useEffect(() => {
        if (stealthtech === NO_STEALTHTECH_CODE && stealthtechError) {
            setVisible(true);
        }
    }, [stealthtech, stealthtechError]);

    const closeModal = useCallback(() => {
        setVisible(false);
        return true;
    }, []);

    const undoChange = useCallback(() => {
        dispatch({
            type: RESET,
        });
        setVisible(false);
    }, [dispatch]);

    return (
        visible && (
            <div role="dialog" className={styles.warningModalWrapper} style="z-index: 902;">
                <div className={styles.warningModalInnerWrapper} data-role="focusable-scope">
                    <div className={styles.modalHeader}>
                        <button className={styles.actionClose} data-role="closeBtn" onClick={closeModal} type="button">
                            <span>{t`Close`}</span>
                            <BsX />
                        </button>
                    </div>
                    <div className={styles.content} data-role="content">
                        <div>
                            <div className="configurator-error">
                                <p className="error-body">{stealthtechError}</p>
                                <p className="error-summary">{t`Are you sure you want to proceed?`}</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.footer}>
                        <button className={styles.dismiss} type="button" onClick={undoChange} data-role="action">
                            <span>{t`Undo`}</span>
                        </button>
                        <button className={styles.accept} type="button" onClick={closeModal} data-role="action">
                            <span>{t`Accept Change`}</span>
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};
