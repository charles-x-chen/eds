/**
 * @package     BlueAcorn/MyHub
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */

import styles from './style.module.css';
import RichText from '~/View/RichText';

export default function QuickLinks({ blocks }) {
    const quickLinksBlock = blocks.quickLinks?.content;
    return <RichText className={styles.quickLinksWrapper} content={quickLinksBlock} />;
}
