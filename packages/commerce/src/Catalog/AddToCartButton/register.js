/**
 * @package     BlueAcorn/AddToCart
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */

export default {
    component: () => import('./AddToCart'),
    tag: 'c-add-to-cart',
    props: ['sku', 'qty', 'btnLabel', 'redirect'],
    options: null,
};
