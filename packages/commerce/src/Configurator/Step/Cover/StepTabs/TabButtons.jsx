/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { useMemo, useCallback } from 'preact/hooks';
import { BsFilterLeft, BsPlus } from 'react-icons/bs';
import { useStateContext } from '../../../Context/State';
import { useModalContext } from '../../../View/Modal';
import styles from './style.module.css';

export const TabButtons = () => {
    return (
        <div className={styles.itemsActionsWrapper}>
            <FiltersButton />
            <AddSampleButton />
        </div>
    );
};

const FiltersButton = () => {
    const { setModal } = useModalContext();
    const {
        state: { fabricFilter },
    } = useStateContext();

    const onClick = useCallback(
        (event) => {
            event.preventDefault();
            setModal({
                type: 'filter',
            });
        },
        [setModal],
    );

    const buttonActiveClass = fabricFilter.length > 0 ? 'active' : '';

    return (
        <button
            className={`covers-action__button covers-action__button--filter ${buttonActiveClass}`}
            onClick={onClick}
        >
            <BsFilterLeft />
            {t`Filters`}
        </button>
    );
};

const AddSampleButton = () => {
    const {
        state: { fabricId },
    } = useStateContext();
    const { setModal } = useModalContext();

    const buttonCallback = useCallback(
        (event) => {
            event.preventDefault();
            setModal({
                type: 'sample',
                fabricId,
            });

            return true;
        },
        [fabricId, setModal],
    );

    return useMemo(
        () => (
            <button className="covers-action__button covers-action__button--sample" onClick={buttonCallback}>
                <BsPlus />
                {t`Add Swatches`}
            </button>
        ),
        [buttonCallback],
    );
};
