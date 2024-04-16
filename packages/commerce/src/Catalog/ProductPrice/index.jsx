/**
 * @package     BlueAcorn/Catalog
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import Price from '~/View/Price';

export default function ProductPrice({ product }) {
    const { price, addToCartAllowed, priceRange } = product;
    return addToCartAllowed ? priceRange ? <PriceRange {...priceRange} /> : <RegularPrice {...price} /> : null;
}

function RegularPrice({ final: { amount: finalPrice }, regular: { amount: regularPrice } }) {
    const showStrikeThrough = regularPrice.value > finalPrice.value;
    return (
        <>
            {showStrikeThrough ? (
                <s>
                    <Price {...regularPrice} />
                </s>
            ) : null}
            <Price {...finalPrice} />
        </>
    );
}

function PriceRange({ minimum, maximum }) {
    return (
        <>
            <RegularPrice {...minimum} />
            {' - '}
            <RegularPrice {...maximum} />
        </>
    );
}
