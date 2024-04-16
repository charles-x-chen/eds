/**
 * @package     BlueAcorn/Catalog
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import AddToCartButton from '../Button';
import styles from './style.module.css';
import ProductPrice from '~/Catalog/ProductPrice';

export default function AddToCartSticky({ product }) {
    const { addToCartAllowed } = product;

    if (!addToCartAllowed) {
        return null;
    }

    return (
        <div className={styles.sticky}>
            <ProductPrice product={product} />
            <AddToCartButton product={product} />
        </div>
    );
}
