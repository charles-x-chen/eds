/**
 * @package     BlueAcorn/MyHub
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import OrderDetailsTable from '../../Table';
import OrderDetailsHeader from '../../Header';
import style from './style.module.css';
import CreateAccount from './CreateAccount';
import { getCommerceUrl } from '~/Api/Url';
import { ErrorBoxList } from '~/View/ErrorBox';

export default function GuestOrderDetailsView({ orderData, email, firstname, lastname }) {
    const url = getCommerceUrl(`sales/guest/print/order_id/${orderData.id}`);
    return (
        <div className={style.container}>
            <ErrorBoxList>
                <OrderDetailsHeader
                    orderData={orderData}
                    variant={'half'}
                    printOrderUrl={url}
                    additionalInfo={<CreateAccount email={email} firstname={firstname} lastname={lastname} />}
                />
                <OrderDetailsTable orderData={orderData} />
            </ErrorBoxList>
        </div>
    );
}
