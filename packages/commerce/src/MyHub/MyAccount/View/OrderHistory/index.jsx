/**
 * @package     BlueAcorn/MyHub
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import styles from './style.module.css';
import Price from '~/View/Price';
import { getCommerceUrl } from '~/Api/Url';
import Loading from '~/View/Loading';

export default function OrderHistory({ orders, fetching }) {
    return (
        <div className={styles.orderHistoryWrapper} role="table">
            <div className={styles.orderHistoryTitleWrapper}>
                <div className={styles.orderHistoryTitle}>
                    <img
                        src={getCommerceUrl('media/wysiwyg/myaccount/icons/order-history.png')}
                        alt={t`Order History`}
                    />
                    <h2>{t`Order History`}</h2>
                </div>
                <a
                    className={styles.orderHistoryTitleLink}
                    href={getCommerceUrl('sales/order/history/')}
                    aria-label={t`View all orders`}
                >
                    {t`View All`}
                </a>
            </div>
            {fetching && !orders.length ? (
                <OrderLoading />
            ) : (
                orders.map((order) => <Order key={order.id} order={order} />)
            )}
        </div>
    );
}

function OrderLoading() {
    return (
        <div className={styles.orderHistoryItems}>
            <Loading />
        </div>
    );
}

function Order({ order }) {
    let date = order.orderDate;

    if (!order.orderDate.endsWith('Z')) {
        // Convert to an ISO 8601 format and append 'Z' to indicate UTC
        date = `${order.orderDate.replace(' ', 'T')}Z`;
    }

    return (
        <div className={styles.orderHistoryItems} role="row">
            <div className={styles.orderHistoryItem} role="cell">
                <span className={styles.orderHistoryItemTitle}>{t`Order Number`}</span>
                <span className={styles.orderHistoryItemDesc}>
                    {order.number} {`${order.netsuite?.orderId ? ` / ${order.netsuite?.orderId}` : ''}`}
                </span>
            </div>
            <div className={styles.orderHistoryItem} role="cell">
                <span className={styles.orderHistoryItemTitle}>{t`Date`} </span>
                <span className={styles.orderHistoryItemDesc}>{new Date(date).toLocaleDateString()}</span>
            </div>
            <div className={styles.orderHistoryItem} role="cell">
                <span className={styles.orderHistoryItemTitle}>{t`Total`}</span>
                <span className={styles.orderHistoryItemDesc}>
                    <Price {...order.total.grandTotal} />
                </span>
            </div>
            <div className={styles.orderHistoryItem} role="cell">
                <span className={styles.orderHistoryItemTitle}>{t`Status`}</span>
                <span className={styles.orderHistoryItemDesc}> {order.status}</span>
            </div>
            <div className={styles.orderHistoryItem} role="cell">
                <OrderDetailsButton order={order} />
            </div>
        </div>
    );
}

function OrderDetailsButton({ order: { id, number } }) {
    const url = getCommerceUrl(`sales/order/view/order_id/${atob(id)}`);
    return (
        <a className={styles.orderHistoryItemLink} href={url} aria-label={t`View order ${number}`}>
            {t`view details`}
        </a>
    );
}
