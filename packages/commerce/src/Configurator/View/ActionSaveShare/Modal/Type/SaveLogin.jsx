/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */

import { t } from 'ttag';
import { useState, useCallback } from 'preact/hooks';
import { BsEnvelope } from 'react-icons/bs';
import { ActionSave } from '../../ActionSave';
import { useModalContext } from '../ModalContext';
import styles from './style.module.css';
import Modal from '~/View/Modal';

export const SaveLogin = () => {
    const { setModal } = useModalContext();
    const closeCallback = useCallback(
        (event) => {
            event.preventDefault();
            setModal(null);
        },
        [setModal],
    );

    return (
        <Modal title={t`Save`} onCloseModal={closeCallback} modalClass={styles.saveModal}>
            <SaveLoginForm />
        </Modal>
    );
};

const SaveLoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const changeUsername = useCallback((event) => {
        setUsername(event.target.value);
    }, []);

    const changePassword = useCallback((event) => {
        setPassword(event.target.value);
    }, []);

    return (
        <div className={styles.modalBody}>
            <div className={styles.createAccount}>
                <span>{t`Create an account or log in to save your configuration.`}</span>
                <a href="/customer/account/create/" className={styles.createAccountLink}>{t`Create an Account`}</a>
            </div>
            <div className={styles.login}>
                <form>
                    <div className={styles.fieldset}>
                        <legend>{t`Log In`}</legend>
                        <label htmlFor="email-address-input required">{t`Email Address`}</label>
                        <div className={styles.field}>
                            <input
                                type="input"
                                className="email-address-input required"
                                name="email-address-input"
                                placeholder={t`Email Address`}
                                value={username}
                                onChange={changeUsername}
                            />
                            <BsEnvelope />
                        </div>
                        <label htmlFor="password-input required">{t`Password`}</label>
                        <div className={`${styles.field} ${styles.password}`}>
                            <input
                                type="password"
                                className="password-input required"
                                name="password-input"
                                placeholder={t`Password`}
                                value={password}
                                onChange={changePassword}
                            />
                        </div>
                    </div>
                </form>
                <ActionSave username={username} password={password} />
                <a href="/customer/account/forgotpassword/" className={styles.forgotPassword}>
                    {t`Forgot Your Password?`}
                </a>
            </div>
        </div>
    );
};
