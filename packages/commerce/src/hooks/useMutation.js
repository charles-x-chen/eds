/**
 * @package     BlueAcorn/Hooks
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useState, useCallback } from 'preact/hooks';
import graphqlRequest from '~/Api/GraphQL';

const defaultState = { error: null, fetching: false, data: null };

export default function useMutation(query) {
    const [result, setResult] = useState(defaultState);

    const load = useCallback(
        async (variables) => {
            try {
                setResult({ ...defaultState, fetching: true });
                const data = await graphqlRequest({ variables, query, preferGetMethod: false });
                if (data.errors?.length && !data.error) {
                    data.error = data.errors[0];
                }
                setResult({ ...defaultState, ...data });
                return data;
            } catch (error) {
                setResult({ ...defaultState, error });
                return null;
            }
        },
        [query],
    );

    return [result, load];
}
