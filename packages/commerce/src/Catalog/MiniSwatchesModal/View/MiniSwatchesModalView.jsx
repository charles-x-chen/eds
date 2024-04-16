/**
 * @package     BlueAcorn/MyHub
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useCallback, useMemo } from 'preact/hooks';
import { t } from 'ttag';
import { BsFillXCircleFill, BsX } from 'react-icons/bs';
import styles from './style.module.css';
import Modal from '~/View/Modal';
import RichText from '~/View/RichText';
import mobileSignal from '~/Api/Mobile';

export default function MiniSwatchesModalView({ item, showModal, setShowModal, sku, dataProductId }) {
    const { name, image, coverAttributes = [] } = item;
    const isMobile = mobileSignal.value;

    const closeModal = useCallback(
        (event) => {
            event.preventDefault();
            document.body.classList.remove('swatch-modal-active');
            document.querySelector(`[data-sku="${sku}"]`)?.classList.remove('active');
            setShowModal(false);
        },
        [setShowModal, sku],
    );

    return useMemo(
        () =>
            showModal && (
                <Modal
                    onCloseModal={closeModal}
                    variant="classic"
                    icon={isMobile ? <BsFillXCircleFill /> : <BsX />}
                    roundedBorders={!isMobile}
                >
                    <h3 className={styles.miniSwatchesProductName}>{name}</h3>
                    <div className={styles.miniSwatchesContentWrapper}>
                        <div className={styles.miniSwatchesImageWrapper}>
                            <img height={270} width={270} src={image.url} alt={name} />
                            {isMobile ? (
                                <GetFabricInformation
                                    fabricContents={coverAttributes?.composition}
                                    colorFamily={coverAttributes?.colorFamilyLabel}
                                />
                            ) : (
                                <GetAddToCartAction dataProductId={dataProductId} />
                            )}
                        </div>
                        <div className={styles.miniSwatchesTextWrapper}>
                            <GetFeatures coverFeatures={coverAttributes?.coverFeatures} />
                            {!isMobile ? (
                                <GetFabricInformation
                                    fabricContents={coverAttributes?.composition}
                                    colorFamily={coverAttributes?.colorFamilyLabel}
                                />
                            ) : null}
                            <div className={styles.miniSwatchesFabricDescription}>
                                <RichText content={coverAttributes?.featuresDescription} />
                            </div>
                            {isMobile ? <GetAddToCartAction dataProductId={dataProductId} /> : null}
                        </div>
                    </div>
                </Modal>
            ),
        [showModal, closeModal, name, image.url, coverAttributes, isMobile, dataProductId],
    );

    function GetFeatures({ coverFeatures }) {
        return (
            coverFeatures?.length > 0 && (
                <div className={styles.miniSwatchesFeatures}>
                    <span className={styles.miniSwatchesTextTitle}>{t`Features`}</span>
                    <ul className={styles.miniSwatchesLists}>
                        {coverFeatures.map(({ image, title }, index) => (
                            <li className={styles.miniSwatchesList} key={index}>
                                <img src={image} alt={title} />
                                <span>{title}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        );
    }

    function GetFabricInformation({ fabricContents, colorFamily }) {
        return (
            <div className={styles.miniSwatchesFabricInformation}>
                {fabricContents ? (
                    <div className={styles.miniSwatchesFabricInformationItem}>
                        <span className={styles.miniSwatchesInfoTitle}>{t`Fabric Composition`}</span>
                        <span>{fabricContents}</span>
                    </div>
                ) : null}
                {colorFamily ? (
                    <div className={styles.miniSwatchesFabricInformationItem}>
                        <span className={styles.miniSwatchesInfoTitle}>{t`Color`}</span>
                        <span>{colorFamily}</span>
                    </div>
                ) : null}
            </div>
        );
    }

    function GetAddToCartAction({ dataProductId }) {
        const isFabricAdded = document
            .querySelector(`[data-product-id="${dataProductId}"]`)
            .classList.contains('fg-added');
        const buttonLabel = isFabricAdded ? 'Remove -' : 'Add Free Swatch';
        const buttonClass = isFabricAdded ? `${styles.atcButton} ${styles.removeButton}` : `${styles.atcButton}`;
        const addSwatch = useCallback(
            (event) => {
                event.preventDefault();
                document.querySelector(`[data-product-id="${dataProductId}"]`)?.click();
            },
            [dataProductId],
        );

        return (
            <button className={buttonClass} onClick={addSwatch}>
                {buttonLabel}
            </button>
        );
    }
}
