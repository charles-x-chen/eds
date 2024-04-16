/**
 * @package     BlueAcorn/MyHub
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import AccountCmsBlocks from '../../AccountCmsBlocks';
import RecommendedProducts from '../../RecommendedProducts';
import Title from './Title';
import OrderHistory from './OrderHistory';
import AccountLinks from './AccountLinks';
import StealthtechApp from './StealthtechApp';
import styles from './style.module.css';
import ReferAFriend from './ReferAFriend';
import { ErrorBoxList } from '~/View/ErrorBox';

const emptyArray = [];
const responsive = { 0: { items: 1 }, 1024: { items: 4 } };

export default function MyAccountView({ customer, blocks, paymentTokens, fetching }) {
    const orders = customer?.orders?.items || emptyArray;
    return (
        <div className={styles.myAccount}>
            <ErrorBoxList>
                <Title customer={customer} />
                <OrderHistory orders={orders} fetching={fetching} />
                <AccountLinks paymentTokens={paymentTokens || emptyArray} />
                <StealthtechApp orders={orders} blocks={blocks} />
                <ReferAFriend customer={customer} blocks={blocks} />
                <AccountCmsBlocks orders={orders} blocks={blocks} responsive={responsive} />
                <RecommendedProducts orders={orders} desktopSlides={4} maxQty={8} fetching={fetching} />
            </ErrorBoxList>
        </div>
    );
}
