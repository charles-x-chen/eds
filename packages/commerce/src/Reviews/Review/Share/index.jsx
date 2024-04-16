/**
 * @package     BlueAcorn/Reviews
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { useMemo, useCallback, useState } from 'preact/hooks';
import { BsFacebook, BsLink45Deg, BsPinterest, BsShare, BsTwitter } from 'react-icons/bs';
import styles from './style.module.css';
import Modal from '~/View/Modal';

export default function ShareReview({ id, title, photos, text }) {
    const [showShareReviewModal, setShowShareReviewModal] = useState(false);
    const openModal = useCallback(
        (event) => {
            event.preventDefault();
            setShowShareReviewModal(true);
        },
        [setShowShareReviewModal],
    );

    return useMemo(
        () => (
            <>
                <button className={styles.shareButton} onClick={openModal}>
                    <span className={styles.icon}>
                        <BsShare />
                    </span>
                    {`Share`}
                </button>
                {showShareReviewModal ? (
                    <ShareReviewModal
                        id={id}
                        setShowShareReviewModal={setShowShareReviewModal}
                        photos={photos}
                        title={title}
                        text={text}
                    />
                ) : null}
            </>
        ),
        [showShareReviewModal, openModal, title, photos, text, id],
    );
}

function ShareReviewModal({ setShowShareReviewModal, id, title, photos, text }) {
    const onCloseModal = useCallback(
        (event) => {
            event.preventDefault();
            setShowShareReviewModal(false);
        },
        [setShowShareReviewModal],
    );

    return (
        <Modal title="Share" onCloseModal={onCloseModal}>
            <div className={styles.content}>
                <div className={styles.title}>{title}</div>
                <div className={styles.text}>{text}</div>
                <div className={styles.social}>
                    <Facebook id={id} />
                    <Twitter id={id} title={title} />
                    <Pinterest id={id} title={title} photos={photos} />
                </div>
                <Copy id={id} />
            </div>
        </Modal>
    );
}

function Copy({ id }) {
    const [loading, setLoading] = useState(false);
    const [linkLabel, setLinkLabel] = useState(t`Copy Link`);
    const saveButtonCallback = useCallback(
        (event) => {
            event.preventDefault();
            setLoading(true);
            setLinkLabel(t`Copying`);
            if (window.ClipboardItem) {
                // Safari and other browsers
                const getUrlBlob = async () => {
                    const url = `${window.location.origin + window.location.pathname}#${id}`;
                    return new Blob([url], { type: 'text/plain' });
                };
                const text = new window.ClipboardItem({ 'text/plain': getUrlBlob() });
                navigator.clipboard.write([text]);
                setTimeout(() => {
                    setLoading(false);
                    setLinkLabel(t`Copied`);
                }, 1000);
            }
        },
        [id],
    );

    return useMemo(() => {
        return (
            <div>
                <button
                    className={styles.copy}
                    disabled={loading}
                    onClick={saveButtonCallback}
                    aria-label={t`Copy Link`}
                >
                    {linkLabel}
                    <span>
                        <BsLink45Deg />
                    </span>
                </button>
            </div>
        );
    }, [loading, linkLabel, saveButtonCallback]);
}

function Facebook({ id }) {
    const url = `${window.location.href}#${id}`;

    const saveButtonCallback = useCallback(
        async (event) => {
            event.preventDefault();
            if (id) {
                window.open(`https://www.facebook.com/sharer.php?u=${url}`, `_blank`);
            }
        },
        [id, url],
    );

    return (
        <button onClick={saveButtonCallback} aria-label={t`Share on Facebook`}>
            <BsFacebook />
        </button>
    );
}

function Twitter({ id, title }) {
    const url = `${window.location.href}#${id}`;

    const saveButtonCallback = useCallback(
        async (event) => {
            event.preventDefault();
            if (id) {
                window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}&hashtags=${title}`, `_blank`);
            }
        },
        [id, url, title],
    );

    return (
        <button onClick={saveButtonCallback} aria-label={t`Share on Twitter`}>
            <BsTwitter />
        </button>
    );
}

function Pinterest({ id, photos = null, title }) {
    const url = `${window.location.href}#${id}`;
    const photo = photos.length ? photos[0].thumbnail : null;

    const saveButtonCallback = useCallback(
        async (event) => {
            event.preventDefault();
            if (id) {
                window.open(
                    `https://www.pinterest.com/pin/create/link/?url=${url}&media=${photo}&description=${title}`,
                    `_blank`,
                );
            }
        },
        [id, url, title, photo],
    );

    return (
        <button onClick={saveButtonCallback} aria-label={t`Share on Pinterest`}>
            <BsPinterest />
        </button>
    );
}
