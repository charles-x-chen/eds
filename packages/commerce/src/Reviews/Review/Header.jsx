/**
 * @package     BlueAcorn/Reviews
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import styles from './style.module.css';
import StarRating from '~/View/StarRating';

export default function ReviewHeader({ username, verifiedPurchaser, rating, submissionTime }) {
    return (
        <div className={styles.header}>
            <div className={styles.profileIcon} aria-hidden={true}>
                {username ? username.charAt(0) : null}
            </div>
            <div className={styles.headerElement}>
                <span className={styles.username}>
                    {username}
                    {verifiedPurchaser ? <span>{t`Verified Buyer`}</span> : null}
                </span>
                <div className={styles.rating}>
                    <StarRating rating={rating} />
                </div>
            </div>
            <SubmittionDate timestamp={submissionTime} />
        </div>
    );
}

const SubmittionDate = ({ timestamp }) => {
    const date = new Date(timestamp * 1000);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear().toString().substr(-2);
    return <div>{`${month}/${day}/${year}`}</div>;
};
