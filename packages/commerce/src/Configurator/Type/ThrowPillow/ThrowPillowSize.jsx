/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { useConfiguratorContext } from '../../Context/Configurator';
import { useStateInputCallback } from '../../hooks/useStateInputCallback';
import { useStateContext } from '../../Context/State';
import { SET_PIECE } from '../../Step/Piece/constants';
import styles from './style.module.css';

export const ThrowPillowSize = () => {
    const { pieces } = useConfiguratorContext();
    const {
        state: { piece },
    } = useStateContext();

    const handleChange = useStateInputCallback();

    return (
        <div className={styles.sizeWrapper}>
            <span className={styles.sizeLabel}>{t`Size`}</span>
            <select
                className={styles.sizeSelect}
                id="throwPillow-size"
                onChange={handleChange}
                name={SET_PIECE}
                value={piece}
            >
                {Object.entries(pieces).map(([code, piece]) => (
                    <option value={code} data-option-name={piece.name} key={code}>
                        {piece.name}
                    </option>
                ))}
            </select>
        </div>
    );
};
