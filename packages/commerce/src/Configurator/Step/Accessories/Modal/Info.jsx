/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { useMemo, useCallback } from 'preact/hooks';
import { INCREMENT_ACCESSORY_QTY } from '../constants';
import { Price } from '../../../View/Price';
import { Gallery } from '../../../View/Gallery';
import { useStateContext } from '../../../Context/State';
import { useModalContext, Modal } from '../../../View/Modal';
import styles from './style.module.css';
import RichText from '~/View/RichText';

export const Info = () => {
    const {
        modal: { data, title },
    } = useModalContext();

    return useMemo(() => {
        return (
            <Modal title={t`${title}`} closeTitle={t`Back to Accessories`} modalClass={styles.accessoryStepModal}>
                <InfoContent data={data} />
            </Modal>
        );
    }, [data, title]);
};

const InfoContent = ({ data }) => {
    return (
        <div className={styles.modalContent}>
            <div className={styles.image}>
                <Gallery gallery={data.gallery} image={data.image} defaultImage={data.defaultImage} />
            </div>
            <div>
                <p className={styles.title}>{t`Lead Time`}</p>
                <RichText className={styles.content} content={data.leadTime} />
            </div>
            <div>
                <p className={styles.title}>{t`Pricing`}</p>
                <div className={styles.content}>
                    <span className="price-symbol">+</span>
                    <Price value={data.price} />
                </div>
            </div>
            <div>
                <p className={styles.title}>{t`Description`}</p>
                <RichText className={styles.content} content={data.description} />
            </div>
            <div className={styles.actionsWrapper}>
                <AddThisAccessoryButton type={data.type} />
            </div>
        </div>
    );
};

const AddThisAccessoryButton = ({ type }) => {
    const { setModal } = useModalContext();
    const { dispatch } = useStateContext();
    const setAccessoryCallback = useCallback(
        (event) => {
            const { name, value } = event.target;
            dispatch({
                type: name,
                value,
                itemType: type,
            });
            setModal(null);
        },
        [dispatch, type, setModal],
    );

    return (
        <button
            className={styles.primary}
            name={INCREMENT_ACCESSORY_QTY}
            onClick={setAccessoryCallback}
        >{`${t`Add this Accessory`}`}</button>
    );
};
