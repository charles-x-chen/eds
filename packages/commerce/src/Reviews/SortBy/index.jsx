/**
 * @package     BlueAcorn/Reviews
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useCallback } from 'preact/hooks';
import { BsChevronDown } from 'react-icons/bs';
import { t } from 'ttag';
import { SET_SORT } from '../constants';
import { useStateContext, useDispatchContext } from '../ReviewContext';
import styles from './style.module.css';

const sortOptions = [
    { value: 'submissionTime-DESC', label: 'Submission Time (Newest First)' },
    { value: 'submissionTime-ASC', label: 'Submission Time (Oldest First)' },
    { value: 'rating-DESC', label: 'Rating (High to Low)' },
    { value: 'rating-ASC', label: 'Rating (Low to High)' },
    { value: 'withPhotos-DESC', label: 'Photo reviews' },
];

export default function SortBy() {
    const { sort } = useStateContext();
    const dispatch = useDispatchContext();

    const handleSortChange = useCallback(
        (event) => {
            const [field, order] = event.target.value.split('-');
            dispatch({ type: SET_SORT, value: { field, order } });
        },
        [dispatch],
    );

    return (
        <div className={styles.sortby}>
            <select value={`${sort.field}-${sort.order}`} onChange={handleSortChange} aria-label={t`Sort By`}>
                <option key="0" value="relevant-DESC" disabled={true} hidden={true}>
                    Sort By
                </option>
                {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <span class={styles.icon} aria-hidden={true}>
                <BsChevronDown />
            </span>
        </div>
    );
}
