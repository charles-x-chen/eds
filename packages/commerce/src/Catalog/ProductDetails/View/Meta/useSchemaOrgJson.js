/**
 * @package     BlueAcorn/Catalog
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useMemo } from 'preact/hooks';
import { getProductUrl } from '~/Api/Url';

const defaultPrice = {
    value: 0,
    currency: 'USD',
};

export default function useSchemaOrgJson(product) {
    return useMemo(() => {
        const { sku, name, description, addToCartAllowed, inStock, images, price: priceData } = product;
        const { value: price, currency: priceCurrency } = priceData?.final?.amount || defaultPrice;
        const url = getProductUrl(product);

        return {
            '@context': 'http://schema.org/',
            '@type': 'Product',
            sku,
            name,
            description,
            url,
            image: images.find((image) => image.roles.includes('image'))?.url,
            offers: {
                '@type': 'Offer',
                url,
                availability:
                    inStock && addToCartAllowed ? 'http://schema.org/InStock' : 'http://schema.org/OutOfStock',
                price,
                priceCurrency,
            },
            aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '0',
                reviewCount: '0',
            },
        };
    }, [product]);
}
