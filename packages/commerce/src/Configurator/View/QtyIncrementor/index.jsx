/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useCallback, useMemo } from 'preact/hooks';
import { t } from 'ttag';
import { BsDash, BsPlus } from 'react-icons/bs';
import { useStateContext } from '../../Context/State';
import { SET_QTY } from '../../Step/Qty/constants';
import styles from './style.module.css';
import mobileSignal from '~/Api/Mobile';

export const QtyIncrementor = ({ show, label = null }) => {
    const isMobile = mobileSignal.value;
    const {
        state: { qty: count },
        dispatch,
    } = useStateContext();

    const setCount = useCallback(
        (value) => {
            dispatch({
                type: SET_QTY,
                value,
            });
        },
        [dispatch],
    );

    const isVisible = useMemo(() => {
        if (show === 'mobile') {
            return isMobile;
        }
        if (show === 'desktop') {
            return !isMobile;
        }
        return show === 'both';
    }, [show, isMobile]);

    return isVisible ? <QtyIncrementorVisible count={count} setCount={setCount} show={show} label={label} /> : null;
};

const QtyIncrementorVisible = ({ count, setCount, show, label }) => {
    const increment = useCallback(() => setCount(Math.max(count + 1, 1)), [count, setCount]);
    const decrement = useCallback(() => setCount(Math.max(count - 1, 1)), [count, setCount]);
    const updateQty = useCallback((e) => setCount(Math.max(parseInt(e.target.value, 10), 1)), [setCount]);

    return (
        <div className={`${styles.wrapper} ${show}`}>
            <span className={styles.title}>{label ?? t`Select Quantity:`}</span>
            <div className={styles.actionsWrapper}>
                <button className="summary-actions-decrement" onClick={decrement} disabled={count <= 1}>
                    <span>{t`decrement`}</span>
                    <BsDash />
                </button>
                <input type="number" className="summary-actions__qty" min="1" value={count} onChange={updateQty} />
                <button className="summary-actions-increment" onClick={increment}>
                    <span>{t`increment`}</span>
                    <BsPlus />
                </button>
            </div>
        </div>
    );
};
