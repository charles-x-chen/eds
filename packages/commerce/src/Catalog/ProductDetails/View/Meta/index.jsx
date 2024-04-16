/**
 * @package     BlueAcorn/Catalog
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import useSchemaOrgJson from './useSchemaOrgJson';
import Meta from '~/View/Meta';
import { getProductUrl } from '~/Api/Url';

export default function ProductMeta({ product }) {
    const { metaTitle, metaDescription, metaKeyword } = product;

    const schemaOrgJSONLD = useSchemaOrgJson(product);

    return (
        <Meta>
            <title>{metaTitle}</title>
            <link rel="canonical" href={getProductUrl(product)} />
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={metaKeyword} />
            <script type="application/ld+json">{JSON.stringify(schemaOrgJSONLD)}</script>
        </Meta>
    );
}
