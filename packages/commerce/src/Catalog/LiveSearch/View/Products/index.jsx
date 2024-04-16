/**
 * @package     BlueAcorn/Catalog
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import style from './style.module.css';
import ProductImage from '~/Catalog/ProductImage';

export default function Products({ items }) {
    if (!items.length) {
        return null;
    }
    return (
        <div>
            <h3>{t`Products`}</h3>
            <ul className={style.list}>
                {items.map(({ productView: product }) => (
                    <Product key={product.sku} product={product} />
                ))}
            </ul>
        </div>
    );
}

function Product({ product: { name, sku, images, url } }) {
    return (
        <li>
            <a href={url}>
                <div>
                    <Image images={images} />
                </div>
                <div>
                    <div>{name}</div>
                    <div>{sku}</div>
                </div>
            </a>
        </li>
    );
}

function Image({ images }) {
    if (images?.length) {
        const { url, label } = images[0];
        return <ProductImage src={url} alt={label} type="thumbnail" eager={true} />;
    }
    return null;
}
