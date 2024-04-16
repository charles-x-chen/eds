/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { forwardRef } from 'preact/compat';
import { useConfiguratorContext } from '../../Context/Configurator';
import { useStateContext } from '../../Context/State';
import styles from './style.module.css';

export const ThrowPillowCoverHeader = forwardRef((props, ref) => {
    const { pieces, fabrics } = useConfiguratorContext();
    const {
        state: { piece: statePiece, fabricId, fabricLeadTime },
    } = useStateContext();
    const fabricOptions = fabrics.filter((fabric) => fabric.code === fabricLeadTime);
    const selectedFabricName =
        fabricOptions[0].groups.flatMap((group) => group.items).find((item) => item.id === parseInt(fabricId, 10))
            ?.name || null;
    const piece = pieces[statePiece];

    return (
        <div ref={ref} className={styles.header}>
            <div className={styles.headerTitle}>{t`Throw Pillow Covers`}</div>
            <div className={styles.headerSubTitle}>
                {piece.key}:{selectedFabricName}
            </div>
        </div>
    );
});
