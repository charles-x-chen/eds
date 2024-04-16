/**
 * @package     BlueAcorn/Reviews
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useState, useCallback } from 'preact/hooks';
import { t } from 'ttag';
import FEEDBACK_MUTATION from '../gql/feedback.gql';
import useMutation from '~/hooks/useMutation';

const defaultState = {
    loading: false,
    error: null,
    data: null,
};
const defaultError = t`Something went wrong`;

export const useFeedbackMutation = () => {
    const [state, setState] = useState(defaultState);
    const [, runMutation] = useMutation(FEEDBACK_MUTATION);

    const submitFeedback = useCallback(
        async (variables) => {
            setState({ ...defaultState, loading: true });
            const result = await runMutation(variables);
            const data = result?.data?.postHelpfulnessFeedback || {};
            const error = data.success ? null : data.message || defaultError;
            setState({ ...defaultState, error, data });
        },
        [runMutation],
    );

    return [state, submitFeedback];
};
