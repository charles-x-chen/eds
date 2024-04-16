/**
 * @package     BlueAcorn/Catalog
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import RichText from '~/View/RichText';

export default function RelatedProducts({ product: { attributes } }) {
    const content = attributes.find(({ name }) => name === 'pdp_bottom_content')?.value;
    if (!content) {
        return null;
    }

    return <RichText content={content} />;
}
