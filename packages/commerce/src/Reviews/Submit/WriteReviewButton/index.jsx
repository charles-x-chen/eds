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

export default function WriteReviewButton() {
    const {
        options: { productTypes = null, sku = null, excludeFamily = false },
    } = useStateContext();
    const dispatch = useSubmitDispatchContext();
    const openModal = useCallback(
        (event) => {
            event.preventDefault();
            if (Object.values(productTypes).length && (!sku || sku === 'all')) {
                dispatch({
                    type: SET_VISIBLE,
                    value: 'category',
                });
            } else {
                dispatch({
                    type: SET_VISIBLE,
                    value: 'form',
                    sku,
                    excludeFamily,
                });
            }
        },
        [dispatch, productTypes, sku, excludeFamily],
    );

    return (
        <button className={styles.writeReviewButton} onClick={openModal}>
            {t`Write a review`}
        </button>
    );
}
