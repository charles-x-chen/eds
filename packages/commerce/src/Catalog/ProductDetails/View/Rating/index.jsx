/**
 * @package     BlueAcorn/Catalog
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { useMemo } from 'preact/hooks';
import RATING_QUERY from './gql/rating.gql';
import useQuery from '~/hooks/useQuery';
import StarRating from '~/View/StarRating';

export default function Rating({ product: { sku } }) {
    const variables = useMemo(
        () => ({
            filter: {
                sku,
            },
        }),
        [sku],
    );

    const [{ data }] = useQuery({
        query: RATING_QUERY,
        variables,
    });
    const stats = data?.getBAReviews?.stats;

    if (stats) {
        const { rating, reviewCount } = stats;

        return (
            <a href="#reviews-block-link">
                <span>{t`See All Reviews`}</span>
                <StarRating rating={rating} />
                <span>{t`(${reviewCount} reviews)`}</span>
            </a>
        );
    }
    return null;
}
