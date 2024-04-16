/**
 * @package     BlueAcorn/View
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import styles from './style.module.css';

export default function Default({ children, style, className }) {
    const props = {
        className: [styles.default, className].join(' '),
    };
    if (style) {
        props.style = style;
    }
    return <div {...props}>{children}</div>;
}
