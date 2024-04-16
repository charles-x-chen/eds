/**
 * @package     BlueAcorn/Catalog
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useMemo } from 'preact/hooks';
import PRODUCTS_QUERY from './gql/products.gql';
import styles from './style.module.css';
import ProductPrice from '~/Catalog/ProductPrice';
import ProductImage from '~/Catalog/ProductImage';
import { getProductUrl } from '~/Api/Url';
import useQuery from '~/hooks/useQuery';

export default function Products({ skus }) {
    const args = useMemo(
        () => ({
            query: PRODUCTS_QUERY,
            variables: {
                skus: skus
                    .split(',')
                    .map((sku) => sku.trim())
                    .filter(Boolean),
            },
        }),
        [],
    );
    const [{ data }] = useQuery(args);

    if (data?.products?.length) {
        return (
            <div className={styles.grid}>
                {data.products.map((product) => (
                    <Product key={product.sku} product={product} />
                ))}
            </div>
        );
    }

    return null;
}

function Product({ product }) {
    const { name, images } = product;
    return (
        <div className={styles.item}>
            <a href={getProductUrl(product)} className={styles.image}>
                <Image images={images} />
                <span>{name}</span>
            </a>
            <ProductPrice product={product} />
        </div>
    );
}

function Image({ images }) {
    if (images?.length) {
        const { url, label } = images[0];
        return <ProductImage src={url} alt={label} type="small" eager={false} />;
    }
    return null;
}
