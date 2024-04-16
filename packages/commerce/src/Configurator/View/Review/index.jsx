/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { Component, createRef } from 'preact';
import { useMemo, useState, useCallback } from 'preact/hooks';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { useConfiguratorContext } from '../../Context/Configurator';
import styles from './style.module.css';
import Reviews from '~/Reviews';
import Modal from '~/View/Modal';

export class ReviewsInitializer extends Component {
    constructor(props) {
        super(props);
        this.ref = createRef();
        this.state = { visibility: false };
        this.node = document.querySelector('.configurator-review-widget');
        this.onClose = () => this.props.handleClose(false);
    }

    componentDidMount() {
        if (this.node) {
            this.ref.current.appendChild(this.node);
            this.node.style.display = '';
        }
    }

    componentWillUnmount() {
        if (this.node && this.node.parentNode === this.ref.current) {
            this.node.style.display = 'none';
            document.body.appendChild(this.node);
        }
    }

    onClick() {
        this.setState({ visibility: true });
    }

    getStyles() {
        return { display: this.props.opened ? 'block' : 'none' };
    }

    render() {
        if (this.props.opened) {
            const reviewsModalWrapper = this.ref.current;
            const reviewButtons = reviewsModalWrapper.querySelectorAll('.write-review-button');

            for (const el of reviewButtons) {
                el.addEventListener('click', () => {
                    reviewsModalWrapper.classList.add('active');
                });
            }
        }

        return (
            <div className="modal-dialog reviews" style={this.getStyles()}>
                <div className="modal-content">
                    <div className="modal-header">
                        <span className="modal-title">{t`Customer Reviews`}</span>
                        <button className="btn-close" onClick={this.onClose} />
                    </div>
                    <div className="modal-body" ref={this.ref} />
                </div>
            </div>
        );
    }
}

export const ReviewContent = () => {
    const [showModal, setShowModal] = useState(false);
    const {
        reviews: {
            stats: { reviewCount },
            sku: reviewSku,
        },
    } = useConfiguratorContext();
    const onOpen = useCallback(() => setShowModal(true), []);
    const onClose = useCallback(() => setShowModal(false), []);

    return (
        <div className="review">
            <button className="total-reviews" onClick={onOpen}>
                <ReviewContentStars />
                <span>
                    {reviewCount} {t`Reviews`}
                </span>
            </button>
            {showModal ? (
                <Modal title={t`Reviews`} onCloseModal={onClose}>
                    <Reviews sku={reviewSku} />
                </Modal>
            ) : null}
        </div>
    );
};

export const ReviewContentStars = () => {
    const {
        reviews: {
            stats: { rating: reviewAverageScore },
        },
    } = useConfiguratorContext();

    return useMemo(() => {
        const score = Math.round(reviewAverageScore * 2) / 2;
        const stars = Array.from(Array(11).keys(), (x) => x / 2);

        return (
            <div className="rating-group">
                {stars.map((qty) => (
                    <label
                        aria-label={`${qty} star${qty !== 1 ? 's' : ''}`}
                        className={`${styles.ratingLabel} ${qty === 0 ? 'rating__label--none' : ''} ${
                            (qty * 2) % 2 === 1 ? styles.half : ''
                        } ${score >= qty ? `checked` : `empty`}`}
                        key={qty}
                    >
                        <span className="rating__icon rating__icon--star">
                            {qty <= score ? qty === Math.ceil(score) ? <BsStarHalf /> : <BsStarFill /> : <BsStar />}
                        </span>
                    </label>
                ))}
            </div>
        );
    }, [reviewAverageScore]);
};

export const ReviewContentCount = () => {
    const {
        reviews: {
            stats: { reviewCount },
        },
    } = useConfiguratorContext();

    return reviewCount;
};
