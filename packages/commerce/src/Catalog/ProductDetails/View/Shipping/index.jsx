/**
 * @package     BlueAcorn/Catalog
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import styles from './style.module.css';

export default function ShippingMessage({ product }) {
    const type = product.attributes.find(({ name }) => name === 'type')?.value;
    const leadTime = product.attributes.find(({ name }) => name === 'delivery_lead_time')?.value;

    if (!type || !leadTime) {
        return null;
    }

    return (
        <dl className={styles.shipping}>
            <dt>{type}</dt>
            <dd>{leadTime}</dd>
        </dl>
    );
}
