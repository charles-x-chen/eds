/**
 * @package     BlueAcorn/Reviews
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import styles from './style.module.css';
import StarRating from '~/View/StarRating';

export default function Stats({ rating, reviewCount }) {
    return (
        <div className={styles.stats}>
            <div className={styles.avgRating}>
                <span>{(rating ?? 0).toFixed(1)}</span>
            </div>
            <div className={styles.starRating}>
                <StarRating rating={rating} />
            </div>
            <div className={styles.reviewQty}>
                <span>({reviewCount ?? 0} Reviews)</span>
            </div>
        </div>
    );
}

Stats.defaultProps = {
    rating: 0,
    reviewCount: 0,
};
