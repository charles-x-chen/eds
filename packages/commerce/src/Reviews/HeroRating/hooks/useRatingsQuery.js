/**
 * @package     BlueAcorn/Reviews
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useMemo } from 'preact/hooks';
import RATINGS_QUERY from '../gql/ratings.gql';
import useQuery from '~/hooks/useQuery';

export const useRatingsQuery = (state) => {
    const variables = useRatingsQueryVariables(state);
    const [{ data }] = useQuery({ query: RATINGS_QUERY, variables });

    return data;
};

const useRatingsQueryVariables = (state) => {
    return useMemo(() => {
        const filter = {};
        const vars = {
            filter,
        };
        filter.sku = state;

        return vars;
    }, [state]);
};
