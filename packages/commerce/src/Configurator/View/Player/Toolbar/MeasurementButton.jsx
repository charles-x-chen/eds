/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useCallback } from 'preact/hooks';
import { usePlayerContext } from '../../../Context/Player';
import { TOGGLE_MEASUREMENT } from '../constants';
import styles from '../style.module.css';

export const MeasurementButton = ({ title, isWebGl = false }) => {
    const {
        dispatch,
        state: { isMeasurementEnabled },
    } = usePlayerContext();

    const helperClass = isWebGl ? styles.webglPlayerIcon : null;

    const callback = useCallback(
        (event) => {
            event.preventDefault();
            dispatch({ type: TOGGLE_MEASUREMENT });
        },
        [dispatch],
    );

    return (
        <button
            className={
                !isMeasurementEnabled
                    ? `${styles.playerButton} ${styles.measurement} ${helperClass}`
                    : `${styles.playerButton} ${styles.measurement} ${helperClass} ${styles.active}`
            }
            onClick={callback}
        >
            <span>{title}</span>
        </button>
    );
};
