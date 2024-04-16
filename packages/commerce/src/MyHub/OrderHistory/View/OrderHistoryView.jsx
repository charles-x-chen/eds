/**
 * @package     BlueAcorn/MyHub
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import RecommendedProducts from '../../RecommendedProducts';
import QuickLinks from '../../QuickLinks';
import OrderHistoryTable from './OrderHistoryTable';
import { ErrorBoxList } from '~/View/ErrorBox';

export default function OrderHistoryView({ orderData, blocks, page, setPage, lastPage, fetching }) {
    return (
        <ErrorBoxList>
            <OrderHistoryTable
                items={orderData}
                page={page}
                setPage={setPage}
                lastPage={lastPage}
                fetching={fetching}
            />
            <QuickLinks blocks={blocks} />
            <RecommendedProducts orders={orderData} desktopSlides={3.5} fetching={fetching} />
        </ErrorBoxList>
    );
}
