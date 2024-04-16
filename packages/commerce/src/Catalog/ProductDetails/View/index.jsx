/**
 * @package     BlueAcorn/Catalog
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useMemo } from 'preact/hooks';
import AffirmMessage from './Affirm';
import SynchronyMessage from './Synchrony';
import Rating from './Rating';
import ShippingMessage from './Shipping';
import ProductHeader from './Header';
import styles from './style.module.css';
import ProductDescription from './Description';
import ProductGallery from './Gallery';
import ProductActions from './Actions';
import TotalComfort from './TotalComfort';
import ProductQty from './Qty';
import AddToCartSticky from './AddToCart/Sticky';
import AddToCartInline from './AddToCart/Inline';
import RelatedProducts from './RelatedProducts';
import ProductMeta from './Meta';
import mobileSignal from '~/Api/Mobile';
import Reviews from '~/Reviews';
import { getProductUrl } from '~/Api/Url';
import Breadcrumbs from '~/View/Breadcrumbs';
import ErrorBox, { ErrorBoxList } from '~/View/ErrorBox';

export default function ProductDetailsView({ product, config }) {
    return (
        <ErrorBox>
            <ProductMeta product={product} />
            <ProductDetailsBreadcrumbs product={product} />
            <ProductDetailsMain product={product} config={config} />
            <RelatedProducts product={product} />
            <Reviews sku={product.sku} />
        </ErrorBox>
    );
}

function ProductDetailsBreadcrumbs({ product }) {
    const breadcrumbs = useMemo(
        () => [
            {
                url: getProductUrl(product),
                name: product.name,
            },
        ],
        [product],
    );

    return <Breadcrumbs items={breadcrumbs} />;
}

function ProductDetailsMain({ product, config }) {
    if (mobileSignal.value) {
        return (
            <div className={styles.rootMobile}>
                <ErrorBoxList silent={true}>
                    <ProductHeader product={product} />
                    <AddToCartSticky product={product} />
                    <ProductGallery product={product} />
                    <div className={styles.info}>
                        <ErrorBoxList silent={true}>
                            <ProductQty product={product} />
                            <SynchronyMessage product={product} config={config} />
                            <AffirmMessage product={product} config={config} />
                            <ShippingMessage product={product} />
                            <ProductActions product={product} />
                            <TotalComfort />
                            <Rating product={product} />
                        </ErrorBoxList>
                    </div>
                    <ProductDescription product={product} />
                </ErrorBoxList>
            </div>
        );
    }

    return (
        <div className={styles.rootDesktop}>
            <div className={styles.main}>
                <ErrorBoxList silent={true}>
                    <ProductGallery product={product} />
                    <ProductDescription product={product} />
                </ErrorBoxList>
            </div>
            <div className={styles.info}>
                <ErrorBoxList silent={true}>
                    <ProductHeader product={product} />
                    <AddToCartInline product={product} />
                    <SynchronyMessage product={product} config={config} />
                    <AffirmMessage product={product} config={config} />
                    <ShippingMessage product={product} />
                    <ProductActions product={product} />
                    <TotalComfort />
                    <Rating product={product} />
                </ErrorBoxList>
            </div>
        </div>
    );
}
