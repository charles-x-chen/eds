/**
 * @package     BlueAcorn/Catalog
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useEffect } from 'preact/hooks';
import { affirmInit } from '~/Api/Affirm';

export default function AffirmMessage({ product, config }) {
    useEffect(() => {
        affirmInit(config);
    }, [config]);

    const amount = product.price.final.amount.value;
    const min = Number(config['affirm.min_order_total']) || 50;
    const max = Number(config['affirm.max_order_total']) || Number.MAX_SAFE_INTEGER;

    return (
        <div
            id="als_pdp"
            class="affirm-as-low-as"
            data-page-type="product"
            data-affirm-color="black"
            data-learnmore-show="true"
            data-amount={amount * 100}
            hidden={amount < min || amount > max}
        />
    );
}
