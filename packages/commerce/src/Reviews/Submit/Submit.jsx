/**
 * @package     BlueAcorn/Reviews
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { useState, useCallback } from 'preact/hooks';
import { BsCheck } from 'react-icons/bs';
import styles from './style.module.css';

export const Submit = () => {
    const [agree, setAgree] = useState(false);
    const updateAgree = useCallback(() => {
        setAgree((agree) => !agree);
    }, []);

    return (
        <div className={styles.submitWrapper}>
            <label className={styles.reviewsFormLabel}>
                <input
                    type="checkbox"
                    className={styles.reviewsFormCheckbox}
                    checked={agree}
                    onChange={updateAgree}
                    name={'agreedtotermsandconditions'}
                />
                <span className={styles.checkboxIcon} />
                {t`I agree to the`}
                <a href="/terms-and-conditions">{t`terms & conditions`} </a>
                {agree ? <BsCheck /> : null}
            </label>
            <span className={styles.submitMsg}>
                {t`You may receive emails regarding this submission. Any emails will include the ability to opt-out of future communications.`}
            </span>
            <button className={styles.submitReviewButton} type="submit" disabled={!agree}>{t`Submit`}</button>
        </div>
    );
};
