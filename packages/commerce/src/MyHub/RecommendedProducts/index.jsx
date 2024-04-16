/**
 * @package     BlueAcorn/MyHub
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { useMemo } from 'preact/hooks';
import useRecommendedProducts from './hooks/useRecommendedProducts';
import ProductSlider from '~/View/ProductSlider';

const emptyArray = [];

export default function RecommendedProducts({ orders, maxQty, mobileSlides, desktopSlides, fetching }) {
    const responsive = useMemo(
        () => ({ 0: { items: mobileSlides }, 1024: { items: desktopSlides } }),
        [mobileSlides, desktopSlides],
    );
    const [{ data }] = useRecommendedProducts(orders, maxQty, fetching);
    return (
        <ProductSlider
            items={data?.products?.items || emptyArray}
            title={t`Recommended for You`}
            responsive={responsive}
        />
    );
}

RecommendedProducts.defaultProps = {
    maxQty: 8,
    mobileSlides: 1,
    desktopSlides: 4,
};
