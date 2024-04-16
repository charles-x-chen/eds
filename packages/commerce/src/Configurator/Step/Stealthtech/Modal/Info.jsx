/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { useMemo } from 'preact/hooks';
import { Modal, useModalContext } from '../../../View/Modal';
import styles from './style.module.css';
import RichText from '~/View/RichText';

export const Info = () => {
    const {
        modal: { data, title, modalTitle = null },
    } = useModalContext();

    return useMemo(() => {
        return (
            <Modal
                title={modalTitle ?? t`What's included`}
                closeTitle={t`Back to StealthTech`}
                modalClass={styles.InfoModal}
            >
                <InfoContent data={data} title={title} />
            </Modal>
        );
    }, [data, title, modalTitle]);
};

const InfoContent = ({ title, data }) => {
    return (
        <div>
            <div className={styles.details}>
                <h2 className={styles.title}>{title}</h2>
                <RichText className={styles.modalDesc} content={data?.shortDescription} />
                <RichText className={styles.listWrapper} content={data.features} />
            </div>
        </div>
    );
};
