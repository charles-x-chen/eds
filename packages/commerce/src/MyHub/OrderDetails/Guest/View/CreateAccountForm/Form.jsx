/**
 * @package     BlueAcorn/MyHub
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */

import { useState } from 'preact/hooks';
import { t } from 'ttag';
import { BsCheck, BsXCircleFill } from 'react-icons/bs';
import CREATE_ACCOUNT from '../../gql/createAccount.gql';
import styles from './style.module.css';
import PasswordIndicator from './PasswordIndicator';
import useMutation from '~/hooks/useMutation';

export default function Form({ setMessage, email, setError, firstname, lastname }) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [{}, submitCreateAccount] = useMutation(CREATE_ACCOUNT);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');

        const input = {
            firstname,
            lastname,
            email,
            password,
        };

        try {
            const { data } = await submitCreateAccount({ input });
            if (data) {
                setMessage(t`Account created successfully`);
            }
        } catch (error) {
            setError(true);
            setMessage(t`Error creating account. Please try again.`);
        }
    };

    return (
        <div className={styles.formWrapper}>
            <h3> {t`Create an Account for Easy Order Tracking`}</h3>
            <p>{t`Other benefits include faster checkout, multiple addresses, and more.`}</p>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend className={styles.legend}>
                        <span>{t`Sign-in Information`}</span>
                    </legend>
                    <div className={styles.field}>
                        <label>{t`Password:`}</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autocomplete="new-password"
                            required
                        />
                        <PasswordIndicator password={password} />
                    </div>
                    <div className={styles.field}>
                        <label>{t`Confirm Password:`}</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            autocomplete="new-password"
                            required
                        />
                        {password !== confirmPassword && (
                            <div className={styles.passwordError}>
                                <BsXCircleFill />
                                <span>{t`Password and Confirm Password do not match`}</span>
                            </div>
                        )}
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="showPassword" className={styles.showPasswordLabel}>
                            <input
                                type="checkbox"
                                className={styles.showPasswordCheckbox}
                                id="showPassword"
                                checked={showPassword}
                                onChange={() => setShowPassword(!showPassword)}
                            />
                            <span className={styles.checkboxIcon} />
                            {showPassword ? <BsCheck /> : null}
                            {t`Show Password`}
                        </label>
                    </div>
                </fieldset>
                <div>
                    <span className={styles.requiredLabel}>{t`Required Fields`}</span>
                    <button
                        className={styles.action}
                        type="submit"
                        disabled={password !== confirmPassword}
                    >{t`Create an Account`}</button>
                </div>
            </form>
            <p
                className={styles.modalFooter}
            >{t`Tell your friends about Total Comfort and you’ll both get $100 off.`}</p>
            <button
                className={styles.modalFooterLink}
                onClick={() => document.getElementById('extole_zone_global_footer')?.click()}
            >{t`Refer a Friend`}</button>
        </div>
    );
}
