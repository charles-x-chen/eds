/**
 * @package     BlueAcorn/Reviews
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useEffect, useState, useCallback } from 'preact/hooks';
import { BsSearch } from 'react-icons/bs';
import { SET_SEARCH_TERM } from '../constants';
import { useDispatchContext } from '../ReviewContext';
import styles from './style.module.css';

export default function Search() {
    const dispatch = useDispatchContext();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const timerId = setTimeout(() => {
            dispatch({ type: SET_SEARCH_TERM, value: searchTerm });
        }, 2000);

        return () => {
            clearTimeout(timerId);
        };
    }, [dispatch, searchTerm]);

    const handleSearchChange = useCallback((event) => {
        setSearchTerm(event.target.value);
    }, []);

    return (
        <div className={styles.search}>
            <div className={styles.icon}>
                <BsSearch />
            </div>
            <input type="text" placeholder="Search Reviews" value={searchTerm} onChange={handleSearchChange} />
        </div>
    );
}
