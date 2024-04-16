/**
 * @package     BlueAcorn/MyHub
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { BsChevronRight } from 'react-icons/bs';
import styles from './style.module.css';
import { getCommerceUrl } from '~/Api/Url';
import ClosestShowroom from '~/StoreLocator/ClosestShowroom';

export default function AccountLinks({ paymentTokens }) {
    return (
        <div className={styles.dashboardLinksWrapper}>
            <a
                href={getCommerceUrl('customer/account/edit')}
                className={styles.dashboardLink}
                aria-label={t`Account Information`}
            >
                <img
                    src={getCommerceUrl(`media/wysiwyg/myaccount/icons/account-information.png`)}
                    alt={t`Account Information`}
                />
                <div className={styles.dashboardLinkText}>
                    <span>{t`Account Information`}</span>
                    <span className={styles.dashboardLinkDetails}>{t`Edit your account information.`}</span>
                    <div className={styles.dashboardIcon}>
                        <BsChevronRight />
                    </div>
                </div>
            </a>
            <a href={getCommerceUrl('customer/address')} className={styles.dashboardLink} aria-label={t`Address Book`}>
                <img src={getCommerceUrl(`media/wysiwyg/myaccount/icons/address-book.png`)} alt={t`Address Book`} />
                <div className={styles.dashboardLinkText}>
                    <span>{t`Address Book`}</span>
                    <span className={styles.dashboardLinkDetails}>{t`Manage and edit your saved addresses.`}</span>
                    <div className={styles.dashboardIcon}>
                        <BsChevronRight />
                    </div>
                </div>
            </a>
            <a
                href={getCommerceUrl('vault/cards/listaction')}
                className={styles.dashboardLink}
                aria-label={t`Stored Payment Methods`}
            >
                <img
                    src={getCommerceUrl(`media/wysiwyg/myaccount/icons/stored-payment-methods.png`)}
                    alt={t`Stored Payment Methods`}
                />
                <div className={styles.dashboardLinkText}>
                    <span>{t`Stored Payment Methods`}</span>
                    <StoredPaymentLabel paymentTokens={paymentTokens} />
                    <div className={styles.dashboardIcon}>
                        <BsChevronRight />
                    </div>
                </div>
            </a>
            <a
                href={getCommerceUrl('configurator/customer/savedconfigurations')}
                className={styles.dashboardLink}
                aria-label={t`Saved Configurations`}
            >
                <img
                    src={getCommerceUrl(`media/wysiwyg/myaccount/icons/saved-configurations.png`)}
                    alt={t`Saved Configurations`}
                />
                <div className={styles.dashboardLinkText}>
                    <span>{t`Saved Configurations`}</span>
                    <span
                        className={styles.dashboardLinkDetails}
                    >{t`Manage your saved Sactionals configurations.`}</span>
                    <div className={styles.dashboardIcon}>
                        <BsChevronRight />
                    </div>
                </div>
            </a>
            <a href={getCommerceUrl('wishlist')} className={styles.dashboardLink} aria-label={t`My Wish List`}>
                <img src={getCommerceUrl(`media/wysiwyg/myaccount/icons/wishlist.png`)} alt={t`My Wish List`} />
                <div className={styles.dashboardLinkText}>
                    <span>{t`My Wish List`}</span>
                    <span className={styles.dashboardLinkDetails}>{t`View and add your favorite items.`}</span>
                    <div className={styles.dashboardIcon}>
                        <BsChevronRight />
                    </div>
                </div>
            </a>
            <a
                href={getCommerceUrl('showroomlocator')}
                className={styles.dashboardLink}
                aria-label={t`Your Local Showroom`}
            >
                <img
                    src={getCommerceUrl(`media/wysiwyg/myaccount/icons/local-showroom.png`)}
                    alt={t`Your Local Showroom`}
                />
                <div className={styles.dashboardLinkText}>
                    <span>{t`Your Local Showroom`}</span>
                    <span className={styles.dashboardLinkDetails}>
                        <ClosestShowroom />
                    </span>
                    <div className={styles.dashboardIcon}>
                        <BsChevronRight />
                    </div>
                </div>
            </a>
            <a
                href={getCommerceUrl('newsletter/manage/')}
                className={styles.dashboardLink}
                aria-label={t`Newsletter Subscription`}
            >
                <img
                    src={getCommerceUrl(`media/wysiwyg/myaccount/icons/newsletter-subscription.png`)}
                    alt={t`Newsletter Subscription`}
                />
                <div className={styles.dashboardLinkText}>
                    <span>{t`Newsletter Subscription`}</span>
                    <span className={styles.dashboardLinkDetails}>{t`Manage your preferences.`}</span>
                    <div className={styles.dashboardIcon}>
                        <BsChevronRight />
                    </div>
                </div>
            </a>
            <a href={getCommerceUrl('giftcard/customer')} className={styles.dashboardLink} aria-label={t`Gift Card`}>
                <img src={getCommerceUrl(`media/wysiwyg/myaccount/icons/giftcard.png`)} alt={t`Gift Card`} />
                <div className={styles.dashboardLinkText}>
                    <span>{t`Gift Card`}</span>
                    <span className={styles.dashboardLinkDetails}>{t`View your gift cards.`}</span>
                    <div className={styles.dashboardIcon}>
                        <BsChevronRight />
                    </div>
                </div>
            </a>
        </div>
    );
}

const baseCardTypes = {
    AE: 'American Express',
    VI: 'Visa',
    MC: 'MasterCard',
    DI: 'Discover',
    JBC: 'JBC',
    MI: 'Maestro',
};

function StoredPaymentLabel({ paymentTokens }) {
    try {
        const { details } = paymentTokens[paymentTokens.length - 1];
        const { maskedCC, type } = JSON.parse(details);
        return (
            <span className={styles.dashboardLinkDetails}>{t`${
                baseCardTypes[type] || 'Card'
            } ending in ${maskedCC}`}</span>
        );
    } catch {
        return <span className={styles.dashboardLinkDetails}>{t`You have no stored payment methods.`}</span>;
    }
}
