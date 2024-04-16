/**
 * @package     BlueAcorn/MyHub
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { BsPrinter } from 'react-icons/bs';
import OrderProgressBar from '../ProgressBar';
import styles from './style.module.css';
import mobileSignal from '~/Api/Mobile';

export default function OrderDetailsHeader({
    orderData: {
        number,
        orderDate,
        status,
        narvarTrackingUrl,
        netsuite: { orderId = null },
    },
    additionalInfo = null,
    printOrderUrl,
    variant = null,
}) {
    const isCanceled = status === 'Canceled';
    const isMobile = mobileSignal.value;
    const variantClass = variant ? styles.half : null;
    return (
        <>
            <div className={`${variantClass}`}>
                <div className={styles.orderHistoryHeaderWrapper}>
                    <h1 className={styles.orderHistoryTitle}>
                        {t`Order Details`}
                        {isCanceled ? <span className={styles.orderHistoryStatus}>{status}</span> : null}
                    </h1>
                    <div className={styles.orderDetails}>
                        <ul className={styles.orderDetailsList}>
                            {orderDate ? (
                                <li className={styles.orderDetailsListItem}>
                                    <OrderDate date={orderDate} />
                                </li>
                            ) : null}
                            <li className={styles.orderDetailsListItem}>
                                <span className={styles.orderDetailsListItemLabel}>{t`Order Number: `}</span>
                                <span className={styles.orderNumber}>
                                    {number} {`${orderId && orderId !== number ? ` / ${orderId}` : ''}`}
                                </span>
                            </li>
                            <li className={styles.orderDetailsListItem}>
                                <a href={printOrderUrl}>
                                    <BsPrinter />
                                    {t` Print Invoice`}
                                </a>
                            </li>
                        </ul>
                        {!isCanceled && narvarTrackingUrl ? (
                            <div className={styles.orderAction}>
                                <a
                                    href={narvarTrackingUrl}
                                    target="_blank"
                                    role="button"
                                    className={styles.orderActionAnchor}
                                    rel="noreferrer"
                                >
                                    {t`View Tracking info`}
                                </a>
                            </div>
                        ) : null}
                    </div>
                </div>
                {!isCanceled && additionalInfo && isMobile ? (
                    <div className={styles.mobileProgressBar}>
                        <OrderProgressBar status={status} />
                    </div>
                ) : null}
                {additionalInfo ?? null}
            </div>
            {!isCanceled ? <OrderProgressBar status={status} /> : null}
        </>
    );
}

function OrderDate({ date }) {
    if (!date.endsWith('Z')) {
        // Convert to an ISO 8601 format and append 'Z' to indicate UTC
        date = `${date.replace(' ', 'T')}Z`;
    }

    return new Intl.DateTimeFormat('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit',
    }).format(new Date(date));
}
