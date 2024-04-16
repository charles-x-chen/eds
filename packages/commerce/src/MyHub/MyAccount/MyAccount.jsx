/**
 * @package     BlueAcorn/MyHub
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import MY_ACCOUNT_QUERY from './gql/myAccount.gql';
import MyAccountView from './View/MyAccountView';
import AccountPage from '~/MyHub/AccountPage';

const cmsBlocks = {
    'my-account-quick-links': 'quickLinks',
    'my-account-sactionals-help': 'sactionalsHelp',
    'my-account-stealthtech': 'stealthtechApp',
    'my-account-sacs-help': 'sacsHelp',
    'my-account-stealthtech-help': 'stealthtechHelp',
};

const graphqlVariables = {
    cmsBlocks: Object.keys(cmsBlocks),
};

export default function MyAccount() {
    return (
        <AccountPage
            type="dashboard"
            queryArgs={{ query: MY_ACCOUNT_QUERY, variables: graphqlVariables }}
            dynamic={true}
        >
            <MyAccountLoaded />
        </AccountPage>
    );
}

function MyAccountLoaded({ data, fetching }) {
    const blocks = {};
    if (data.cmsBlocks?.items) {
        for (const block of data.cmsBlocks.items) {
            if (block) {
                blocks[cmsBlocks[block.identifier]] = block;
            }
        }
    }
    return (
        <MyAccountView
            customer={data.customer}
            blocks={blocks}
            paymentTokens={data.customerPaymentTokens?.items}
            fetching={fetching}
        />
    );
}
