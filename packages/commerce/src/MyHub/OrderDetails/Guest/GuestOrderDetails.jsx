/**
 * @package     BlueAcorn/MyHub
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import GuestOrderDetailsView from './View/GuestOrderDetailsView';
import GUEST_ORDER_DETAILS_QUERY from './gql/guestOrderDetails.gql';
import useQuery from '~/hooks/useQuery';
import Loading from '~/View/Loading';

export default function GuestOrderDetails({ orderNumber, email, firstname, lastname }) {
    const graphqlVariables = {
        email,
        orderNumber,
    };

    const [{ data, fetching, error }] = useQuery({ query: GUEST_ORDER_DETAILS_QUERY, variables: graphqlVariables });
    if (fetching) {
        return <Loading />;
    }

    if (data?.getGuestOrder) {
        return <OrderDetailsLoaded data={data} email={email} firstname={firstname} lastname={lastname} />;
    }
    return error?.graphQLErrors?.[0]?.message || t`An error occured`;
}

function OrderDetailsLoaded({ data, email, firstname, lastname }) {
    return (
        <GuestOrderDetailsView
            orderData={data?.getGuestOrder}
            email={email}
            firstname={firstname}
            lastname={lastname}
        />
    );
}
