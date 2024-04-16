/**
 * @package     BlueAcorn/MyHub
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import MyAccountLoader from './MyAccount';
import config, { Mock } from './View/MyAccountView.stories';

export default {
    ...config,
    title: 'My Hub / My Account',
    component: MyAccountLoader,
};

export const Live = {
    ...Mock,
    args: {},
};
