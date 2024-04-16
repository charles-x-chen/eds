/**
 * @package     BlueAcorn/MyHub
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import styles from './style.module.css';
import Pagination from '~/View/Pagination';
import Price from '~/View/Price';
import { getCommerceUrl } from '~/Api/Url';
import Loading from '~/View/Loading';

export default function OrderHistoryTable({ items, page, setPage, lastPage, fetching }) {
    return items?.length > 0 ? (
        <HistoryTable items={items} page={page} setPage={setPage} lastPage={lastPage} />
    ) : (
        <div className={styles.wrapper}>
            {fetching ? (
                <Loading />
            ) : (
                <span className={styles.contact}>
                    {t`Don’t see your order?`}
                    <a className={styles.contactLink} href={getCommerceUrl(`contactus`)}>{t`Contact Us`}</a>
                </span>
            )}
        </div>
    );
}

function HistoryTable({ items, page, setPage, lastPage }) {
    return (
        <div className={styles.orderHistoryTableWrapper}>
            {items.map((item, index) => (
                <div className={styles.items} key={index}>
                    <div className={styles.header}>
                        <span>
                            {item.orderDate.endsWith('Z')
                                ? new Date(item.orderDate).toLocaleDateString()
                                : new Date(`${item.orderDate.replace(' ', 'T')}Z`).toLocaleDateString()}
                        </span>
                    </div>
                    <div className={styles.itemsWrapper}>
                        <div className={styles.item}>
                            <span className={styles.title}>{t`Order Number`}</span>
                            <span className={styles.text}>
                                {item.number} {`${item.netsuite?.orderId ? ` / ${item.netsuite?.orderId}` : ''}`}
                            </span>
                        </div>
                        <div className={styles.item}>
                            <span className={styles.title}>{t`Total`}</span>
                            <span className={styles.text}>
                                <Price value={item.total.grandTotal.value} />
                            </span>
                        </div>
                        <div className={styles.item}>
                            <span className={styles.title}>{t`status`}</span>
                            <span className={styles.text}>{item.status}</span>
                        </div>
                        <div className={styles.item}>
                            <OrderDetailsButton id={item.id} />
                        </div>
                    </div>
                </div>
            ))}

            <Pagination page={page} siblings={1} last={lastPage} onChange={setPage} />
        </div>
    );
}

function OrderDetailsButton({ id }) {
    const url = getCommerceUrl(`sales/order/view/order_id/${atob(id)}`);
    return (
        <a className={styles.itemLink} href={url}>
            {t`view details`}
        </a>
    );
}
