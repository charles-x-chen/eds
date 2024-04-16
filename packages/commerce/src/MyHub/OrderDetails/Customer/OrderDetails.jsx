/**
 * @package     BlueAcorn/MyHub
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import ORDER_DETAILS_QUERY from './gql/orderDetails.gql';
import OrderDetailsView from './View/OrderDetailsView';
import AccountPage from '~/MyHub/AccountPage';

const cmsBlocks = {
    'my-account-quick-links': 'quickLinks',
    'my-account-sactionals-help': 'sactionalsHelp',
    'my-account-stealthtech': 'stealthtechApp',
    'my-account-sacs-help': 'sacsHelp',
    'my-account-stealthtech-help': 'stealthtechHelp',
};

const cmsBlocksSlider = {
    'my-account-quick-links': false,
    'my-account-sactionals-help': true,
    'my-account-stealthtech': false,
    'my-account-sacs-help': true,
    'my-account-stealthtech-help': true,
};

export default function OrderDetails({ orderNumber }) {
    const graphqlVariables = {
        cmsBlocks: Object.keys(cmsBlocks),
        orderNumber,
    };

    return (
        <AccountPage
            type="myorders"
            queryArgs={{ query: ORDER_DETAILS_QUERY, variables: graphqlVariables }}
            dynamic={true}
        >
            <OrderDetailsLoaded number={orderNumber} />
        </AccountPage>
    );
}

const defaultOrder = {
    id: 'MA==',
    status: '',
    items: [],
    total: {
        discounts: [],
    },
    billingAddress: {},
    shippingAddress: {},
    paymentMethods: [],
    netsuite: { orderId: null },
};

function OrderDetailsLoaded({ data, number, fetching }) {
    const blocks = {};
    if (data.cmsBlocks?.items) {
        for (const block of data.cmsBlocks.items) {
            if (block) {
                block.content = block.content.replace(/data-slide-count="4"/g, 'data-slide-count="3.5"');
                blocks[cmsBlocks[block.identifier]] = block;
                blocks[cmsBlocks[block.identifier]].isSlider = cmsBlocksSlider[block.identifier];
            }
        }
    }
    const orders = [
        data.customer?.orders?.items?.[0] || {
            ...defaultOrder,
            number,
        },
    ];
    return <OrderDetailsView orderData={orders} blocks={blocks} fetching={fetching} />;
}
