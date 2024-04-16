/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { useConfiguratorContext } from '../../Context/Configurator';
import { useTotalsContext } from '../../Context/Totals';
import { FinancingContentMessage } from '../FinancingContentMessage';
import styles from './style.module.css';

export default function FinancingContent({ helperClass }) {
    const { global } = useConfiguratorContext();
    const { total } = useTotalsContext();
    const showFinancing = total > 0;

    return (
        showFinancing && (
            <div className={`${styles.financing} ${helperClass}`}>
                <FinancingContentMessage total={total} config={global} />
                <div className="content-additional">
                    <span>{t`Or, pay over time with`}</span>
                    <div className={styles.affirmImage} />
                    <a className={styles.link} href="/financing-options" target="_blank">{t`Apply Today`}</a>
                </div>
            </div>
        )
    );
}
