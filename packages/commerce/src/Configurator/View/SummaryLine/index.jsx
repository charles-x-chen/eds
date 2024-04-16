/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useCallback, useMemo } from 'preact/hooks';
import { t } from 'ttag';
import { useNavigatorContext } from '../../Context/Navigator';
import { useConfiguratorContext } from '../../Context/Configurator';
import styles from './style.module.css';
import Price from '~/View/Price';

export default function SummaryLine({ stepIndex, options }) {
    const {
        type: { steps },
    } = useConfiguratorContext();

    return (
        <div className={styles.line}>
            <div className={styles.title}>{steps[stepIndex].summary}</div>
            <SummaryLineEditButton stepIndex={stepIndex} />
            {options?.length ? <SummaryLineOptions options={options} /> : null}
        </div>
    );
}

function SummaryLineOptions({ options }) {
    return (
        <div className={styles.options}>
            {options.map((option, index) => (
                <SummaryLineOption option={option} key={index} />
            ))}
        </div>
    );
}

function SummaryLineOption({ option: { title, price = null } }) {
    return (
        <div className={styles.option}>
            <div className={styles.optionName}>{title}</div>
            <div className={styles.optionPrice}>{price !== null ? <Price value={price} /> : null}</div>
        </div>
    );
}

function SummaryLineEditButton({ stepIndex }) {
    const { setStepIndex, setSummaryExpanded } = useNavigatorContext();

    const clickHandler = useCallback(
        (event) => {
            event.preventDefault();
            setStepIndex(stepIndex);
            setSummaryExpanded(false);
        },
        [stepIndex, setStepIndex, setSummaryExpanded],
    );

    return useMemo(
        () => (
            <div className={styles.editButtonWrapper}>
                <button className={styles.editButton} onClick={clickHandler}>
                    {t`Edit`}
                </button>
            </div>
        ),
        [clickHandler],
    );
}
