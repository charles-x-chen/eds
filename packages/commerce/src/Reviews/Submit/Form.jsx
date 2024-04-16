/**
 * @package     BlueAcorn/Reviews
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useEffect, useMemo, useCallback, useState } from 'preact/hooks';
import { t } from 'ttag';
import { usePostReview } from '../hooks/usePostReviewMutation';
import { Submit } from './Submit';
import { useSubmitDataContext, useSubmitDispatchContext, useSubmitStateContext } from './Context';
import { Field } from './Field';
import { SET_VISIBLE } from './constants';
import styles from './style.module.css';
import Loading from '~/View/Loading';
import Modal from '~/View/Modal';

export const Form = () => {
    const { sku, excludeFamily } = useSubmitStateContext();
    const { loading, data, initiate } = useSubmitDataContext();
    const dispatch = useSubmitDispatchContext();
    const onCloseModal = useCallback(
        (event) => {
            event.preventDefault();
            dispatch({
                type: SET_VISIBLE,
                value: '',
            });
        },
        [dispatch],
    );

    useEffect(() => {
        if (sku) {
            initiate(sku, excludeFamily);
        }
    }, [sku, excludeFamily, initiate]);

    if (loading) {
        return (
            <Modal title={t`Create Review`} onCloseModal={onCloseModal}>
                <Loading />
            </Modal>
        );
    }

    if (data) {
        return (
            <div className={styles.modalWrapper}>
                <Modal
                    title={`Create Review: ${data.categoryName}`}
                    onCloseModal={onCloseModal}
                    variant={'submitReview'}
                >
                    <LoadedForm data={data} sku={sku} />
                </Modal>
            </div>
        );
    }

    return null;
};

const LoadedForm = ({ data: { fields, submissionToken, userId, productImage, categoryName }, sku }) => {
    const [state, submitReview] = usePostReview();
    const [message, setMessage] = useState(null);
    useEffect(() => {
        if (state.data?.submissionId) {
            setMessage(t`Thank you for your review! Your feedback is valuable to us.`);
        } else if (state.error) {
            setMessage(t`Something went wrong. Please try again later.`);
        }
    }, [state]);

    const handleSubmit = useCallback(
        async (event) => {
            event.preventDefault();
            const formData = new FormData(event.target);
            formData.append('hostedauthentication_callbackurl', window.location.href);

            const submissionFields = [...formData.entries()]
                .filter(([name]) => name !== 'photo-upload')
                .map(([name, value]) => ({
                    name,
                    value,
                }));
            await submitReview({ sku, userId, submissionSessionToken: submissionToken, submissionFields });
        },
        [sku, submissionToken, submitReview, userId],
    );

    return (
        <div className={styles.formWrapper}>
            {!message ? (
                <form onSubmit={handleSubmit} className={styles.form}>
                    <img src={productImage} alt={`Create Review: ${categoryName}`} />
                    <FormGroups fields={fields} />
                    <Submit />
                </form>
            ) : (
                <Message message={message} />
            )}
        </div>
    );
};

const FormGroups = ({ fields }) => {
    const grouppedFields = useMemo(() => {
        const groups = {};
        for (const field of fields) {
            groups[field.group] = groups[field.group] || [];
            groups[field.group].push(field);
        }
        return groups;
    }, [fields]);
    return Object.entries(grouppedFields).map(([code, group]) => <FormGroup key={code} code={code} fields={group} />);
};

const FormGroup = ({ code, fields }) => {
    return (
        <div className={`${styles.group} group-${code}`} data-code={`group-${code}`}>
            <span className={`group-${code} ${styles.groupTitle}`}>{code}</span>
            {fields.map((field) => (
                <Field key={field.id} field={field} />
            ))}
        </div>
    );
};

const Message = ({ message }) => {
    return <div className="review-messages">{message}</div>;
};
