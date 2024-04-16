/**
 * @package     BlueAcorn/MyHub
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useCallback, useMemo, useState } from 'preact/hooks';
import ConfigurationGuides from '../ConfigurationGuides';
import styles from './style.module.css';
import Modal from '~/View/Modal';
import RichText from '~/View/RichText';

export default function AccountCmsBlocks({ blocks, orders, responsive }) {
    const [showModal, setShowModal] = useState(false);
    const [videoUrl, setVideoUrl] = useState(null);
    const helpBlocks = useHelpBlocks(orders);
    const closeModal = useCallback(
        (event) => {
            event.preventDefault();
            setShowModal(false);
            setVideoUrl(null);
        },
        [setVideoUrl, setShowModal],
    );

    const openModal = useCallback(
        (event) => {
            const { target } = event;
            const slide = target.tagName === 'A' ? target : target.closest('a');
            if (!slide.dataset?.element) {
                return true;
            }
            event.preventDefault();
            if (slide) {
                setShowModal(true);
                setVideoUrl(slide.href);
            }
        },
        [setVideoUrl, setShowModal],
    );

    const handleKeyDown = useCallback(
        (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                openModal(e);
            }
        },
        [openModal],
    );

    return helpBlocks.length > 0 ? (
        <div
            className={styles.accountCmsWrapper}
            role="button"
            tabIndex={-1}
            onKeyDown={handleKeyDown}
            onClick={openModal}
        >
            {helpBlocks.map((item, index) => {
                if (blocks[item]) {
                    if (item.includes('sactionals')) {
                        const configurators = orders
                            .filter((order) =>
                                order.items.some((item) => item.name.toLowerCase().includes('sactional')),
                            )
                            .map((order) => order.configurators);

                        return (
                            <div key={index}>
                                <RichText content={blocks[item].content} />
                                <ConfigurationGuides configurators={configurators} responsive={responsive} />
                            </div>
                        );
                    }
                    return <RichText content={blocks[item].content} key={index} />;
                }
            })}
            {showModal && videoUrl ? (
                <Modal onCloseModal={closeModal}>
                    <div className={styles.videoContainer}>
                        <iframe className={styles.videoIframe} src={videoUrl} title={'Lovesac'} />
                    </div>
                </Modal>
            ) : null}
        </div>
    ) : null;
}

const searchStrings = ['sactionals', 'stealthtech', 'sacs'];
function useHelpBlocks(orders) {
    return useMemo(() => {
        const products = orders
            .flatMap((order) => order.items)
            .filter((item) => {
                const name = item.name?.toLowerCase() || '';
                return !name.includes('power hub');
            })
            .map((item) => item.product)
            .filter(Boolean);
        const categoryUrl = products
            .flatMap((product) => product.categories)
            .map((category) => category.urlPath)
            .filter(Boolean)
            .map((name) => name.toLowerCase());
        const categoriesToExclude = ['accessories'];
        const filteredCategoryUrl = categoryUrl.filter(
            (url) => !categoriesToExclude.some((excludedCategory) => url.includes(excludedCategory)),
        );
        return searchStrings
            .filter((keyword) => filteredCategoryUrl.some((name) => name.includes(keyword)))
            .map((keyword) => `${keyword}Help`);
    }, [orders]);
}
