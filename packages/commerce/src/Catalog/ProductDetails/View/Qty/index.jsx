/**
 * @package     BlueAcorn/Catalog
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useCallback, useState } from 'preact/hooks';
import styles from './style.module.css';

export default function ProductQty() {
    const [qty, setQty] = useState(1);

    const onChange = useCallback((event) => {
        const { target } = event;
        if (target.name === 'qty') {
            setQty(Math.max(1, Number(target.value)));
        } else {
            event.preventDefault();
            const change = target.name === 'inc' ? 1 : -1;
            setQty((qty) => Math.max(1, qty + change));
        }
    }, []);

    return (
        <div className={styles.qty}>
            <button name="dec" onClick={onChange}>
                -
            </button>
            <input name="qty" value={qty} onChange={onChange} />
            <button name="inc" onClick={onChange}>
                +
            </button>
        </div>
    );
}
