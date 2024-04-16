/**
 * @package     BlueAcorn/MyHub
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { useRef, useEffect } from 'preact/hooks';
import styles from './style.module.css';
import RichText from '~/View/RichText';
import { getCommerceUrl } from '~/Api/Url';
import { extoleCreateCustomerZone } from '~/Api/Extole';

export default function ReferAFriend({ customer, blocks }) {
    const quickLinksBlock = blocks.quickLinks?.content;
    return (
        quickLinksBlock && (
            <div className={styles.referFriendWrapper}>
                <RichText className={styles.quickLinksWrapper} content={quickLinksBlock} />
                {customer.refer && <MyReferralsBlock customer={customer} />}
            </div>
        )
    );
}

const MyReferralsBlock = ({ customer }) => {
    const ref = useRef();

    useEffect(() => {
        extoleCreateCustomerZone(customer, ref.current);
    }, [customer]);

    return (
        <div className={styles.referalBlockWrapper}>
            <div className={styles.referalBlockTitle}>{t`My Referrals`}</div>
            <div className={styles.referalBlockContent}>
                <div ref={ref} />
                <a href={getCommerceUrl('extolreferrals/customer/index')} className={styles.manageReferralsBtn}>
                    <span className={styles.manageReferralsBtnText}>{t`Manage Referrals`}</span>
                </a>
            </div>
        </div>
    );
};
