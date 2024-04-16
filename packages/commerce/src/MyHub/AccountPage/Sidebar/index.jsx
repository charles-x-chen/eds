/**
 * @package     BlueAcorn/MyHub
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useState, useCallback } from 'preact/hooks';
import { t } from 'ttag';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import styles from './style.module.css';
import { getCommerceUrl } from '~/Api/Url';
import mobileSignal from '~/Api/Mobile';

export default function AccountSidebar({ type }) {
    const isMobile = mobileSignal.value;
    const [showMenuMobile, setShowMenuMobile] = useState(false);
    const toggleMenu = useCallback(() => setShowMenuMobile((show) => !show), []);
    const showMenu = !isMobile || showMenuMobile;

    return (
        <div className={styles.sidebarLinksWrapper}>
            {isMobile && (
                <button className={styles.sidebarLinkTriggerWrapper} onClick={toggleMenu}>
                    <img src={getCommerceUrl('media/wysiwyg/myaccount/icons/account-menu.png')} alt={t`My Accounts`} />
                    <span className={styles.sidebarLinkTrigger}>Account Menu</span>
                    {showMenuMobile ? <BsChevronUp /> : <BsChevronDown />}
                </button>
            )}

            {showMenu ? <SidebarLinksContainer currentPage={type} /> : null}
        </div>
    );
}

function SidebarLinksContainer({ currentPage }) {
    const menuItems = [
        { key: 'dashboard', label: t`My Account`, href: getCommerceUrl('customer/account/') },
        { key: 'myorders', label: t`Order History`, href: getCommerceUrl('sales/order/history/') },
        { key: 'wishlist', label: t`My Wish List`, href: getCommerceUrl('wishlist') },
        { separator: true },
        { key: 'addressbook', label: t`Address Book`, href: getCommerceUrl('customer/address/') },
        { key: 'accountinformation', label: t`Account Information`, href: getCommerceUrl('customer/account/edit/') },
        { key: 'paymentmethods', label: t`Stored Payment Methods`, href: getCommerceUrl('vault/cards/listaction/') },
        { key: 'giftcard', label: t`Gift Card`, href: getCommerceUrl('giftcard/customer/') },
        {
            key: 'configurations',
            label: t`Saved Configurations`,
            href: getCommerceUrl('configurator/customer/savedconfigurations/'),
        },
        { key: 'refer', label: t`Refer A Friend`, href: getCommerceUrl('extolreferrals/customer/index/') },
        { separator: true },
        { key: 'signout', label: t`Sign Out`, href: getCommerceUrl('customer/account/logout/') },
    ];

    return (
        <ul className={styles.sidebarLinks} role="menu" tabIndex={0}>
            {menuItems.map((item, index) =>
                item.separator ? (
                    <Separator key={index} />
                ) : (
                    <SidebarLink key={item.key} {...item} currentPage={currentPage} />
                ),
            )}
        </ul>
    );
}

function SidebarLink({ label, key, href, currentPage }) {
    return (
        <li className={`${styles.sidebarLink} ${currentPage === key ? styles.activeSidebarLink : ''}`}>
            <a href={href || '#'} data-key={key} role="menuitem" tabIndex={-1}>
                {label}
            </a>
        </li>
    );
}

function Separator() {
    return (
        <li className={`${styles.sidebarLink} ${styles.sidebarLinkLimiter}`}>
            <span className={styles.sidebarLimiter} />
        </li>
    );
}
