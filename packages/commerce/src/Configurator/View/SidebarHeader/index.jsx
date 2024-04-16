/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import styles from './style.module.css';
import mobileSignal from '~/Api/Mobile';

export const SidebarHeader = ({ summaryButton, helperClass = null }) => {
    const isMobile = mobileSignal.value;
    return (
        <div className={`${styles.sidebarHeader} ${helperClass}`}>
            {isMobile ? (
                <a href={window.location.origin}>
                    <span className={`${styles.mobileLogo}`} />
                    <span className={`${styles.mobileLogoSubtitle}`}>{t`Always Fits. Forever New.™`}</span>
                </a>
            ) : null}
            {summaryButton ? summaryButton : ''}
        </div>
    );
};
