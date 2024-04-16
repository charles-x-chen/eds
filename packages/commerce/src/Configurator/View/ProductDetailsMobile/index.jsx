/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { useState, useCallback } from 'preact/hooks';
import { useConfiguratorContext } from '../../Context/Configurator';
import { ReviewContentStars, ReviewsInitializer } from '../Review';
import styles from './style.module.css';
import RichText from '~/View/RichText';

export const ProductDetailsRiskFree = ({ title, cssClass, content }) => {
    const [showRiskFree, setShowRiskFree] = useState(false);

    return (
        <ProductDetailsMobileBlock
            title={title}
            cssClass={cssClass}
            content={content}
            visible={showRiskFree}
            showHandler={setShowRiskFree}
        />
    );
};

export const ProductDetailsShippingReturns = ({ title, cssClass, content }) => {
    const [showShippingReturns, setShowShippingReturns] = useState(false);

    return (
        <ProductDetailsMobileBlock
            title={title}
            cssClass={cssClass}
            content={content}
            visible={showShippingReturns}
            showHandler={setShowShippingReturns}
        />
    );
};

const ProductDetailsMobileBlock = ({ title, cssClass, content, visible, showHandler }) => {
    const modalState = useCallback(() => showHandler(!visible), [showHandler, visible]);

    return (
        <div className={`${cssClass} detail`}>
            <button className={`action ${visible ? 'active' : ''}`} onClick={modalState}>
                {title}
            </button>
            {visible ? <RichText content={content} /> : ''}
        </div>
    );
};

export const ReviewMobileBlock = () => {
    const {
        config: { reviewCount },
    } = useConfiguratorContext();

    const [showModal, setShowModal] = useState(false);
    const onClose = useCallback((state) => setShowModal(state), [setShowModal]);
    const showCallback = useCallback(() => setShowModal(true), []);

    return (
        <div>
            <div className={styles.reviews}>
                <button className={styles.action} onClick={showCallback}>{t`Reviews`}</button>
                <div className={styles.rating}>
                    <ReviewContentStars />
                    <div className={styles.reviewCount}>
                        <span>{`(`}</span>
                        <button className={styles.qty} onClick={showCallback}>{`${reviewCount ?? 0}`}</button>
                        <span>{`)`}</span>
                    </div>
                </div>

                <ReviewsInitializer opened={showModal} handleClose={onClose} />
            </div>
        </div>
    );
};
