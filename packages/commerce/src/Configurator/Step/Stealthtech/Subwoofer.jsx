/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */

import { useCallback, useMemo } from 'preact/hooks';
import { t } from 'ttag';
import { useStateContext } from '../../Context/State';
import { useOptionPrice } from '../Options/hooks/useOptionPrice';
import { Price as PriceFormat } from '../../View/Price';
import { DECREMENT_OPTION_QTY, INCREMENT_OPTION_QTY, SET_OPTION_QTY, TYPE_SUBWOOFER } from '../Options/constants';
import { useModalContext } from '../../View/Modal';
import { useConfiguratorContext } from '../../Context/Configurator';
import styles from './style.module.css';
import RichText from '~/View/RichText';

export const Subwoofer = () => {
    const { options: indexOptions } = useConfiguratorContext();
    const {
        state: { options },
    } = useStateContext();

    const subWooferItem = indexOptions[TYPE_SUBWOOFER];
    if (!subWooferItem) {
        return;
    }
    const {
        piece: { type },
    } = subWooferItem;
    const maxQty = options[type].maxQty;

    if (maxQty === 0) {
        return;
    }

    return (
        <div className={styles.subwooferWrapper}>
            <div>
                <RichText className={styles.subwooferTitle} content={subWooferItem.shortDescription} />
                <div className="details">
                    <SubwooferDetailsButton option={subWooferItem} />
                </div>
                <div className={styles.subwooferPriceWrapper}>
                    <SubwooferPrice option={subWooferItem} qty={Math.min(options[type].qty + 1, maxQty)} />
                    <SubwooferQty code={type} />
                </div>
            </div>
        </div>
    );
};

const SubwooferPrice = ({ option, qty }) => {
    const { price, msrp } = useOptionPrice(option, qty);

    return useMemo(() => {
        const normalPrice = (
            <span className={styles.optionsNormalPrice}>
                +
                <PriceFormat value={price} />
                {t`/each`}
            </span>
        );

        if (msrp > price) {
            return (
                <div className={styles.optionsPrices}>
                    <s className={styles.optionsOldPrice}>
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

const SubwooferQty = ({ code }) => {
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
        <div className={styles.optionQty}>
            <SubwooferDecrementButton callback={callback} stateOption={stateOption} />
            <SubwooferQtyInput callback={callback} stateOption={stateOption} />
            <SubwooferIncrementButton callback={callback} stateOption={stateOption} />
        </div>
    );
};

const SubwooferQtyInput = ({ callback, stateOption: { qty } }) => {
    return useMemo(() => <input name={SET_OPTION_QTY} value={qty} onInput={callback} />, [qty, callback]);
};

const SubwooferDecrementButton = ({ callback, stateOption: { qty, minQty } }) => {
    const disabled = qty <= minQty;
    return useMemo(
        () => (
            <button name={DECREMENT_OPTION_QTY} className={'decrease'} onClick={callback} disabled={disabled}>
                -
            </button>
        ),
        [disabled, callback],
    );
};

const SubwooferIncrementButton = ({ callback, stateOption: { qty, maxQty } }) => {
    const disabled = qty >= maxQty;
    return useMemo(
        () => (
            <button name={INCREMENT_OPTION_QTY} className={'increase'} onClick={callback} disabled={disabled}>
                +
            </button>
        ),
        [disabled, callback],
    );
};

const SubwooferDetailsButton = ({ option }) => {
    const { name, description, features } = option;
    const { setModal } = useModalContext();
    const showMoreInfo = useCallback(
        (event) => {
            event.preventDefault();
            setModal({
                type: 'info',
                title: name,
                modalTitle: t`Satellite Subwoofer`,
                data: {
                    shortDescription: description,
                    features,
                },
            });
        },
        [setModal, name, description, features],
    );

    return (
        <button className={styles.subwooferDetailsLink} data-item-code={option.type} onClick={showMoreInfo}>
            {t`Details`}
        </button>
    );
};
