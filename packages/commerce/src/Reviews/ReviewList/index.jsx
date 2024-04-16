/**
 * @package     BlueAcorn/Reviews
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import SortBy from '../SortBy';
import Review from '../Review';
import styles from './style.module.css';

export default function ReviewList({ reviews, totalCount }) {
    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <div className={styles.amount}>{t`${totalCount} Reviews`}</div>
                <SortBy />
            </div>
            {reviews.map((review) => (
                <Review key={review.id} {...review} />
            ))}
        </div>
    );
}

ReviewList.defaultProps = {
    totalCount: 0,
    reviews: [],
};
