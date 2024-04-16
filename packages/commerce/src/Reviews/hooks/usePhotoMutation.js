/**
 * @package     BlueAcorn/Reviews
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useState, useCallback } from 'preact/hooks';
import { t } from 'ttag';
import PHOTO_MUTATION from '../gql/photo.gql';
import useMutation from '~/hooks/useMutation';

const defaultState = {
    loading: false,
    error: null,
    data: null,
};
const defaultError = t`Something went wrong`;

export const usePhotoMutaion = () => {
    const [state, setState] = useState(defaultState);
    const [, runMutation] = useMutation(PHOTO_MUTATION);

    const submitPhoto = useCallback(
        async (variables) => {
            setState({ ...defaultState, loading: true });
            const result = await runMutation(variables);
            const data = result?.data?.uploadReviewPhoto || {};
            const error = data.success ? null : data.message || defaultError;
            if (error || data) {
                setState({ ...defaultState, error, data });
            }
        },
        [runMutation],
    );

    return [state, submitPhoto];
};
