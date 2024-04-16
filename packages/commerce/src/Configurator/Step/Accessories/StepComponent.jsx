/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useCallback, useEffect, useMemo, useRef } from 'preact/hooks';
import { useConfiguratorContext } from '../../Context/Configurator';
import { useStateContext } from '../../Context/State';
import { Price } from '../../View/Price';
import { Loader } from '../../View/Loader';
import { Gallery } from '../../View/Gallery';
import { ModalContextProvider, useModalContext } from '../../View/Modal';
import { useTotalsContext } from '../../Context/Totals';
import { calculateTotalPrice } from '../../calculator';
import {
    DECREMENT_ACCESSORY_QTY,
    INCREMENT_ACCESSORY_QTY,
    SELECT_ACCESSORY_VARIANT,
    SET_ACCESSORY_QTY,
} from './constants';
import ModalTypes from './Modal';
import styles from './style.module.css';
import mobileSignal from '~/Api/Mobile';
import RichText from '~/View/RichText';

export const StepComponent = () => {
    const {
        steps: {
            accessories: { title, subtitle },
        },
    } = useConfiguratorContext();
    return (
        <ModalContextProvider types={ModalTypes}>
            <div className={styles.contentWrapper}>
                <div className={styles.titleWrapper}>
                    <div className={styles.title}>{title}</div>
                </div>
                <div className={styles.subtitleWrapper}>
                    <div className={styles.subtitle}>{subtitle}</div>
                    <AccessoriesStepSubtitle />
                </div>
                <Accessories />
            </div>
        </ModalContextProvider>
    );
};

const Accessories = () => {
    const accessoriesRef = useRef(null);
    const isMobile = mobileSignal.value;

    useEffect(() => {
        if (accessoriesRef && isMobile) {
            accessoriesRef.current.parentNode.scrollIntoView();
        }
    }, [accessoriesRef, isMobile]);

    return (
        <div className={styles.accessoryContentWrapper} ref={accessoriesRef}>
            <AccessoryList />
        </div>
    );
};

const AccessoryList = () => {
    const { accessories } = useConfiguratorContext();

    const {
        modules: { styleArm, styleBack },
    } = useTotalsContext();

    const {
        modules: {
            accessories: {
                prevTotal: { options: prevOptions },
            },
        },
    } = useTotalsContext();

    // for single piece configurator and sactional configurators
    const optionPieces = Object.entries(prevOptions.pieces).filter(([, pieceValue]) => pieceValue > 0);

    const seatOnlyClass = optionPieces.length === 1 && optionPieces[0][0].includes('seat') ? 'seat-only' : null;
    const wedgeSeatClass = optionPieces.length === 1 && optionPieces[0][0].includes('wedge') ? 'wedge-seat' : null;
    let selectedPieces = optionPieces
        .filter(([pieceKey]) => /side/i.test(pieceKey))
        .map(([pieceKey]) => pieceKey.split(/(?=[A-Z])|_/)[0]);
    const isMixed = [...new Set(selectedPieces)].length > 2;

    if (!seatOnlyClass) {
        selectedPieces = styleArm
            ? [
                  styleArm.title.split(' ')[0].toLowerCase(),
                  styleBack.title.split(' ')[0].toLowerCase(),
                  ...selectedPieces,
              ]
            : selectedPieces;
    }

    selectedPieces = [...new Set(selectedPieces)];

    if (isMixed) {
        const sortOrderForMixedArms = {
            standard: -1,
            roll: 1,
        };

        selectedPieces = selectedPieces.sort(
            (a, b) => (sortOrderForMixedArms[a] || 0) - (sortOrderForMixedArms[b] || 0),
        );
    }
    selectedPieces.push('table', 'powerhub', 'block');

    const sortAndFilterAccessories = (accessoriesObj, selectedPiecesArr) => {
        const includeAngled = selectedPiecesArr.includes('angled');
        const result = {};

        for (const [accessoryType, accessories] of Object.entries(accessoriesObj)) {
            const filteredAccessoriesArr = Object.values(accessories).filter((accessory) => {
                const isStandardOrAngled = selectedPiecesArr.includes(accessory.group);
                return (
                    isStandardOrAngled || (includeAngled && accessory.group === 'angled') || accessory.group === 'table'
                );
            });

            if (filteredAccessoriesArr.length > 0) {
                for (const accessory of filteredAccessoriesArr) {
                    accessory.sortOrder = selectedPiecesArr.indexOf(accessory.group);
                }

                result[accessoryType] = Object.fromEntries(
                    filteredAccessoriesArr.map((accessory) => [accessory.piece.key, accessory]),
                );
            }
        }

        return result;
    };

    return (
        <div className={`${seatOnlyClass} ${wedgeSeatClass}`}>
            {Object.entries(sortAndFilterAccessories(accessories, selectedPieces)).map(([type, accessories]) => {
                return <Accessory key={type} type={type} accessories={accessories} />;
            })}
        </div>
    );
};

export const AccessoriesDescription = () => {
    const {
        config: { accessoriesStepMessage },
    } = useConfiguratorContext();

    return <RichText lassName="message-accessories" content={accessoriesStepMessage} />;
};

export const AccessoriesStepSubtitle = () => {
    const {
        config: { accessoriesStepSubtitle = null },
    } = useConfiguratorContext();

    return accessoriesStepSubtitle && <RichText className={styles.subtitle} content={accessoriesStepSubtitle} />;
};

const Accessory = ({ accessories, type }) => {
    const {
        state: { accessories: stateAccessories },
    } = useStateContext();
    const { key } = stateAccessories[type];
    const accessory = accessories[key];

    return useMemo(() => {
        return (
            <div className={`${styles.accessory} ${type}`} style={`order:${accessory.sortOrder}`}>
                <AccessoryImageGallery accessory={accessory} />
                <div className={styles.content}>
                    <AccessoryTitle accessory={accessory} type={type} />
                    <AccessoryVariants accessories={accessories} type={type} />
                    <div className={styles.actions}>
                        <div className={styles.price}>
                            <span>+</span>
                            <Loader>
                                <AccessoryPrice accessory={accessory} type={type} />
                            </Loader>
                        </div>
                        <AccessoryQty type={type} />
                    </div>
                </div>
            </div>
        );
    }, [accessory, type, accessories]);
};

const AccessoryPrice = ({ accessory, type }) => {
    const index = useConfiguratorContext();
    const {
        state: { accessories: stateAccessories },
    } = useStateContext();
    const {
        modules: {
            accessories: {
                prevTotal: { options: prevOptions },
            },
        },
    } = useTotalsContext();
    let { qty } = stateAccessories[type];
    qty = Math.max(qty, 1);

    const price = useMemo(() => {
        const objects = prevOptions.objects ? [...prevOptions.objects] : [];
        const options = { ...prevOptions, objects };
        objects.push([accessory.piece, qty]);
        const { objects: totalObjects } = calculateTotalPrice(index, options);
        return (totalObjects?.slice(-1)?.[0]?.rowTotal || 0) / qty;
    }, [prevOptions, accessory, qty, index]);

    return <Price value={price} />;
};

export const AccessoryTitle = ({ accessory, type }) => {
    const { setModal } = useModalContext();
    const galleryImages = accessory.images.map((image) => ({ img: image }));
    const showMoreInfo = useCallback(
        (event) => {
            event.preventDefault();
            setModal({
                type: 'info',
                title: accessory.name,
                data: {
                    leadTime: accessory.piece.leadTime,
                    description: accessory.description,
                    price: accessory.piece.price,
                    defaultImage: accessory.images[0],
                    image: accessory.images[0],
                    gallery: galleryImages,
                    type,
                },
            });
        },
        [setModal, accessory, type, galleryImages],
    );

    return (
        <div className={styles.accessoryTitle}>
            <button className={styles.accessoryDetailsLink} onClick={showMoreInfo}>
                {accessory.name}
            </button>
        </div>
    );
};

export const AccessoryVariants = ({ accessories, type }) => {
    const values = Object.values(accessories);
    if (values.length >= 2) {
        return (
            <div className={styles.variants}>
                {values.map((accessory, index) => {
                    return <AccessoryVariant accessory={accessory} type={type} key={index} />;
                })}
            </div>
        );
    }
    return null;
};

const AccessoryVariant = ({ accessory, type }) => {
    const {
        state: { accessories: stateAccessories },
        dispatch,
    } = useStateContext();
    const { key } = stateAccessories[type];
    const selected = accessory.piece.key === key;

    return (
        <label className={selected ? `${styles.checked}` : ``}>
            <AccessoryVariantImage src={accessory.swatch} />
            <AccessoryVariantInput dispatch={dispatch} type={type} selected={selected} value={accessory.piece.key} />
            <div className={styles.optTitle}>{accessory.name}</div>
        </label>
    );
};

const AccessoryVariantImage = ({ src }) => {
    return (
        <div className={styles.optSelect}>
            <span className={styles.optImage} style={`background: ${src}`} />
        </div>
    );
};

const AccessoryVariantInput = ({ dispatch, type, selected, value }) => {
    const callback = useCallback(
        (event) => {
            const { value } = event.target;
            dispatch({
                type: SELECT_ACCESSORY_VARIANT,
                value,
                itemType: type,
            });
        },
        [dispatch, type],
    );

    return (
        <input
            type="radio"
            name={`selectAccessoryVariant-${type}`}
            onClick={callback}
            value={value}
            checked={selected}
        />
    );
};

export const AccessoryQty = ({ type }) => {
    const { dispatch } = useStateContext();

    const callback = useCallback(
        (event) => {
            const { name, value } = event.target;
            dispatch({
                type: name,
                value,
                itemType: type,
            });
        },
        [dispatch, type],
    );

    return useMemo(
        () => (
            <div className={styles.qtyInput}>
                <button name={DECREMENT_ACCESSORY_QTY} className={styles.decrease} onClick={callback}>
                    &#x2d;
                </button>
                <AccessoryQtyInput callback={callback} type={type} />
                <button name={INCREMENT_ACCESSORY_QTY} className={styles.increase} onClick={callback}>
                    &#x2b;
                </button>
            </div>
        ),
        [callback, type],
    );
};

const AccessoryQtyInput = ({ callback, type }) => {
    const {
        state: { accessories: stateAccessories },
    } = useStateContext();
    const { qty } = stateAccessories[type];
    return useMemo(() => <input name={SET_ACCESSORY_QTY} value={qty} onInput={callback} />, [qty, callback]);
};

export const AccessoryImageGallery = ({ accessory: { images } }) => {
    const galleryImages = images.map((image) => ({ img: image }));
    return (
        <div className={styles.image}>
            <Gallery gallery={galleryImages} image={images[0]} defaultImage={images[0]} />
        </div>
    );
};
