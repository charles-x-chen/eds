/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
/* eslint camelcase: off */

import { useMemo, useState, useCallback } from 'preact/hooks';
import { t } from 'ttag';
import { useStateContext } from '../../Context/State';
import { useConfiguratorContext } from '../../Context/Configurator';
import { ReviewContentCount, ReviewContentStars } from '../../View/Review';
import { Loader } from '../../View/Loader';
import { ModalContextProvider, useModalContext } from '../../View/Modal';
import ModalTypes from '../SideStyleArm/Modal';
import { SET_BACK_STYLE } from './constants';
import styles from './style.module.css';
import Reviews from '~/Reviews';
import Modal from '~/View/Modal';

export const StepComponent = () => {
    const {
        steps: {
            styleBack: { title },
        },
    } = useConfiguratorContext();

    return (
        <ModalContextProvider types={ModalTypes}>
            <div className={`${styles.contentWrapper}`}>
                <div className={`${styles.reviewsWrapper}`}>
                    <Loader>
                        <ReviewContent />
                    </Loader>
                </div>
                <div className={`${styles.itemsLabel}`}>
                    {title}
                    <MoreInformationLink />
                </div>
                <Loader>
                    <StyleItems />
                </Loader>
            </div>
        </ModalContextProvider>
    );
};

const StyleItems = () => {
    const { backStyles } = useConfiguratorContext();

    return (
        <div className={`${styles.itemsWrapper}`}>
            <span className={`${styles.count}`}>{t`Back Styles (${backStyles.length})`}</span>
            {backStyles.map((item) => (
                <StyleItem item={item} key={item.code} />
            ))}
        </div>
    );
};

const StyleItem = ({ item }) => {
    return (
        <label className={`${styles.item}`}>
            {' '}
            <div className={`${styles.itemSelection}`}>
                <StyleItemInput code={item.code} />
                <StyleItemContent item={item} />
            </div>
        </label>
    );
};

const StyleItemContent = ({ item: { name, image, description, tag } }) => {
    return (
        <div className={`${styles.itemContent}`}>
            <span className={`${styles.selectionIcon}`} />
            <span className={`${styles.imageWrapper}`}>
                <img className={`${styles.image}`} src={image} alt={name} />
            </span>
            <div className={`${styles.descriptionWrapper}`}>
                <div className="sactional-style-item__name-wrapper">
                    <span className={`${styles.description}`}>{name}</span>
                    {tag ? (
                        <span
                            className={`${styles.descriptionTag}`}
                            style={{ backgroundColor: tag.background, color: tag.color }}
                        >
                            {tag.text}
                        </span>
                    ) : null}
                </div>
                <span className="sactional-style-item-item__text">{description}</span>
            </div>
        </div>
    );
};

const StyleItemInput = ({ code }) => {
    const {
        dispatch,
        state: { backStyle },
    } = useStateContext();

    const callback = useCallback(
        (event) => {
            event.preventDefault();
            dispatch({
                type: event.target.name,
                value: event.target.value,
            });
        },
        [dispatch],
    );

    const selected = backStyle === code;

    return useMemo(
        () => (
            <input
                type="radio"
                className="sactional-style-input"
                name={SET_BACK_STYLE}
                checked={selected}
                onChange={callback}
                value={code}
            />
        ),
        [callback, code, selected],
    );
};

const ReviewContent = () => {
    const [showModal, setShowModal] = useState(false);
    const {
        steps: {
            styleArm: { subtitle },
        },
        reviews: { sku: reviewSku },
    } = useConfiguratorContext();
    const onOpen = useCallback(() => setShowModal(true), []);
    const onClose = useCallback(() => setShowModal(false), []);

    if (!subtitle) {
        return null;
    }

    return (
        <div className={styles.review}>
            <div className={styles.totalReviews}>
                <button className={styles.totalLink} onClick={onOpen}>
                    <div>
                        {subtitle.split('|').map((content, index) => (
                            <span key={index}>{content}</span>
                        ))}
                    </div>
                    <ReviewContentStars />
                    <span class="link">
                        <ReviewContentCount /> {t`Reviews`}
                    </span>
                </button>
            </div>
            {showModal ? (
                <Modal title={t`Reviews`} onCloseModal={onClose}>
                    <Reviews sku={reviewSku} />
                </Modal>
            ) : null}
        </div>
    );
};

const MoreInformationLink = () => {
    const { setModal } = useModalContext();

    const {
        steps: {
            styleBack: { video },
        },
    } = useConfiguratorContext();

    const backStyleModalContent = useMemo(() => <video src={video} playsinline muted autoplay loop />, [video]);

    const callback = useCallback(
        (event) => {
            event.preventDefault();
            setModal({
                type: 'stepInformationModal',
                content: backStyleModalContent,
            });
        },
        [setModal, backStyleModalContent],
    );

    return useMemo(
        () => (
            <button onClick={callback} className={`${styles.infoTrigger}`}>
                {t`More Information`}
            </button>
        ),
        [callback],
    );
};
