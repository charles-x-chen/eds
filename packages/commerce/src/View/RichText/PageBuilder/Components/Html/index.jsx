/**
 * @package     BlueAcorn/View
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
/* eslint react/no-danger: off */

export default function Html({ children, props }) {
    return <div {...props} dangerouslySetInnerHTML={{ __html: children.join('\n') }} />;
}
