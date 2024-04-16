/**
 * @package     BlueAcorn/MyHub
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import OrderDetails from './OrderDetails';

export default {
    title: 'My Hub/Order Details',
    component: OrderDetails,
};

export const Live = {
    args: {
        orderNumber: '090003322',
    },
    parameters: {
        design: [
            {
                type: 'figma',
                name: 'Desktop',
                url: 'https://www.figma.com/file/YADYZ7dnLBTrtWKfuyBfao/BA---MYHUB?type=design&node-id=423-7545',
            },
            {
                type: 'figma',
                name: 'Mobile',
                url: 'https://www.figma.com/file/YADYZ7dnLBTrtWKfuyBfao/BA---MYHUB?type=design&node-id=870-61196',
            },
        ],
    },
};
