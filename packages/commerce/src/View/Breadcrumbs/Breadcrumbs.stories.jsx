/**
 * @package     BlueAcorn/View
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import Breadcrumbs from '.';

export default {
    title: 'View/Breadcrumbs',
    tags: ['autodocs'],
    component: Breadcrumbs,
    argTypes: {},
};

const items = [
    {
        url: '/sactionals',
        name: 'Sactionals',
    },
    {
        url: '/sactionals/productABC',
        name: 'Product ABC',
    },
];

export const Default = <Breadcrumbs items={items} />;
Default.args = Default.props;
