/**
 * @package     BlueAcorn/View
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import PageBuilder from './PageBuilder';
import RawHtml from './RawHtml';

export default function RichText(props) {
    return /data-content-type=/.test(props.content) ? <PageBuilder {...props} /> : <RawHtml {...props} />;
}

RichText.defaultProps = {
    content: '',
};
