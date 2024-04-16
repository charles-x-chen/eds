/**
 * @package     BlueAcorn/MyHub
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import AccountCmsBlocks from '../../../AccountCmsBlocks';
import RecommendedProducts from '../../../RecommendedProducts';
import QuickLinks from '../../../QuickLinks';
import OrderDetailsTable from '../../Table';
import OrderDetailsHeader from '../../Header';
import style from './style.module.css';
import { getCommerceUrl } from '~/Api/Url';
import { ErrorBoxList } from '~/View/ErrorBox';

const responsive = { 0: { items: 1 }, 1024: { items: 3.5 } };

export default function OrderDetailsView({ orderData, blocks, fetching }) {
    const url = getCommerceUrl(`sales/order/print/order_id/${atob(orderData[0].id)}`);

    return (
        <ErrorBoxList>
            <OrderDetailsHeader orderData={orderData[0]} printOrderUrl={url} />
            <OrderDetailsTable orderData={orderData[0]} fetching={fetching} />
            {Object.keys(blocks).map((key) => (
                // eslint-disable-next-line react/jsx-key
                <div className={`${blocks[key].isSlider ? style.galleryFullWidth : ''}`}>
                    <AccountCmsBlocks orders={orderData} blocks={{ [key]: blocks[key] }} responsive={responsive} />
                </div>
            ))}
            <QuickLinks blocks={blocks} />
            <RecommendedProducts orders={orderData} desktopSlides={3.5} fetching={fetching} />
        </ErrorBoxList>
    );
}
