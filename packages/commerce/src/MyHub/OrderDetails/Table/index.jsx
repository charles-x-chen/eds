/**
 * @package     BlueAcorn/MyHub
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import styles from './style.module.css';
import Price from '~/View/Price';

export default function OrderDetailsTable({
    orderData: {
        items,
        total,
        billingAddress,
        shippingAddress,
        paymentMethods,
        netsuite: { onlineOrder = null },
    },
}) {
    return (
        <div className={styles.wrapper} role="grid" aria-label={t`Order Items`} tabIndex={0}>
            {items && (
                <>
                    <div className={styles.tableHeader} role="row">
                        <span role="columnheader">{t`Product name`}</span>
                        <span role="columnheader" className={styles.tableHeaderSku}>{t`SKU`}</span>
                        <span role="columnheader" className={styles.tableHeaderQty}>{t`Qty`}</span>
                        <span role="columnheader" className={styles.tableHeaderPrice}>{t`Price`}</span>
                        <span role="columnheader" className={styles.tableHeaderSubtotal}>{t`Subtotal`}</span>
                    </div>
                    {items.map((item, index) => (
                        <OrderItem item={item} key={index} />
                    ))}
                </>
            )}
            <TableFooter total={total} isOnlineOrder={onlineOrder} />
            <OrderAddresses
                billingAddress={billingAddress}
                shippingAddress={shippingAddress}
                paymentMethods={paymentMethods}
                isOnlineOrder={onlineOrder}
            />
        </div>
    );
}

function OrderItem({ item }) {
    const imageUrl = item?.product?.thumbnail?.url;
    const discount = item.discounts.reduce((sum, { amount: { value } }) => sum + value, 0);

    return (
        <div className={`${styles.tableItems} ${imageUrl ? '' : styles.noImage}`} role="row">
            <div className={`${styles.productData} ${styles.tableItemName}`} role="gridcell" tabIndex={-1}>
                {imageUrl ? <img src={imageUrl} alt={item.name} height={90} width={90} /> : null}
                <span>{item.name}</span>
            </div>
            <div
                className={`${styles.tableItem} ${styles.tableItemSku}`}
                data-th={t`Sku:`}
                role="gridcell"
                tabIndex={-1}
            >
                {item.sku}
            </div>
            <div
                className={`${styles.tableItem} ${styles.tableItemQty}`}
                data-th={t`Qty:`}
                role="gridcell"
                tabIndex={-1}
            >
                {item.qty}
            </div>
            <div
                className={`${styles.tableItem} ${styles.tableItemPrice}`}
                data-th={t`Price:`}
                role="gridcell"
                tabIndex={-1}
            >
                {discount > 0 ? (
                    <span className={styles.orginalPrice}>
                        <Price {...item.price} />
                    </span>
                ) : null}
                <span className={styles.salePrice}>
                    <Price value={item.price.value - discount / Math.max(item.qty, 1)} currency={item.price.currency} />
                </span>
            </div>
            <div
                className={`${styles.tableItem} ${styles.tableItemSubtotal}`}
                data-th={t`Subtotal:`}
                role="gridcell"
                tabIndex={-1}
            >
                <Price value={item.price.value * item.qty - discount} currency={item.price.currency} />
            </div>
        </div>
    );
}

function TableFooter({ total, isOnlineOrder }) {
    const showDiscount = total.discounts && total.discounts.some((discount) => discount.amount.value !== 0);

    return (
        <div className={styles.tableFooter}>
            <ul className={styles.tableFooterItems}>
                <li className={styles.tableFooterItem}>
                    <span>{t`Subtotal:`}</span>
                    <span>{<Price {...total.subtotal} />}</span>
                </li>
                {total.salePriceSavingsTotal && isOnlineOrder && (
                    <li className={styles.tableFooterItem}>
                        <span>{t`Sale Price Savings:`}</span>
                        <span>{<Price {...total.salePriceSavingsTotal} />}</span>
                    </li>
                )}
                {showDiscount && (
                    <li className={styles.tableFooterItem}>
                        <span>{t`Discount:`}</span>
                        <span>
                            {total.discounts.map((discount, index) => (
                                <span key={index}>-{<Price {...discount.amount} />}</span>
                            ))}
                        </span>
                    </li>
                )}
                <li className={styles.tableFooterItem}>
                    <span>{t`Tax:`}</span>
                    <span>{<Price {...total.totalTax} />}</span>
                </li>
                <li className={styles.tableFooterItem}>
                    <span>{t`Shipping & Handling:`}</span>
                    <span>{<Price {...total?.shippingHandling?.totalAmount} />}</span>
                </li>
                {total.giftCard?.value > 0 ? (
                    <li className={styles.tableFooterItem}>
                        <span>{t`Gift Card:`}</span>
                        <span>
                            -<Price {...total.giftCard} />
                        </span>
                    </li>
                ) : null}
                <li className={`${styles.tableFooterItem} ${styles.grandTotal}`}>
                    <span>{t`Grand Total:`}</span>
                    <span>
                        <Price {...total.grandTotal} />
                    </span>
                </li>
            </ul>
        </div>
    );
}

function OrderAddresses({ billingAddress, shippingAddress, paymentMethods, isOnlineOrder }) {
    return (
        <div className={styles.addressWrapper}>
            {shippingAddress && <Address title={t`Shipping Address`} address={shippingAddress} />}
            {billingAddress && <Address title={t`Billing Address`} address={billingAddress} />}
            <div className={styles.paymentMethod}>
                {isOnlineOrder && <span className={styles.addressTitle}>{t`Payment Method`}</span>}
                {paymentMethods?.length && isOnlineOrder ? <span>{paymentMethods[0].name}</span> : null}
            </div>
        </div>
    );
}

function Address({ title, address }) {
    return (
        <div className={styles.address}>
            <span className={styles.addressTitle}>{title}</span>
            <span>
                {address.firstname} {address.lastname}
            </span>
            <span>
                {address.street?.map((street, index) => (
                    <span key={index}>{street}</span>
                ))}
            </span>
            <span>
                {address.city}, {address.region}
            </span>
            <span>
                {address.postcode}, {address.countryCode}
            </span>
            {address.telephone ? (
                <span>
                    T: <PhoneNumber number={address.telephone} />
                </span>
            ) : null}
        </div>
    );
}

function PhoneNumber({ number }) {
    const numericOnly = number.replace(/\D/g, '');
    return `${numericOnly.slice(0, 3)}-${numericOnly.slice(3, 6)}-${numericOnly.slice(6, 10)}`;
}
