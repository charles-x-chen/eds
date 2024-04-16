/**
 * @package     BlueAcorn/Reviews
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import ReviewsComponent from './Reviews';

export default {
    title: 'Components/Reviews',
    component: ReviewsComponent,
    argTypes: {
        productFilter: {
            control: { type: 'boolean' },
        },
        excludeFamily: {
            control: { type: 'boolean' },
        },
    },
};

export const Live = {
    args: {
        sku: 'GT4400',
        productFilter: false,
        excludeFamily: false,
    },
};
