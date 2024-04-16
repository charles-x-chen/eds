/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { useCallback, useMemo } from 'preact/hooks';
import { useConfiguratorContext } from '../../Context/Configurator';
import { Gallery } from '../../View/Gallery';
import { useStateContext } from '../../Context/State';
import { Price as PriceFormat } from '../../View/Price';
import { ModalContextProvider, useModalContext } from '../../View/Modal';
import { Loader } from '../../View/Loader';
import { SET_OPTION_QTY, DECREMENT_OPTION_QTY, INCREMENT_OPTION_QTY } from './constants';
import { useOptionPrice } from './hooks/useOptionPrice';
import ModalTypes from './Modal';
import styles from './style.module.css';

export const StepComponent = () => {
    return (
        <ModalContextProvider types={ModalTypes}>
            <OptionContent />
        </ModalContextProvider>
    );
};

const OptionContent = () => {
    const {
        steps: {
            options: { title, subtitle },
        },
    } = useConfiguratorContext();

    const { options: indexOptions, preBuilt = null } = useConfiguratorContext();

    return (
        <div className="content-option-wrapper">
            <div className={styles.titleWrapper}>
                <h3>{title}</h3>
                <div>{subtitle}</div>
            </div>
            <div className="content-option">
                <Loader>
                    {Object.entries(indexOptions).map(([code, option]) => {
                        return (
                            !shouldHideOption(preBuilt, code) && (
                                <OptionType key={code} code={option.piece.type} option={option} />
                            )
                        );
                    })}
                </Loader>
            </div>
        </div>
    );
};

const OptionType = ({ code, option }) => {
    const { name, images, shortDescription } = option;
    const galleryImages = images.map((image) => ({ img: image }));
    const {
        state: { options },
    } = useStateContext();

    const maxQty = options[code].maxQty;

    if (maxQty === 0) {
        return;
    }

    return (
        <div className={styles.option}>
            <div className={styles.image}>
                <Gallery gallery={galleryImages} image={images[0]} defaultImage={images[0]} />
            </div>
            <div className={styles.content}>
                <div className={styles.titleContainer}>
                    <div className={styles.title}>{name}</div>
                    <OptionQty code={code} />
                </div>
                <div className={styles.price}>
                    <OptionPrice option={option} qty={Math.min(options[code].qty + 1, maxQty)} />
                </div>
            </div>
            <div className={styles.description}>
                <div className="subheader">{shortDescription}</div>
            </div>
            <div className={styles.details}>
                <OptionDetailsButton option={option} />
            </div>
        </div>
    );
};

const OptionPrice = ({ option, qty }) => {
    const { price, msrp } = useOptionPrice(option, qty);

    return useMemo(() => {
        const normalPrice = (
            <span className={styles.normalPrice}>
                +
                <PriceFormat value={price} />
                {t`/each`}
            </span>
        );

        if (msrp > price) {
            return (
                <div className={styles.prices}>
                    <s className={styles.oldPrice}>
                        +
                        <PriceFormat value={msrp} />
                        {t`/each`}
                    </s>
                    {normalPrice}
                </div>
            );
        }

        return normalPrice;
    }, [price, msrp]);
};

const OptionQty = ({ code }) => {
    const {
        dispatch,
        state: { options },
    } = useStateContext();
    const callback = useCallback(
        (event) => {
            const { name, value } = event.target;
            dispatch({
                type: name,
                value,
                code,
            });
        },
        [dispatch, code],
    );
    const stateOption = options[code];

    return (
        <div className={styles.optionQuantity}>
            <OptionDecrementButton callback={callback} stateOption={stateOption} />
            <OptionQtyInput callback={callback} stateOption={stateOption} />
            <OptionIncrementButton callback={callback} stateOption={stateOption} />
        </div>
    );
};

const OptionQtyInput = ({ callback, stateOption: { qty } }) => {
    return useMemo(() => <input name={SET_OPTION_QTY} value={qty} onInput={callback} />, [qty, callback]);
};

const OptionDecrementButton = ({ callback, stateOption: { qty, minQty } }) => {
    const disabled = qty <= minQty;
    return useMemo(
        () => (
            <button name={DECREMENT_OPTION_QTY} className={styles.decrease} onClick={callback} disabled={disabled}>
                -
            </button>
        ),
        [disabled, callback],
    );
};

const OptionIncrementButton = ({ callback, stateOption: { qty, maxQty } }) => {
    const disabled = qty >= maxQty;
    return useMemo(
        () => (
            <button name={INCREMENT_OPTION_QTY} className={styles.increase} onClick={callback} disabled={disabled}>
                +
            </button>
        ),
        [disabled, callback],
    );
};

const OptionDetailsButton = ({ option }) => {
    const { name } = option;

    const { setModal } = useModalContext();
    const showMoreInfo = useCallback(
        (event) => {
            event.preventDefault();
            setModal({
                type: 'info',
                title: name,
                data: option,
            });
        },
        [setModal, name, option],
    );

    return (
        <button className={styles.detailsLink} data-item-code={option.type} onClick={showMoreInfo}>
            {t`Details`}
        </button>
    );
};

const shouldHideOption = (preBuilt, code) => {
    if (preBuilt && code.includes('storage')) {
        const preBuiltSkus = Object.keys(preBuilt);
        if (preBuiltSkus.length === 1) {
            const preBuiltSku = preBuiltSkus[0];
            const { pieces } = preBuilt[preBuiltSku];
            if (pieces) {
                for (const key in pieces) {
                    if (pieces[key] > 0 && key.toLowerCase().includes('storage')) {
                        return true;
                    }
                }
                return false;
            }
        }
    }

    return !!code.includes('Subwoofer');
};
