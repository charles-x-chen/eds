/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
/* eslint camelcase: off */
import { useMemo, useCallback } from 'preact/hooks';
import { t } from 'ttag';
import { BsX } from 'react-icons/bs';
import { useStateContext } from '../../../../Context/State';
import { useConfiguratorContext } from '../../../../Context/Configurator';
import { useModalContext } from '../../../Modal';
import { getCommerceUrl } from '../../../../../Api/Url';
import styles from './style.module.css';

export const VrayImageModal = () => {
    const {
        state: { fabricId, fabricLeadTime, configuration },
    } = useStateContext();

    const urlKey = `${configuration.split('_')[0].toLowerCase()}_${fabricId}`;
    const { fabricOptions } = useConfiguratorContext();

    return useMemo(() => {
        const fabric = fabricOptions?.[fabricLeadTime]?.[fabricId];
        return <InfoContent fabric={fabric} urlKey={urlKey} />;
    }, [fabricOptions, fabricLeadTime, fabricId, urlKey]);
};

const InfoContent = ({ fabric: { name }, urlKey }) => {
    const { setModal, modal } = useModalContext();
    const bodyClassList = document.body.classList;
    const closeModal = useCallback(
        (event) => {
            event.preventDefault();
            bodyClassList.remove(modal.type);
            setModal(null);
        },
        [setModal, bodyClassList, modal.type],
    );

    bodyClassList.add(modal.type);

    return (
        <div
            data-role="dialog"
            className={styles.modalWrapper}
            style="z-index: 902;"
            data-modalActive={modal ? 'vray' : ''}
        >
            <div className={styles.modalInnerWrapper} data-role="focusable-scope">
                <div className={styles.content} data-role="content">
                    <button className={styles.actionClose} onClick={closeModal} data-role="closeBtn" type="button">
                        <span>{t`Close`}</span>
                        <BsX />
                    </button>
                    <div>
                        <div className={styles.heading}>
                            <h2>{t`Detailed View`}</h2>
                        </div>
                        <div className={styles.subheading}>
                            <h3>{name}</h3>
                            <span>{t`Sample configuration shown to provide a detailed view of your Covers`}</span>
                        </div>
                        <img
                            alt={name}
                            className={styles.image}
                            src={getCommerceUrl(`media/catalog/product/v/r/vray_${urlKey}.jpg`)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
