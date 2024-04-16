/**
 * @package     BlueAcorn/Catalog
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import ProductPrice from '~/Catalog/ProductPrice';

export default function ProductHeader({ product }) {
    return (
        <>
            <h1>{product.name}</h1>
            <div>
                <ProductPrice product={product} />
            </div>
        </>
    );
}
