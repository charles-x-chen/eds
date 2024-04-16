/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useMemo } from 'preact/hooks';
import { t } from 'ttag';
import { useTotalsContext } from '../../Context/Totals';
import { useConfiguratorContext } from '../../Context/Configurator';
import styles from './style.module.css';
import RichText from '~/View/RichText';

export const FinancingText = () => {
    const { total } = useTotalsContext();
    const {
        config: { financingMessage, financingMessageMonths },
    } = useConfiguratorContext();
    const message =
        financingMessage && financingMessageMonths
            ? financingMessage
                  .replace('%1', `$${Math.ceil(total / financingMessageMonths)}`)
                  .replace('%2', financingMessageMonths)
            : null;
    return useMemo(() => {
        return (
            <div className={styles.wrapper}>
                <span className={styles.content}>
                    <RichText className="financing-message-text" content={message} />
                    <a href="/financing" className={styles.link}>{t`Learn More`}</a>
                </span>
            </div>
        );
    }, [message]);
};
