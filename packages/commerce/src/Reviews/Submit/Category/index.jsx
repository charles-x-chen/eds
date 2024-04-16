/**
 * @package     BlueAcorn/Reviews
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useCallback } from 'preact/hooks';
import { t } from 'ttag';
import { useStateContext } from '../../ReviewContext';
import { useSubmitDispatchContext } from '../Context';
import { SET_VISIBLE } from '../constants';
import styles from './style.module.css';
import Modal from '~/View/Modal';

export const Category = () => {
    const {
        options: { productTypes },
    } = useStateContext();
    const dispatch = useSubmitDispatchContext();
    const openModal = useCallback(
        (event) => {
            event.preventDefault();
            dispatch({
                type: SET_VISIBLE,
                value: 'form',
                sku: event.target.value,
            });
        },
        [dispatch],
    );
    const onCloseModal = useCallback(
        (event) => {
            event.preventDefault();
            dispatch({
                type: SET_VISIBLE,
                value: '',
            });
        },
        [dispatch],
    );

    return (
        <Modal title={t`Select Category`} onCloseModal={onCloseModal}>
            <div className={styles.root}>
                {Object.entries(productTypes).map(([value, label]) => (
                    <button key={value} value={value} onClick={openModal}>
                        {label}
                    </button>
                ))}
            </div>
        </Modal>
    );
};
