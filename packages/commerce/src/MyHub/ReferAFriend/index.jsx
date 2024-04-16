/**
 * @package     BlueAcorn/MyHub
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import REFER_A_FRIEND_QUERY from './gql/referAFriend.gql';
import ReferAFriendView from './View/ReferAFriendView';
import AccountPage from '~/MyHub/AccountPage';

export default function ReferAFriend() {
    return (
        <AccountPage type="refer" title={t`My Referrals`} queryArgs={{ query: REFER_A_FRIEND_QUERY }}>
            <ReferAFriendLoaded />
        </AccountPage>
    );
}

function ReferAFriendLoaded({ data }) {
    return <ReferAFriendView customer={data.customer} />;
}
