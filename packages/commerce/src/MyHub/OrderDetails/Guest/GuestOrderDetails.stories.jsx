/**
 * @package     BlueAcorn/MyHub
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import GuestOrderDetails from './GuestOrderDetails';

export default {
    title: 'My Hub/Guest Order Details',
    component: GuestOrderDetails,
};

export const Live = <GuestOrderDetails orderNumber="SA1151651" email="danrascoll@lovesac.com" />;
Live.args = Live.props;
Live.parameters = {
    design: [
        {
            type: 'figma',
            name: 'Desktop',
            url: 'https://www.figma.com/file/YADYZ7dnLBTrtWKfuyBfao/BA---MYHUB?type=design&node-id=423-7545&mode=design&t=l0EPi1VUm4fx3tNR-0',
        },
        {
            type: 'figma',
            name: 'Mobile',
            url: 'https://www.figma.com/file/YADYZ7dnLBTrtWKfuyBfao/BA---MYHUB?type=design&node-id=423-7545&mode=design&t=l0EPi1VUm4fx3tNR-0',
        },
    ],
};
