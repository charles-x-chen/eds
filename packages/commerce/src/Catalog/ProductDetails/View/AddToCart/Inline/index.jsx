/**
 * @package     BlueAcorn/Catalog
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import ProductQty from '../../Qty';
import AddToCartButton from '../Button';
import styles from './style.module.css';

export default function AddToCartInline({ product }) {
    const { addToCartAllowed } = product;

    if (!addToCartAllowed) {
        return null;
    }

    return (
        <div className={styles.inline}>
            <ProductQty product={product} />
            <AddToCartButton product={product} />
        </div>
    );
}
