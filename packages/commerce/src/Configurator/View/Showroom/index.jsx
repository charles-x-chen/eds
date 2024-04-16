/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import styles from './style.module.css';
import { getCommerceUrl } from '~/Api/Url';

export default function ShowroomContent() {
    return (
        <div className={styles.showroom}>
            <div className={styles.title}>
                <span>{t`Experience in Person`}</span>
            </div>
            <div className={styles.body}>
                <span>{t`Visit one of our showrooms to experience Sactionals for yourself.`}</span>
            </div>
            <div className={styles.actions}>
                <a href={getCommerceUrl('showroomlocator')} target="_blank" rel="noreferrer">{t`Find a Showroom`}</a>
            </div>
        </div>
    );
}
