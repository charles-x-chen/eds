/**
 * @package     BlueAcorn/Reviews
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useState, useCallback } from 'preact/hooks';
import { t } from 'ttag';
import MUTATION from '../gql/initiateSubmission.gql';
import useMutation from '~/hooks/useMutation';

const defaultState = {
    loading: false,
    error: null,
    data: null,
};
const defaultErrors = [
    {
        code: 'REQUEST_ERROR',
        message: t`Something went wrong`,
        field: null,
    },
];

export const useInitiateSubmissionMutation = () => {
    const [state, setState] = useState(defaultState);
    const [, runMutation] = useMutation(MUTATION);

    const initiate = useCallback(
        async (sku, excludeFamily) => {
            setState({ ...defaultState, loading: true });
            const result = await runMutation({ sku, excludeFamily });
            const data = result?.data?.initiatePostReview || {};
            const errors = data.errors || defaultErrors;
            setState({ ...defaultState, errors, data });
        },
        [runMutation],
    );

    return [state, initiate];
};
