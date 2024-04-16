/**
 * @package     BlueAcorn/Reviews
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */

export default {
    component: () => import('./MiniSwatchesModal'),
    tag: 'c-mini-swatch-modal',
    props: ['sku', 'dataproductid'],
    options: null,
};
