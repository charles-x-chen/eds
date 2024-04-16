/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */

import { useConfiguratorContext } from '../../Context/Configurator';
import { Price } from '../Price';
import styles from './style.module.css';
import mobileSignal from '~/Api/Mobile';

export const PriceContainer = ({
    total,
    totalWithoutDiscount,
    classes = styles.priceContainer,
    showSubtotalPricingText = false,
    helperClass = null,
}) => {
    const showDiscount = totalWithoutDiscount > total;
    const isMobile = mobileSignal.value;
    const {
        messages: { subtotalPricingText = '' },
    } = useConfiguratorContext();

    return (
        <div className={`${classes} ${helperClass}`}>
            <span className={styles.value}>
                <s>{showDiscount ? <Price value={totalWithoutDiscount} /> : null}</s>
                <Price value={total} />{' '}
            </span>
            {showSubtotalPricingText && !isMobile ? <span className={styles.text}>{subtotalPricingText}</span> : null}
        </div>
    );
};
