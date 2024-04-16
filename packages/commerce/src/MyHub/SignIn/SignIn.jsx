/**
 * @package     BlueAcorn/MyHub
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useCallback, useRef } from 'preact/hooks';
import { t } from 'ttag';
import SIGN_IN from './gql/signIn.gql';
import styles from './style.module.css';
import useMutation from '~/hooks/useMutation';

export default function SignIn() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [state, executeMutation] = useMutation(SIGN_IN);

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            const email = emailRef.current.value;
            const password = passwordRef.current.value;
            executeMutation({ email, password });
        },
        [executeMutation],
    );

    return (
        <div className={styles.root}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label className={styles.label}>
                    <span>{t`Email`}:</span>
                    <input type="email" ref={emailRef} autocomplete="email" required />
                </label>
                <label className={styles.label}>
                    <span>{t`Password`}:</span>
                    <input type="password" ref={passwordRef} autocomplete="current-password" required />
                </label>
                <SignInMessage state={state} />
                <button type="submit" disabled={state.fetching}>{t`Sign In`}</button>
            </form>
        </div>
    );
}

function SignInMessage({ state: { data, fetching, error } }) {
    if (!data || fetching) {
        return null;
    }
    if (data?.passportSignIn?.success) {
        return <div className={styles.success}>{t`Logged in successfully`}</div>;
    }
    if (data?.passportSignIn?.message) {
        return <div className={styles.error}>{data?.passportSignIn?.message}</div>;
    }
    return <div className={styles.error}>{error?.graphQLErrors?.[0]?.message || t`An error occured`}</div>;
}
