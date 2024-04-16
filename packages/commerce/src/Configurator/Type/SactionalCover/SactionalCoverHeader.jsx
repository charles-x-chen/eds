/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { forwardRef } from 'preact/compat';
import { useTotalsContext } from '../../Context/Totals';
import { PriceContainer } from '../../View/PriceContainer';
import { useConfiguratorContext } from '../../Context/Configurator';
import { useStateContext } from '../../Context/State';
import { FinancingText } from '../../View/FinancingText';
import styles from './style.module.css';

export const SactionalCoverHeader = forwardRef((props, ref) => {
    const { pieces, fabrics } = useConfiguratorContext();
    const {
        state: { piece: statePiece, fabricId, fabricLeadTime },
    } = useStateContext();
    const piece = pieces[statePiece];
    const fabricOptions = fabrics.filter((fabric) => fabric.code === fabricLeadTime);
    const selectedFabricName =
        fabricOptions[0].groups.flatMap((group) => group.items).find((item) => item.id === parseInt(fabricId, 10))
            ?.name || null;

    const { total, totalWithoutDiscount } = useTotalsContext();

    return (
        <div ref={ref} className={styles.header}>
            <div className={styles.headerTitle}>{t`Sactionals Covers`}</div>
            <div className={styles.headerSubTitle}>
                <span>{piece.name}</span>
                <span>: {selectedFabricName}</span>
            </div>
            <PriceContainer
                total={total}
                totalWithoutDiscount={totalWithoutDiscount}
                helperClass={styles.headerPrice}
            />
            <FinancingText />
        </div>
    );
});
