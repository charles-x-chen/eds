/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useEffect, useState, useCallback } from 'preact/hooks';
import { t } from 'ttag';
import { BsX } from 'react-icons/bs';
import { RESET, useStateContext } from '../../../Context/State';
import { useConfiguratorContext } from '../../../Context/Configurator';
import { SET_OPTION_QTY, TYPE_SUBWOOFER } from '../../Options/constants';
import styles from './style.module.css';

export const SubwooferErrorPopup = () => {
    const [visible, setVisible] = useState(false);
    const {
        messages: { satelliteSubwooferWarningMessage },
    } = useConfiguratorContext();
    const {
        dispatch,
        state: { options },
    } = useStateContext();

    const { prevQty, qty } = options[TYPE_SUBWOOFER];

    useEffect(() => {
        if (prevQty > qty) {
            setVisible(true);
        }
    }, [prevQty, qty]);

    const closeModal = useCallback(() => {
        dispatch({
            type: SET_OPTION_QTY,
            value: qty,
        });
        setVisible(false);
        return true;
    }, [qty, dispatch]);

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
                                <p className="error-body">{satelliteSubwooferWarningMessage}</p>
                                <p className="error-summary">{t`If you proceed with this change, ${
                                    prevQty - qty
                                } Satellite Subwoofer(s) will be removed.`}</p>
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
