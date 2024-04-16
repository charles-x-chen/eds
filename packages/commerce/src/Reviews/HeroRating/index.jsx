/**
 * @package     BlueAcorn/Reviews
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */

import { t } from 'ttag';
import { useRatingsQuery } from './hooks/useRatingsQuery';
import styles from './style.module.css';
import StarRating from '~/View/StarRating';

export default function HeroRating({ sku }) {
    const values = useRatingsQuery(sku);
    const reviewRating = values ? values.getBAReviews.stats.rating : 3.5;

    return (
        <a href={'#reviews-block-link'} className={styles.starRatingWrapper}>
            <StarRating rating={reviewRating} />
            {values ? <span>{t`${values ? values.getBAReviews.stats.reviewCount : '0'} reviews`}</span> : ''}
        </a>
    );
}
