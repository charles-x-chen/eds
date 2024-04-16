/**
 * @package     BlueAcorn/View
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useMemo } from 'preact/hooks';
import QUERY from './gql/products.gql';
import useQuery from '~/hooks/useQuery';
import Loading from '~/View/Loading';
import Gallery from '~/View/Gallery';
import ProductImage from '~/Catalog/ProductImage';
import { getProductUrl } from '~/Api/Url';
import ProductPrice from '~/Catalog/ProductPrice';

const responsive = {
    0: { items: 1 },
    1024: { items: 4 },
};

export default function ProductsWidget(props) {
    const variables = useMemo(() => {
        const { conditionOption, conditionOptionValue, productsCount } = props;

        if (conditionOption !== 'sku') {
            return null;
        }

        const vars = {};

        if (productsCount) {
            vars.pageSize = Number(productsCount);
        }

        vars.phrase = '';
        vars.filter = [
            {
                attribute: 'sku',
                in: conditionOptionValue.toString().split(','),
            },
        ];
        return vars;
    }, [props]);

    const [{ data, fetching }] = useQuery({
        query: QUERY,
        variables,
        pause: variables === null,
    });

    const products = useMemo(() => {
        return data ? data.products.items.map((item) => item.product) : [];
    }, [data]);

    if (fetching) {
        return <Loading />;
    }

    if (products.length) {
        return (
            <Gallery variant="classic" responsive={responsive}>
                {products.map((product) => (
                    <Product key={product.sku} product={product} />
                ))}
            </Gallery>
        );
    }

    return null;
}

function Product({ product }) {
    return (
        <a href={getProductUrl(product)}>
            <ProductImage type="small" src={product.images?.[0]?.url} />
            <div>{product.name}</div>
            <div>
                <ProductPrice product={product} />
            </div>
        </a>
    );
}
