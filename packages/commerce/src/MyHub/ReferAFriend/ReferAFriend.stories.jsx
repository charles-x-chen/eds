/**
 * @package     BlueAcorn/MyHub
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { Mock } from './View/ReferAFriendView.stories';
import ReferAFriend from '.';

export default {
    title: 'My Hub/Refer A Friend',
    component: ReferAFriend,
};

export const Live = <ReferAFriend />;
Live.args = Live.props;
Live.parameters = Mock.parameters;
