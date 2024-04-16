/**
 * @package     BlueAcorn/Reviews
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useCallback, useState } from 'preact/hooks';
import { BsChevronDown, BsFilterLeft, BsXLg } from 'react-icons/bs';
import { t } from 'ttag';
import { TOGGLE_FILTER_VALUE, RESET_FILTERS, SET_PRODUCT_TYPE } from '../constants';
import { useDispatchContext, useQueryContext, useStateContext } from '../ReviewContext';
import styles from './style.module.css';
import mobileSignal from '~/Api/Mobile';

export default function Filters() {
    return (
        <fieldset aria-label={t`Filters`}>
            <FilterList />
            <ActiveFilters />
        </fieldset>
    );
}

const FilterList = () => {
    const [showFilters, setShowFilters] = useState(false);

    if (mobileSignal.value) {
        return (
            <div className={styles.wrapper}>
                <MoreFiltersButton setShowFilters={setShowFilters} />
                {showFilters ? <FilterListVisible setShowFilters={setShowFilters} showFilters={showFilters} /> : null}
            </div>
        );
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>{t`Filter by:`}</div>
            <FilterListVisible setShowFilters={setShowFilters} showFilters={showFilters} />
        </div>
    );
};

const MoreFiltersButton = ({ setShowFilters }) => {
    const toggleFilters = useCallback(
        (event) => {
            event.preventDefault();
            setShowFilters((showFilters) => !showFilters);
        },
        [setShowFilters],
    );

    return (
        <button onClick={toggleFilters} className={styles.title}>
            <span class={styles.icon}>
                <BsFilterLeft />
            </span>
            {t`Filters`}
        </button>
    );
};

const FilterListVisible = ({ setShowFilters, showFilters }) => {
    const dispatch = useDispatchContext();

    const closeFilters = useCallback(
        (event) => {
            event.preventDefault();
            setShowFilters(false);
        },
        [setShowFilters],
    );

    const handleClearAllFilters = useCallback(() => {
        dispatch({ type: RESET_FILTERS });
        setShowFilters(false);
    }, [dispatch, setShowFilters]);

    const {
        data: {
            stats: { filterAttributes = [], tagDistribution = [] },
        },
    } = useQueryContext();

    const filtersAttributesWithTag = [...(filterAttributes || []), ...(convertIdToLowercase(tagDistribution) || [])];

    const {
        options: { productFilter = false, productTypes },
    } = useStateContext();

    return (
        <div className={`${styles.optionsWrapper} ${showFilters ? styles.active : ''}`}>
            <div className={styles.optionsHeader}>
                <span className={styles.optionsHeaderTitle}>{t`Filter Options`}</span>
                <button onClick={handleClearAllFilters} className={styles.optionsHeaderClose} aria-label={t`Close`}>
                    <BsXLg />
                </button>
            </div>
            <div className={styles.optionsContent} role="list" aria-label={t`Filter Options`}>
                {productFilter ? <ProductFilter productTypes={productTypes} /> : null}
                {filtersAttributesWithTag.map((filter, index) => (
                    <Filter key={`${filter.id}-${index}`} filter={filter} />
                ))}
            </div>
            <div className={styles.optionsFooter}>
                <button onClick={handleClearAllFilters} className={styles.clearAll}>
                    <span>{t`Clear All`}</span>
                </button>
                <button onClick={closeFilters}>
                    <span>{t`View Results`}</span>
                </button>
            </div>
        </div>
    );
};

const Filter = ({ filter: { label, values, id } }) => {
    const field = id.charAt(0).toLowerCase() + id.slice(1);
    const dispatch = useDispatchContext();
    const { filters } = useStateContext();
    const [showFilters, setShowFilters] = useState(false);
    const toggleFilters = useCallback(
        (event) => {
            event.preventDefault();
            setShowFilters((showFilters) => !showFilters);
        },
        [setShowFilters],
    );

    const handleFilterChange = useCallback(
        (event) => {
            const field = event.target.name;
            const value = event.target.value;
            dispatch({ type: TOGGLE_FILTER_VALUE, field, value });
        },
        [dispatch],
    );

    return (
        <div className={styles.filter}>
            <button
                onClick={toggleFilters}
                className={styles.filterTitle}
                aria-haspopup="listbox"
                aria-expanded={showFilters}
            >
                {label}
                <span className={styles.icon}>{showFilters ? <BsXLg /> : <BsChevronDown />}</span>
            </button>
            {showFilters ? (
                <div className={styles.options} role="listbox" aria-label={t`${label} Filter`}>
                    {values.map((option) => (
                        <div key={option} className={styles.option}>
                            <label>
                                <input
                                    type="checkbox"
                                    name={field}
                                    value={option.value}
                                    checked={filters[field]?.includes(option.value)}
                                    onChange={handleFilterChange}
                                />
                                {option?.label ?? option?.value}
                            </label>
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    );
};

const ProductFilter = ({ productTypes }) => {
    const dispatch = useDispatchContext();
    const { productType } = useStateContext();
    const [showFilters, setShowFilters] = useState(false);
    const toggleFilters = useCallback(
        (event) => {
            event.preventDefault();
            setShowFilters((showFilters) => !showFilters);
        },
        [setShowFilters],
    );

    const handleFilterChange = useCallback(
        (event) => {
            const value = event.target.value;
            dispatch({ type: SET_PRODUCT_TYPE, value });
        },
        [dispatch],
    );

    return (
        <div className={styles.filter}>
            <button
                onClick={toggleFilters}
                className={styles.filterTitle}
                aria-haspopup="listbox"
                aria-expanded={showFilters}
            >
                {t`Product`}
                <span className={styles.icon}>{showFilters ? <BsXLg /> : <BsChevronDown />}</span>
            </button>
            {showFilters ? (
                <div className={styles.options} role="listbox" aria-label={t`Product Filter`}>
                    {Object.entries(productTypes).map(([value, label]) => (
                        <div key={value} className={styles.option}>
                            <label>
                                <input
                                    type="radio"
                                    name="SKU"
                                    value={value}
                                    checked={productType === value}
                                    onChange={handleFilterChange}
                                />
                                {label}
                            </label>
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    );
};

const ActiveFilters = () => {
    const dispatch = useDispatchContext();
    const { filters } = useStateContext();

    const {
        data: {
            stats: { filterAttributes = [], tagDistribution = [] },
        },
    } = useQueryContext();

    const filtersAttributesWithTag = [...(filterAttributes || []), ...(convertIdToLowercase(tagDistribution) || [])];

    const {
        productType,
        options: { productTypes },
    } = useStateContext();

    const handleClearAllFilters = useCallback(() => {
        dispatch({ type: RESET_FILTERS });
    }, [dispatch]);

    const handleFilterChange = useCallback(
        (event) => {
            const field = event.currentTarget.name;
            const value = event.currentTarget.value;
            dispatch({ type: TOGGLE_FILTER_VALUE, field, value });
        },
        [dispatch],
    );

    return (
        (Object.values(filters).flat().length > 0 || typeof productType === 'string') && (
            <div className={styles.activeFilters}>
                {productType ? <ActiveProductFilter productType={productType} productTypes={productTypes} /> : null}
                {Object.entries(filters).map(([field, values]) => {
                    const attribute = filtersAttributesWithTag.find(({ id }) => id === field);
                    if (values.length === 0 || !attribute) {
                        return null;
                    }
                    return values.map((value) => (
                        <div className={styles.activeFilter} key={`${field}-${value}`}>
                            {attribute.label}:{' '}
                            {attribute.values.find(({ value: val }) => val === value)?.label || value}
                            <button
                                name={field}
                                value={value}
                                onClick={handleFilterChange}
                                aria-label={t`Clear ${field} ${value}`}
                            >
                                <BsXLg />
                            </button>
                        </div>
                    ));
                })}
                <button className={styles.clearAll} onClick={handleClearAllFilters}>
                    {t`Clear All`}
                </button>
            </div>
        )
    );
};

const ActiveProductFilter = ({ productTypes = {}, productType }) => {
    const dispatch = useDispatchContext();
    const label = productTypes[productType];
    const handleFilterChange = useCallback(
        (event) => {
            event.preventDefault();
            dispatch({ type: SET_PRODUCT_TYPE, value: '' });
        },
        [dispatch],
    );
    return (
        label && (
            <div className={styles.activeFilter} key={`sku-${productType}`}>
                {label}
                <button
                    name={'sku'}
                    value={productType}
                    onClick={handleFilterChange}
                    aria-label={t`Clear Product ${label}`}
                >
                    <BsXLg />
                </button>
            </div>
        )
    );
};

const convertIdToLowercase = (inputArray) =>
    inputArray &&
    inputArray.map((obj) => ({
        ...obj,
        id: obj.id.charAt(0).toLowerCase() + obj.id.slice(1),
    }));
