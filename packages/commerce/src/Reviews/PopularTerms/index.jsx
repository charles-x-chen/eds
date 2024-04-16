/**
 * @package     BlueAcorn/Reviews
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useCallback, useMemo, useState } from 'preact/hooks';
import { t } from 'ttag';
import { useStateContext, useDispatchContext } from '../ReviewContext';
import { TOGGLE_TERM } from '../constants';
import styles from './style.module.css';

const terms = [
    'Cover',
    'Looks',
    'Quality',
    'Couch',
    'Fabric',
    'Color',
    'Fit',
    'Sactional',
    'Comfort',
    'Customer',
    'Service',
    'Feel',
    'Furniture',
    'Design',
    'Material',
    'Shipping',
    'Pieces',
    'Ability',
    'Flexibility',
    'Style',
    'Cushions',
    'Size',
    'Assembly',
    'Warranty',
    'Lovesac',
];

const itemCount = 7;

export default function PopularTerms() {
    const dispatch = useDispatchContext();
    const { popularTerms } = useStateContext();

    const [loadCount, setLoadCount] = useState(itemCount);

    const handlePopularTermChange = useCallback(
        (event) => {
            const value = event.target.value;
            dispatch({ type: TOGGLE_TERM, value });
        },
        [dispatch],
    );

    const showMore = useCallback(
        (event) => {
            event.preventDefault();
            setLoadCount(terms.length);
        },
        [setLoadCount],
    );

    return useMemo(() => {
        return (
            <fieldset className={styles.popularTerms} aria-label={t`Popular Terms`}>
                {terms.slice(0, loadCount).map((term) => (
                    <label key={term}>
                        <input
                            type="checkbox"
                            value={term}
                            checked={popularTerms.includes(term)}
                            onChange={handlePopularTermChange}
                        />
                        <span>{term}</span>
                    </label>
                ))}
                {loadCount < terms.length ? (
                    <button key="more" className={styles.showMore} onClick={showMore} aria-label={t`Show More`}>
                        ...
                    </button>
                ) : null}
            </fieldset>
        );
    }, [loadCount, handlePopularTermChange, showMore, popularTerms]);
}
