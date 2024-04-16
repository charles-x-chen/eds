/**
 * @package     BlueAcorn/Api
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';

export default async function graphqlClient({
    url: endpointUrl,
    query,
    variables = {},
    preferGetMethod = true,
    fetchOptions = {},
}) {
    const options = {
        ...fetchOptions,
        method: preferGetMethod ? 'GET' : 'POST',
    };

    if (preferGetMethod) {
        const queryParams = new URLSearchParams({
            query,
            variables: JSON.stringify(variables),
        });
        endpointUrl += `?${queryParams}`;
    } else {
        options.headers = options.headers || {};
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify({
            query,
            variables,
        });
    }

    let result;
    try {
        const response = await fetch(endpointUrl, options);
        result = await response.json();
    } catch {
        throw new Error(t`Network error`);
    }

    if (result?.errors) {
        throw new Error(result.errors.map((error) => error.message).join('\n'));
    }

    return result;
}
