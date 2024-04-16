/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useCallback } from 'preact/hooks';
import { useModalContext } from '../../../../../View/Modal';
import styles from '../../style.module.css';

export const VrayButton = ({ title }) => {
    const { modal, setModal } = useModalContext();
    const callback = useCallback(
        (event) => {
            event.preventDefault();
            setModal({
                type: 'vrayImageModal',
            });
        },
        [setModal],
    );

    return (
        <button
            className={`${styles.playerButton} ${styles.vray} ${modal?.type === 'vrayImageModal' ? styles.active : ''}`}
            onClick={callback}
        >
            <span>{title}</span>
        </button>
    );
};
