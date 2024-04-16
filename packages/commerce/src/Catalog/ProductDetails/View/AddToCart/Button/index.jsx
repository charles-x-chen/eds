/**
 * @package     BlueAcorn/Catalog
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { useCallback } from 'preact/hooks';
import useAddToCart from '../hooks/useAddToCart';

export default function AddToCartButton({ product }) {
    const [{ fetching }, addToCart] = useAddToCart();

    const callback = useCallback(
        async (event) => {
            event.preventDefault();
            const result = await addToCart({
                sku: product.sku,
                quantity: 1,
            });
            if (result.data) {
                alert('Added');
            }
        },
        [product, addToCart],
    );

    return (
        <button onClick={callback} disabled={fetching}>
            {fetching ? t`Adding...` : t`Add To Cart`}
        </button>
    );
}
