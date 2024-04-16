/**
 * @package     BlueAcorn/Reviews
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useCallback, useMemo, useState } from 'preact/hooks';
import { t } from 'ttag';
import styles from './style.module.css';
import Modal from '~/View/Modal';
import Gallery from '~/View/Gallery';

export default function ReviewContent({ attributes, title, text, photos }) {
    return (
        <>
            <div className={styles.attributes}>
                {Object.entries(attributes).map(([index, { label, valueLabel }]) => (
                    <div key={index}>
                        <span className={styles.attributeLabel}>{label}:</span>
                        <span className={styles.attributeValue}>{valueLabel}</span>
                    </div>
                ))}
            </div>
            <div className={styles.title}>{title}</div>
            <div className={styles.text}>{text}</div>
            {photos?.length >= 1 ? <PhotoGallery gallery={photos} /> : null}
        </>
    );
}

function PhotoGallery({ gallery }) {
    const [currentIndex, setCurrentIndex] = useState(null);
    const onCloseModal = useCallback((event) => {
        event.preventDefault();
        setCurrentIndex(null);
    }, []);

    const openModal = useCallback((event) => {
        event.preventDefault();
        const index = parseInt(event.currentTarget.dataset.index, 10);
        if (!isNaN(index)) {
            setCurrentIndex(index);
        }
    }, []);

    const items = useMemo(
        () => gallery.map((image, index) => <img src={image.large} alt={image.label} key={index} />),
        [gallery],
    );

    return (
        <>
            <Thumbnails gallery={gallery} openModal={openModal} />

            {currentIndex !== null ? (
                <Modal title={t`Photos`} onCloseModal={onCloseModal} activeIndex={currentIndex}>
                    <Gallery>{items}</Gallery>
                </Modal>
            ) : null}
        </>
    );
}

function Thumbnails({ gallery, openModal }) {
    return (
        <div className={styles.thumbnails}>
            {gallery.map((image, index) => (
                <button data-index={index} key={index} onClick={openModal} aria-label={t`Show Image`}>
                    <img src={image.thumbnail} loading="lazy" alt="" />
                </button>
            ))}
        </div>
    );
}
