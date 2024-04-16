/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { useConfiguratorContext } from '../../Context/Configurator';
import { useStateContext } from '../../Context/State';
import styles from './style.module.css';

export const SquattomanHeader = () => {
    const { fabrics } = useConfiguratorContext();
    const {
        state: { fabricId, fabricLeadTime },
    } = useStateContext();
    const fabricOptions = fabrics.filter((fabric) => fabric.code === fabricLeadTime);
    const selectedFabricName =
        fabricOptions[0].groups.flatMap((group) => group.items).find((item) => item.id === parseInt(fabricId, 10))
            ?.name || null;

    return (
        <div className={styles.header}>
            <div className={styles.headerTitle}>{t`Squattoman`}</div>
            <div className={styles.headerSubTitle}>{selectedFabricName}</div>
        </div>
    );
};
