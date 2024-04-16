/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { useMemo, useCallback } from 'preact/hooks';
import { Gallery } from '../../../View/Gallery';
import { useOptionPrice } from '../hooks/useOptionPrice';
import { Price } from '../../../View/Price';
import { useModalContext, Modal } from '../../../View/Modal';
import { useStateContext } from '../../../Context/State';
import { INCREMENT_OPTION_QTY } from '../constants';
import styles from './style.module.css';

export const Info = () => {
    const {
        modal: { data, title },
    } = useModalContext();

    return useMemo(() => {
        return (
            <Modal title={title} closeTitle={t`Back to Options`} modalClass={styles.optionStepModal}>
                <InfoContent option={data} />
            </Modal>
        );
    }, [data, title]);
};

const InfoContent = ({ option }) => {
    const { price } = useOptionPrice(option);
    const { images, description, includes } = option;
    const galleryImages = images.map((image) => ({ img: image }));
    return (
        <div>
            <div className={styles.modalContent}>
                <div className={styles.modalDetails}>
                    <Price value={price} />
                    <p className={styles.description}>{description}</p>
                </div>
                <ProductIncludes includes={includes} />
                <div className={styles.image}>
                    <Gallery gallery={galleryImages} image={images[0]} defaultImage={images[0]} />
                </div>
            </div>
            <AddOptionButton option={option} />
        </div>
    );
};

const AddOptionButton = ({ option: { name, type } }) => {
    const { dispatch } = useStateContext();
    const { setModal } = useModalContext();

    const callback = useCallback(
        (event) => {
            const { name } = event.target;
            dispatch({
                type: name,
                code: type,
            });
            setModal(null);
        },
        [dispatch, type, setModal],
    );

    return (
        <div className={styles.actionsWrapper}>
            <button className={styles.primary} name={INCREMENT_OPTION_QTY} onClick={callback}>{t`Add ${name}`}</button>
        </div>
    );
};

const ProductIncludes = ({ includes }) => {
    return (
        includes.length > 1 && (
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
