/**
 * @package     BlueAcorn/View
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import parseHtml from './parseHtml';
import components from './Components';
import styles from './style.module.css';

export default function PageBuilder({ content, className, ...props }) {
    return (
        <div className={`${styles.root} ${className}`} {...props}>
            {parseHtml(content, components)}
        </div>
    );
}

PageBuilder.defaultProps = {
    content: '',
    className: '',
};
