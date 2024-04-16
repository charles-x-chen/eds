/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useMemo } from 'preact/hooks';
import { useStateContext } from '../../Context/State';
import { Price } from '../../View/Price';
import { useConfiguratorContext } from '../../Context/Configurator';
import { calculateTotalPrice } from '../../calculator';
import { useStateInputCallback } from '../../hooks/useStateInputCallback';
import { useTotalsContext } from '../../Context/Totals';
import { Loader } from '../../View/Loader';
import { SET_FILL } from './constants';
import styles from './style.module.css';

export const StepComponent = () => {
    const {
        steps: {
            fill: { title, subtitle },
        },
        inserts,
    } = useConfiguratorContext();
    return (
        <div className={`${styles.contentWrapper}`}>
            <div className={`${styles.titleWrapper}`}>
                <div className={`${styles.title}`}>{title}</div>
                <div className={`${styles.signature}`}>{subtitle}</div>
            </div>
            <div className={`${styles.contentFill}`}>
                <Loader>
                    {inserts.map((insert) => {
                        return <FillType insert={insert} key={insert.key} />;
                    })}
                </Loader>
            </div>
        </div>
    );
};

const FillType = ({ insert }) => {
    const {
        state: { fill: stateFill },
    } = useStateContext();
    return useMemo(
        () => (
            <label className={`${styles.fillOption} ${stateFill === insert.code ? styles.fillOptionChecked : ''}`}>
                <FillTypeContent insert={insert} />
            </label>
        ),
        [stateFill, insert],
    );
};

const FillTypeContent = ({ insert }) => {
    const { name, description, code } = insert;

    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.top}`}>
                <div>
                    <div className={`${styles.image} ${code}`} />
                    <div className={`${styles.totalTitle}`}>
                        <div className={`${styles.titleName}`}>{name}</div>
                        <FillPrice code={code} />
                    </div>
                </div>
                <div className={`${styles.checkboxContainer}`}>
                    <FillTypeInput code={code} />
                    <span className={`${styles.fillCheckboxNew}`} />
                </div>
            </div>
            <div className={`${styles.bottom}`}>{description}</div>
        </div>
    );
};

const FillPrice = ({ code }) => {
    const index = useConfiguratorContext();
    const {
        modules: {
            fill: { options, total },
        },
    } = useTotalsContext();

    return useMemo(() => {
        const newOptions = { ...options, fill: code };
        const fillPrice = calculateTotalPrice(index, newOptions).total - total;

        return (
            <div className={`${styles.totalPrice}`}>
                {fillPrice >= 0 ? `+ ` : `- `}
                <Price value={Math.abs(fillPrice)} />
            </div>
        );
    }, [index, code, options, total]);
};

const FillTypeInput = ({ code }) => {
    const {
        state: { fill: stateFill },
    } = useStateContext();
    const callback = useStateInputCallback();

    return useMemo(
        () => (
            <input
                type="radio"
                className={`${styles.fillCheckbox}`}
                name={SET_FILL}
                onClick={callback}
                value={code}
                checked={stateFill === code}
            />
        ),
        [callback, stateFill, code],
    );
};
