/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { useCallback, useMemo } from 'preact/hooks';
import { SimpleTabs } from '../../../View/Tabs';
import { useStateContext } from '../../../Context/State';
import { useConfiguratorContext } from '../../../Context/Configurator';
import { RESET_FABRIC_FILTER, SET_FABRIC_FILTER, SET_FABRIC_TO_FILTER } from '../constants';
import { useStateInputCallback } from '../../../hooks/useStateInputCallback';
import { Modal, useModalContext } from '../../../View/Modal';
import styles from './style.module.css';

export const Filter = () => {
    return (
        <Modal title={t`Filters`} closeTitle={t`Back to Cover`} modalClass={styles.filterModal}>
            <FilterContent />
        </Modal>
    );
};

const fabricFilters = [
    {
        code: 'color',
        title: 'Color',
    },
    {
        code: 'fabric',
        title: 'Fabric',
    },
    {
        code: 'features',
        title: 'Cover Features',
    },
];

const FilterContent = () => {
    return (
        <div className={styles.detailsWrapper}>
            <div className={styles.filtersWrapper}>
                <SimpleTabs helperClass={styles.filterContent}>
                    {fabricFilters.map(({ title, code }) => (
                        <FabricFilterOptions title={title} key={code} filterCode={code} />
                    ))}
                </SimpleTabs>
            </div>
            <div className={`${styles.actionsWrapper} ${styles.actionsWrapperFilter}`}>
                <ViewResultsButton />
            </div>
        </div>
    );
};

const FilterClearButton = () => {
    const { setModal } = useModalContext();
    const { dispatch } = useStateContext();

    const clearCallback = useCallback(
        (event) => {
            event.preventDefault();
            dispatch({
                type: RESET_FABRIC_FILTER,
            });
            setModal(null);
        },
        [setModal, dispatch],
    );

    return (
        <button className={styles.clear} onClick={clearCallback}>
            <span>{`${t`Clear Filter`}`}</span>
        </button>
    );
};

const ViewResultsButton = () => {
    const { setModal } = useModalContext();
    const { dispatch } = useStateContext();

    const closeCallback = useCallback(
        (event) => {
            event.preventDefault();
            dispatch({
                type: SET_FABRIC_FILTER,
            });
            setModal(null);
        },
        [setModal, dispatch],
    );

    return (
        <div className={styles.actions}>
            <FilterClearButton />
            <button className={styles.primary} onClick={closeCallback}>{`${t`View Results`}`}</button>
        </div>
    );
};

const FabricFilterOptions = ({ filterCode }) => {
    const {
        state: { fabricLeadTimeTab },
    } = useStateContext();
    const { fabricOptions } = useConfiguratorContext();

    const options = useMemo(() => {
        const options = Object.values(fabricOptions[fabricLeadTimeTab])
            .flatMap((fabric) => {
                const name = fabric[filterCode];
                if (Array.isArray(fabric[filterCode])) {
                    return name.map(({ name }) => name);
                }
                return name ? [name] : [];
            })
            .reduce((acc, name) => {
                acc[name] = (acc[name] || 0) + 1;
                return acc;
            }, {});

        return Object.entries(options)
            .map(([name, qty]) => ({
                name,
                qty,
            }))
            .sort((a, b) => a.name.localeCompare(b.name));
    }, [fabricOptions, filterCode, fabricLeadTimeTab]);

    return (
        <div className="more-info-list">
            {options.map((option) => (
                <FabricFilterOption key={option.name} filterCode={filterCode} {...option} />
            ))}
        </div>
    );
};

const FabricFilterOption = ({ name, filterCode, qty }) => {
    return (
        <div className={styles.listItem}>
            <FabricFilterOptionInput name={name} filterCode={filterCode} />
            <FabricFilterOptionLabel name={name} filterCode={filterCode} qty={qty} />
        </div>
    );
};

const FabricFilterOptionInput = ({ name, filterCode }) => {
    const {
        state: { fabricFilter },
    } = useStateContext();
    const callback = useStateInputCallback();

    return useMemo(() => {
        const inputCode = `${filterCode}:${name}`;
        return (
            <input
                type="checkbox"
                className="checkbox more-info-list-input"
                name={SET_FABRIC_TO_FILTER}
                id={`filter-${filterCode}-${name}`}
                checked={fabricFilter.includes(inputCode)}
                value={inputCode}
                onChange={callback}
            />
        );
    }, [filterCode, name, fabricFilter, callback]);
};

const FabricFilterOptionLabel = ({ name, filterCode, qty }) => {
    return (
        <label className={styles.labelItem} htmlFor={`filter-${filterCode}-${name}`}>
            {name}
            <span>{qty}</span>
        </label>
    );
};
