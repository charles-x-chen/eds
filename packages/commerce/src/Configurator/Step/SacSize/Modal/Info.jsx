/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { useMemo, useCallback } from 'preact/hooks';
import { Gallery } from '../../../View/Gallery';
import { Price } from '../../../View/Price';
import { useModalContext, Modal } from '../../../View/Modal';
import { useStateContext } from '../../../Context/State';
import { SET_PIECE } from '../constants';
import { useConfiguratorContext } from '../../../Context/Configurator';
import { calculateTotalPrice } from '../../../calculator';
import styles from './style.module.css';

export const Info = () => {
    const {
        modal: { data, title },
    } = useModalContext();

    return useMemo(() => {
        return (
            <Modal title={title} closeTitle={t`Back to Sac`} modalClass={styles.sacSizeStepModal}>
                <InfoContent piece={data} />
            </Modal>
        );
    }, [data, title]);
};

const InfoContent = ({ piece }) => {
    const { state } = useStateContext();
    const index = useConfiguratorContext();
    const { gallery, image, description, includes } = piece;

    const total = useMemo(() => {
        const options = {
            pieces: state.pieces,
        };

        return calculateTotalPrice(index, options);
    }, [index, state]);

    return (
        <div>
            <div className={styles.modalContent}>
                <div className={styles.modalDetails}>
                    <Price value={total.total} />
                    <p className={styles.description}>{description}</p>
                </div>
                <ProductIncludes includes={includes} />
                <div className={styles.image}>
                    <Gallery gallery={gallery} image={image} />
                </div>
            </div>
            <AddOptionButton piece={piece} />
        </div>
    );
};

const AddOptionButton = ({ piece }) => {
    const { name, key, type } = piece;
    const { dispatch } = useStateContext();
    const { setModal } = useModalContext();

    const callback = useCallback(() => {
        const value = `${key}_${type}`;
        dispatch({
            type: SET_PIECE,
            value,
        });
        setModal(null);
    }, [dispatch, type, setModal, key]);

    return (
        <div className={styles.actionsWrapper}>
            <button className={styles.primary} name={name} onClick={callback}>{t`Add ${name}`}</button>
        </div>
    );
};

const ProductIncludes = ({ includes }) => {
    return (
        includes.length && (
            <div className={styles.includes}>
                <h4 className={styles.includesTitle}>{t`Includes`}</h4>
                <div className={styles.includesItems}>
                    <ProductIncludesItem includes={includes} count={1} />
                </div>
            </div>
        )
    );
};

const ProductIncludesItem = ({ includes, count }) => {
    {
        return includes.map((item, index) => {
            return (
                <div className={styles.includesItem} key={index}>
                    <div className={styles.row}>
                        <p className={styles.count}>
                            {t`x`}
                            <span>{count}</span>
                        </p>
                    </div>
                    <p className={styles.name}>{item}</p>
                </div>
            );
        });
    }
};
