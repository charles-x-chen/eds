/**
 * @package     BlueAcorn/Catalog
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { getCommerceUrl } from '~/Api/Url';

export default function ProductActions({ product }) {
    const { externalId: productId } = product;
    return (
        <div>
            <button>{t`Save`}</button>
            <a href={getCommerceUrl(`/sendfriend/product/send/id/${productId}/`)}>{t`Share`}</a>
            <a href={getCommerceUrl(`/showroomlocator/?product=${productId}`)}>{t`Find a showroom`}</a>
        </div>
    );
}
