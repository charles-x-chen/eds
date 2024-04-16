/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useCallback } from 'preact/hooks';
import { useModalContext } from '../../../../../View/Modal';
import styles from '../../style.module.css';

export const HelpButton = ({ title }) => {
    const { modal, setModal } = useModalContext();
    const callback = useCallback(
        (event) => {
            event.preventDefault();
            setModal({
                type: 'introductionalModal',
            });
        },
        [setModal],
    );

    return (
        <button
            className={`${styles.playerButton} ${styles.help} ${modal?.type === 'introductionalModal' ? styles.active : ''}`}
            onClick={callback}
        >
            <span>{title}</span>
        </button>
    );
};
