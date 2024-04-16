/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
/* eslint camelcase: off */
import { useMemo, useCallback } from 'preact/hooks';
import { t } from 'ttag';
import { BsX } from 'react-icons/bs';
import { useModalContext } from '../../../Modal';
import styles from './style.module.css';

export const ARModal = () => {
    const {
        modal: {
            data: { dataURL },
        },
    } = useModalContext();

    return useMemo(() => {
        return <InfoContent dataURL={dataURL} />;
    }, [dataURL]);
};

const InfoContent = ({ dataURL }) => {
    const { setModal } = useModalContext();
    const closeModal = useCallback(
        (event) => {
            event.preventDefault();

            setModal(null);
        },
        [setModal],
    );
    return (
        <div data-role="dialog" className={styles.modalWrapper} style="z-index: 902;">
            <div className={styles.modalInnerWrapper} data-role="focusable-scope">
                <div className={styles.content} data-role="content">
                    <button className={styles.actionClose} onClick={closeModal} data-role="closeBtn" type="button">
                        <span>{t`Close`}</span>
                        <BsX />
                    </button>
                    <div>
                        <div className={styles.heading}>
                            <h2>{t`Please scan the QR code`}</h2>
                            <span>{t`This experience is currently only available on iPhone or iPad.`}</span>
                        </div>
                        <img alt={t`QR Code`} className={styles.image} src={dataURL} />
                        <p className={styles.subtitle}>{t`Coming soon to Android.`}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
