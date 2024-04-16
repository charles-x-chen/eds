/**
 * @package     BlueAcorn/MyHub
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useMemo } from 'preact/hooks';
import RECOMMENDED_QUERY from '../gql/recommendedProducts.gql';
import useQuery from '~/hooks/useQuery';

export default function useRecommendedProducts(orders, maxQty, fetching) {
    const recommendedSkus = useMemo(() => {
        if (!orders?.length) {
            return [];
        }
        const orderedSkuMap = Object.fromEntries(orders.flatMap((order) => order.items.map((item) => [item.sku, 1])));

        const qtyPerOrder = maxQty / Math.max(orders.length, 1);
        const recommended = {};

        for (const order of orders) {
            const related = order.items.filter((item) => item.product).flatMap((item) => item.product.related);

            let qtyRemaining = qtyPerOrder;
            for (const { sku } of related) {
                if (!recommended[sku] && !orderedSkuMap[sku]) {
                    recommended[sku] = 1;
                    qtyRemaining--;
                    if (qtyRemaining <= 0) {
                        break;
                    }
                }
            }
        }

        return Object.keys(recommended);
    }, [maxQty, orders]);

    const queryArgs = useMemo(
        () => ({
            query: RECOMMENDED_QUERY,
            variables: {
                skus: recommendedSkus,
            },
            pause: !recommendedSkus.length || fetching,
        }),
        [recommendedSkus, fetching],
    );

    return useQuery(queryArgs);
}
