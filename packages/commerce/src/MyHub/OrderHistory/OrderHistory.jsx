/**
 * @package     BlueAcorn/MyHub
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useState, useMemo } from 'preact/hooks';
import { t } from 'ttag';
import ORDER_HISTORY_QUERY from './gql/orderHistory.gql';
import OrderHistoryView from './View/OrderHistoryView';
import AccountPage from '~/MyHub/AccountPage';

const cmsBlocks = {
    'my-account-quick-links': 'quickLinks',
    'my-account-sactionals-help': 'sactionalsHelp',
    'my-account-stealthtech': 'stealthtechApp',
    'my-account-sacs-help': 'sacsHelp',
    'my-account-stealthtech-help': 'stealthtechHelp',
};

export default function OrderHistory() {
    const [page, setPage] = useState(1);
    const queryArgs = useMemo(
        () => ({
            query: ORDER_HISTORY_QUERY,
            variables: {
                cmsBlocks: Object.keys(cmsBlocks),
                page,
            },
        }),
        [page],
    );
    return (
        <AccountPage type="myorders" title={t`Order History`} queryArgs={queryArgs} dynamic={true}>
            <OrderHistoryLoaded page={page} setPage={setPage} />
        </AccountPage>
    );
}

function OrderHistoryLoaded({ data, page, fetching, setPage }) {
    const blocks = {};
    if (data.cmsBlocks?.items) {
        for (const block of data.cmsBlocks.items) {
            if (block) {
                block.content = block.content.replace(/data-slide-count="4"/g, 'data-slide-count="3.5"');
                blocks[cmsBlocks[block.identifier]] = block;
            }
        }
    }
    return (
        <OrderHistoryView
            orderData={data.customer?.orders?.items}
            blocks={blocks}
            page={page}
            setPage={setPage}
            lastPage={data.customer?.orders?.pageInfo?.total || 1}
            fetching={fetching}
        />
    );
}
