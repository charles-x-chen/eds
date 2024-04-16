/**
 * @package     BlueAcorn/Reviews
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { useCallback } from 'preact/hooks';
import { BsHandThumbsDownFill, BsHandThumbsUpFill } from 'react-icons/bs';
import { SET_REVIEW_FEEDBACK } from '../../constants';
import { useDispatchContext } from '../../ReviewContext';
import { useFeedbackMutation } from '../../hooks/useFeedbackMutation';
import styles from './style.module.css';

export default function ReviewFeedback({ id, feedback: { positive = 0, negative = 0 } }) {
    const [state, submitFeedback] = useFeedbackMutation();
    const dispatch = useDispatchContext();

    const buttonCallback = useCallback(
        (event) => {
            event.preventDefault();
            const vote = event.currentTarget.name === 'yes';
            dispatch({ type: SET_REVIEW_FEEDBACK, value: vote, id });
            submitFeedback({
                id,
                vote,
            });
        },
        [id, submitFeedback, dispatch],
    );

    return (
        <div className={styles.feedback}>
            <span>{t`Was this review helpful?`}</span>
            <ReviewFeedbackState
                state={state}
                buttonCallback={buttonCallback}
                positive={positive}
                negative={negative}
            />
        </div>
    );
}

function ReviewFeedbackState({ state: { loading, error, data }, buttonCallback, positive, negative }) {
    if (loading) {
        return <div>{t`Loading ...`}</div>;
    }
    if (error) {
        return <div>{error}</div>;
    }
    if (data?.success) {
        return <div>{t`Thank you for your feedback`}</div>;
    }
    return (
        <div>
            <button name="yes" onClick={buttonCallback} aria-label={t`Rate as positive, ${positive}`}>
                <span>({positive})</span>
                <BsHandThumbsUpFill />
            </button>
            <button name="no" onClick={buttonCallback} aria-label={t`Rate as negative, ${negative}`}>
                <span>({negative})</span>
                <BsHandThumbsDownFill />
            </button>
        </div>
    );
}
