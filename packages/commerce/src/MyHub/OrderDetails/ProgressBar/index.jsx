/**
 * @package     BlueAcorn/MyHub
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { BsCircleFill } from 'react-icons/bs';
import styles from './style.module.css';

export default function OrderProgressBar({ status }) {
    const statuses = ['Processing', 'Partially Shipped', 'Fully Shipped'];
    const statusIndex = statuses.findIndex(
        (statusItem) => statusItem.toLowerCase() === status.replace(/_/g, ' ').toLowerCase(),
    );
    const getStatusClassName = (index) => (index <= statusIndex ? styles.progressBarComplete : '');
    return (
        <div className={styles.progressBarWrapper}>
            <ul className={styles.progressBar}>
                <li className={`${styles.progressBarComplete} ${styles.progressBarItem}`}>
                    <BsCircleFill />
                    <span> {t`Order Placed`}</span>
                </li>
                {statuses.map((statusText, index) => (
                    <li key={index} className={`${styles.progressBarItem} ${getStatusClassName(index)}`}>
                        <BsCircleFill />
                        <span>{statusText}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
