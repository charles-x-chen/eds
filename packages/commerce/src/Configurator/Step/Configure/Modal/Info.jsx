/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { useMemo } from 'preact/hooks';
import { useModalContext, Modal } from '../../../View/Modal';
import { useConfiguratorContext } from '../../../Context/Configurator';
import { capitalize } from '../../../calculator';
import { useCustomItemPrice } from '../hooks/useCustomItemPrice';
import { Price } from '../../../View/Price';
import { getCommerceUrl } from '../../../../Api/Url';
import styles from './style.module.css';
import Gallery from '~/View/Gallery';

export const Info = () => {
    const {
        modal: { data, title, subtitle = null, additionalModalClass = null, hidePrice = false, hideHeader = false },
    } = useModalContext();

    const { pieceInfo } = useConfiguratorContext();

    return useMemo(() => {
        const { pieces, fabric } = data;
        const pieceObjects = (pieces || [])
            .map((code) => pieceInfo.find(({ key, type }) => `${key}_${type}` === code))
            .filter(Boolean);

        return (
            <Modal
                title={title}
                closeTitle={t`Back to Sactional`}
                modalClass={`sactional-modal ${additionalModalClass}`}
                subtitle={subtitle}
            >
                <InfoContent pieces={pieceObjects} fabric={fabric} hidePrice={hidePrice} hideHeader={hideHeader} />
            </Modal>
        );
    }, [data, title, subtitle, additionalModalClass, hidePrice, pieceInfo, hideHeader]);
};

const PiecePrice = ({ code }) => {
    return (
        <span className="options-modal__slider-price">
            <Price value={useCustomItemPrice(code)} />
            {`/each`}
        </span>
    );
};

const InfoContent = ({ pieces, fabric, hidePrice, hideHeader }) => {
    return !Array.isArray(pieces) ? (
        <InfoContentItem piece={pieces} fabric={fabric} />
    ) : (
        <div className={`react-carousel ${hidePrice ? 'no-price' : null} ${styles.infoGalleryContainer}`}>
            <Gallery variant={'classic'}>
                {pieces.map((piece, index) => {
                    const { name, type, key } = piece;
                    return (
                        <div className={styles.sliderContent} key={index}>
                            {!hideHeader ? (
                                <div className={styles.sliderWrapper}>
                                    <span className={styles.sliderTitle}>{name}</span>
                                    {!hidePrice ? <PiecePrice code={`${key}_${type}`} /> : null}
                                </div>
                            ) : null}
                            <InfoContentItem piece={piece} fabric={fabric} />
                        </div>
                    );
                })}
            </Gallery>
        </div>
    );
};

const InfoContentItem = ({ piece, fabric }) => {
    const { description, includes, type, key, dimensions } = piece;
    const pieceDimensions = dimensions?.match(/\d+"\s\w+/g);
    const piecePath = `${capitalize(type).replaceAll(' ', '')}/${capitalize(key).replaceAll(' ', '')}`;
    const urlPrefix = getCommerceUrl(`media/threekit/${piecePath}/${fabric}/`);
    const dimensionUrl = `${urlPrefix}dimension.webp`;
    const dimensionImageFix = type === 'seat' ? '240%' : 'contain';

    return (
        <div className={styles.modalDetails} key={key}>
            <div className={styles.detailsTop}>
                <div className={styles.modalImage}>
                    <div
                        className={styles.imagePiece}
                        style={`background-image: url('${dimensionUrl}'); background-size: ${dimensionImageFix}`}
                    />
                </div>
                <div className={styles.dimensions}>
                    <h4 className={styles.includesTitle}>{t`Dimensions`}</h4>
                    <div className={styles.dimensionItems}>
                        <PieceDimension pieceDimensions={pieceDimensions} />
                        <p className={styles.itemDescription}>{description}</p>
                    </div>
                </div>
            </div>
            <div className={styles.optionsModalContent}>
                <ProductIncludes includes={includes} />
            </div>
        </div>
    );
};

const ProductIncludes = ({ includes }) => {
    return (
        includes.length && (
            <div className={styles.optionsModalIncludes}>
                <h4 className={styles.optionsModalIncludesTitle}>{t`Includes`}</h4>
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
                    <div className={styles.imageRow}>
                        <p className={styles.count}>
                            {t`x`}
                            <span>{count}</span>
                        </p>
                    </div>
                    <p className={styles.includesName}>{item}</p>
                </div>
            );
        });
    }
};

const PieceDimension = ({ pieceDimensions }) => {
    return (
        pieceDimensions &&
        pieceDimensions.map((item, index) => (
            <span className="dimensions-item" key={index}>
                {item}
            </span>
        ))
    );
};
