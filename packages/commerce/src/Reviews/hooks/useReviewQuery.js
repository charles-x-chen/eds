/**
 * @package     BlueAcorn/Reviews
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useMemo } from 'preact/hooks';
import REVIEWS_QUERY from '../gql/reviews.gql';
import useQuery from '~/hooks/useQuery';

const defaultData = {
    reviews: [],
    stats: {},
    totalCount: 0,
};

export const useReviewQuery = (state) => {
    const variables = useReviewQueryVariables(state);
    const [result] = useQuery({ query: REVIEWS_QUERY, variables, pause: !!state.options.test });

    return useMemo(() => {
        const data = result.data?.getBAReviews || defaultData;
        if (data.stats.rating) {
            defaultData.stats = data.stats;
        }
        return { ...result, data };
    }, [result]);
};

const useReviewQueryVariables = ({
    filters,
    sort,
    currentPage,
    productType,
    searchTerm,
    popularTerms,
    options: { sku, excludeFamily },
}) => {
    return useMemo(() => {
        const filter = {};
        const vars = {
            filter,
            page: currentPage,
        };
        if (sort.field !== 'relevant') {
            vars.sort = {
                [sort.field]: sort.order,
            };
        }
        for (const field in filters) {
            const value = filters[field];
            if (value && value.length) {
                filter[field] = value;
            }
        }
        if (sku) {
            filter.sku = sku;
        }
        if (excludeFamily) {
            filter.excludeFamily = true;
        }
        if (productType) {
            filter.sku = productType;
        }
        if (searchTerm) {
            filter.search = searchTerm;
        }
        if (popularTerms && popularTerms.length) {
            filter.popularTerms = popularTerms;
        }
        return vars;
    }, [filters, sort, currentPage, sku, productType, searchTerm, popularTerms, excludeFamily]);
};
