/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { products } from '../data/products';

export const init = (configuratorContext, stateContext, totalsContext) => {
    return {
        ecommerce: {
            currencyCode: 'USD',
            detail: {
                actionField: { list: 'Configurator' },
                products: products(configuratorContext, stateContext, totalsContext),
            },
        },
    };
};
