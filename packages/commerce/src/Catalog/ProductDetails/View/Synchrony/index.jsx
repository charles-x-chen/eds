/**
 * @package     BlueAcorn/Catalog
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useEffect } from 'preact/hooks';
import styles from './style.module.css';
import { synchronyInit } from '~/Api/Synchrony';

export default function SynchronyMessage({ product, config }) {
    useEffect(() => {
        synchronyInit(config);
    }, [config]);

    const amount = product.price.final.amount.value;

    return (
        <div id="financing-content" className={styles.synchrony}>
            <div id="product-content" className="product-content-val" hidden>
                {amount}
            </div>
            <div className="sync-price" />
        </div>
    );
}
