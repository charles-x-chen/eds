/**
 * @package     BlueAcorn/View
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import Price from '../Price';
import Gallery from '../Gallery';
import styles from './style.module.css';
import { getCommerceUrl } from '~/Api/Url';
import ErrorBox from '~/View/ErrorBox';

export default function ProductSlider({ items, title, responsive }) {
    return items?.length ? (
        <ErrorBox>
            <div className={styles.productsWrapper}>
                <h3>{title}</h3>
                <Gallery variant="classic" responsive={responsive}>
                    {items.map((item, index) => (
                        <ProductItemsData item={item} key={index} />
                    ))}
                </Gallery>
            </div>
        </ErrorBox>
    ) : null;
}

function ProductItemsData({
    item: {
        image,
        name,
        canonicalUrl,
        priceRange: {
            minimumPrice: { finalPrice, regularPrice },
        },
    },
}) {
    return (
        <div className={styles.productsSliderItem}>
            <a href={getCommerceUrl(canonicalUrl)} className={styles.productsSliderLink}>
                <div className={styles.productsSliderImageWrapper}>
                    <img
                        className={styles.productsSliderImage}
                        src={image.url}
                        alt={name}
                        loading="lazy"
                        width={302}
                        height={302}
                    />
                </div>
                <span className={styles.productsName}>{name}</span>
                <GetPrice finalPrice={finalPrice} regularPrice={regularPrice} />
            </a>
        </div>
    );
}

function GetPrice({ finalPrice, regularPrice }) {
    return (
        <span className={styles.productsPriceWrapper}>
            {regularPrice.value > finalPrice.value ? (
                <span className={styles.productsOldPrice}>
                    <Price {...regularPrice} />
                </span>
            ) : null}
            <Price {...finalPrice} />
        </span>
    );
}
