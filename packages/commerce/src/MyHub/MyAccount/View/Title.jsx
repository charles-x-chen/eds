/**
 * @package     BlueAcorn/MyHub
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import styles from './style.module.css';

export default function Title({ customer: { firstname } }) {
    const suffix = firstname ? t`, ${firstname}.` : t`!`;
    return <h1 className={styles.myAccountTitle}>{t`Hello${suffix}`}</h1>;
}
