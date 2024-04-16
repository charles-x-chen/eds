/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */

import { useCallback } from 'preact/hooks';
import { useCameraView } from '../../../../../hooks/useCameraView';
import { usePlayerContext } from '../../../../../Context/Player';
import styles from '../../style.module.css';

export const RotateButton = ({ title, isWebGl = false }) => {
    const setCameraView = useCameraView();
    const {
        state: { isOrthographic },
    } = usePlayerContext();

    const helperClass = isWebGl ? styles.webglPlayerIcon : null;

    const buttonCallbackHandle = useCallback(
        async (event) => {
            event.preventDefault();
            await setCameraView(!isOrthographic);
        },
        [isOrthographic, setCameraView],
    );

    return (
        <button
            className={
                isOrthographic
                    ? `${styles.playerButton} ${styles.rotate} ${helperClass}`
                    : `${styles.playerButton} ${helperClass} ${styles.rotateActive}`
            }
            onClick={buttonCallbackHandle}
        >
            <span>{title}</span>
        </button>
    );
};
