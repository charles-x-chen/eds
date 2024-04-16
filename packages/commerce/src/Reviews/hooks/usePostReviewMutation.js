/**
 * @package     BlueAcorn/Reviews
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useState, useCallback } from 'preact/hooks';
import { t } from 'ttag';
import POST_REVIEW_MUTATION from '../gql/postReview.gql';
import useMutation from '~/hooks/useMutation';

const defaultState = {
    loading: false,
    error: null,
    data: null,
};
const defaultError = t`Something went wrong`;

export const usePostReview = () => {
    const [state, setState] = useState(defaultState);
    const [, runMutation] = useMutation(POST_REVIEW_MUTATION);

    const submitReview = useCallback(
        async (variables) => {
            setState({ ...defaultState, loading: true });
            const result = await runMutation(variables);
            const data = result?.data?.submitProgressivePostReview || {};
            const error = data.success ? null : data.message || defaultError;
            if (error || data) {
                setState({ ...defaultState, error, data });
            }
        },
        [runMutation],
    );

    return [state, submitReview];
};
