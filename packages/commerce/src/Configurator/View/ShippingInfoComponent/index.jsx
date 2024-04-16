/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useMemo } from 'preact/hooks';
import { useStateContext } from '../../Context/State';
import { useConfiguratorContext } from '../../Context/Configurator';
import { getLeadTimeText } from '../../hooks/getLeadTimeText';
import { useTotalsContext } from '../../Context/Totals';
import styles from './style.module.css';

export default function ShippingInfoComponent() {
    const index = useConfiguratorContext();
    const { state } = useStateContext();
    const {
        last: { objects = [] },
    } = useTotalsContext();

    const [leadTime, shippingDesc] = useMemo(() => {
        const { fabricLeadTime } = state;
        const leadTime = getLeadTimeText(objects);
        const shippingDesc = index.fabrics.find((type) => type.code === fabricLeadTime)?.shipping;
        return [leadTime, shippingDesc];
    }, [index, state, objects]);

    return leadTime ? <ShippingInfo leadTime={leadTime} shippingDesc={shippingDesc} /> : null;
}

function ShippingInfo({ leadTime, shippingDesc }) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.shippingInfo}>
                <span className={styles.title}>{leadTime}</span>
                <span className={styles.description}>{shippingDesc}</span>
            </div>
        </div>
    );
}
