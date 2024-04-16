/**
 * @package     BlueAcorn/Api
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import graphqlClient from './client';
import { getCommerceUrl } from '~/Api/Url';

export default async function graphqlRequest({ fetchOptions = {}, ...rest }) {
    const options = {
        url: getCommerceUrl('graphql'),
        fetchOptions: {
            credentials: 'same-origin',
            referrerPolicy: 'no-referrer',
            ...fetchOptions,
        },
        ...rest,
    };

    return graphqlClient(options);
}
