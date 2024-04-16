/**
 * @package     BlueAcorn/Catalog
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useMemo } from 'preact/hooks';
import { t } from 'ttag';
import PRODUCT_QUERY from './gql/product.gql';
import ProductDetailsView from './View';
import useQuery from '~/hooks/useQuery';
import Loading from '~/View/Loading';
import { getEdgeUrl } from '~/Api/Url';

export default function ProductDetails({ urlKey, config }) {
    const variables = useMemo(
        () => ({
            urlKey,
        }),
        [urlKey],
    );

    const [{ data, fetching, error }] = useQuery({
        query: PRODUCT_QUERY,
        variables,
    });

    if (data) {
        const product = data?.products?.items?.[0]?.product;
        if (product) {
            return <ProductDetailsView product={product} config={config} />;
        }
        location.href = getEdgeUrl(`/404.html#${location.pathname}`);
    }

    if (fetching) {
        return <Loading />;
    }

    if (error) {
        return <div>{t`An error occured`}</div>;
    }
}
