/**
 * @package     BlueAcorn/View
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
/* eslint react/no-danger: off */
import DOMPurify from 'dompurify';
import { useMemo } from 'preact/hooks';

export default function RawHtml({ content, ...props }) {
    const clean = useMemo(() => ({ __html: DOMPurify.sanitize(content, { USE_PROFILES: { html: true } }) }), [content]);
    return <div {...props} dangerouslySetInnerHTML={clean} />;
}

RawHtml.defaultProps = {
    content: '',
};
