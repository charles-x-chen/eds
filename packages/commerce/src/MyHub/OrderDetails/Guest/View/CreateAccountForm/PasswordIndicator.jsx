/**
 * @package     BlueAcorn/MyHub
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */

import { t } from 'ttag';
import styles from './style.module.css';

export default function PasswordIndicator({ password }) {
    const getPasswordStrength = (password) => {
        const lengthScore = password.length >= 8 ? 1 : 0;
        const containsUpperCase = /[A-Z]/.test(password);
        const containsLowerCase = /[a-z]/.test(password);
        const containsNumbers = /\d/.test(password);
        const containsSpecialChar = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(password);
        const complexityScore = containsUpperCase + containsLowerCase + containsNumbers + containsSpecialChar;

        return lengthScore + complexityScore;
    };

    const getStrengthColorClass = (strength) => (strength === 3 ? styles.strong : styles.weak);
    const getStrengthLabel = (strength) => (strength === 3 ? t`Strong` : t`Weak`);
    const strength = getPasswordStrength(password);

    return (
        <div className={styles.passwordStrength}>
            <div
                className={`${styles.passwordStrengthBar} ${getStrengthColorClass(strength)}`}
                style={{ width: `${(strength / 3) * 100}%` }}
            >
                {t`Password Strength: `} {getStrengthLabel(strength)}
            </div>
        </div>
    );
}
