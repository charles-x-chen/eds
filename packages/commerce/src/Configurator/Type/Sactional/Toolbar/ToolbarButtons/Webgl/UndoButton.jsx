/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useCallback, useState } from 'preact/hooks';
import { usePlayerProductId } from '../../../../../Step/Configure/hooks/usePlayerProductId';
import { usePlayerContext } from '../../../../../Context/Player';
import { RESET_CONFIGURATION } from '../../../../../Step/Configure/constants';
import { useStateContext } from '../../../../../Context/State';
import styles from '../../style.module.css';

export const UndoButton = ({ title }) => {
    const productId = usePlayerProductId();
    const {
        state: { api },
    } = usePlayerContext();
    const { dispatch } = useStateContext();
    const [resetingClass, setResetingClass] = useState('');

    const callback = useCallback(
        async (event) => {
            event.preventDefault();
            try {
                setResetingClass(styles.resetting);
                await api.setProduct(productId);
                setResetingClass('');
            } catch (e) {
                setResetingClass('');
                throw new Error('Error occurred!', e);
            }

            dispatch({ type: RESET_CONFIGURATION });
            window.dispatchEvent(new Event('itemAdd'));
        },
        [api, productId, dispatch],
    );

    return (
        <button className={`${styles.playerButton} ${styles.undo} ${resetingClass}`} onClick={callback}>
            <span>{title}</span>
        </button>
    );
};
