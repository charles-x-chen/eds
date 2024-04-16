/**
 * @package     BlueAcorn/Hooks
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useState, useEffect, useCallback } from 'preact/hooks';
import graphqlRequest from '~/Api/GraphQL';

const defaultState = { error: null, fetching: false, stale: false, data: null };

const promiseCache = {};

export default function useQuery(args) {
    const [result, setResult] = useState(defaultState);
    const cacheKey = `${args.query}|${JSON.stringify(args.variables)}`;

    const load = useCallback(
        async (useCache = false) => {
            try {
                setResult(({ data }) => ({ ...defaultState, fetching: true, data }));
                if (!promiseCache[cacheKey] || !useCache) {
                    const preferGetMethod = !args.query.includes('customer{') && !args.query.includes('passportCart{');
                    promiseCache[cacheKey] = graphqlRequest({ ...args, preferGetMethod });
                }
                const data = await promiseCache[cacheKey];
                setResult({ ...defaultState, ...data });
                return data;
            } catch (error) {
                setResult({ ...defaultState, error });
                return null;
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [cacheKey],
    );

    useEffect(() => {
        if (!args.pause) {
            load(true);
        }
    }, [load, args.pause]);

    return [result, load];
}
