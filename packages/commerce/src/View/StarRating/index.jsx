/**
 * @package     BlueAcorn/View
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import styles from './style.module.css';

const fullStarIcon = (
    <li aria-hidden={true}>
        <BsStarFill />
    </li>
);
const halfStarIcon = (
    <li aria-hidden={true}>
        <BsStarHalf />
    </li>
);
const emptyStarIcon = (
    <li aria-hidden={true}>
        <BsStar />
    </li>
);

export default function StarRating({ rating }) {
    const roundedRating = Math.round(rating * 2) / 2; // Round to nearest 0.5
    const numFullStars = Math.floor(roundedRating);
    const hasHalfStar = roundedRating % 1 !== 0;
    const numEmptyStars = 5 - numFullStars - (hasHalfStar ? 1 : 0);

    return (
        <ul className={styles.starRating} aria-label={t`Rating ${roundedRating} out of 5 stars`}>
            {Array(numFullStars).fill(fullStarIcon)}
            {hasHalfStar && halfStarIcon}
            {Array(numEmptyStars).fill(emptyStarIcon)}
        </ul>
    );
}
