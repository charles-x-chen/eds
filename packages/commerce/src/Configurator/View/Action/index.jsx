/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { useMemo, useCallback } from 'preact/hooks';
import { useConfiguratorContext } from '../../Context/Configurator';
import { useNavigatorContext } from '../../Context/Navigator';
import { QtyIncrementor } from '../QtyIncrementor';
import { useTotalsContext } from '../../Context/Totals';
import { PriceContainer } from '../PriceContainer';
import styles from './style.module.css';

export const ShowNextStepActionBar = ({ showQtySelector }) => {
    const {
        type: { steps },
    } = useConfiguratorContext();
    const { stepIndex, setStepIndex, stepQty } = useNavigatorContext();

    const action = useCallback(() => {
        setStepIndex((stepIndex) => stepIndex + 1);
    }, [setStepIndex]);

    if (stepIndex + 1 >= stepQty) {
        return;
    }

    return (
        <ActionBar
            title={`${t`Next`}: ${steps[stepIndex + 1].button || ''}`}
            action={action}
            showQtySelector={showQtySelector}
        />
    );
};

export const ActionBar = ({ action, title, showQtySelector }) => {
    return (
        <div className={`${styles.summaryAction} ${showQtySelector ? 'summary-actions--throwpillow' : ''}`}>
            {showQtySelector ? <QtyIncrementor show="both" label={t`Select Quantity to Add:`} /> : null}
            <div className={`${styles.summaryActionsActionWrapper}`}>
                <ActionBarPrice />
                <ActionBarButton action={action} title={title} />
            </div>
        </div>
    );
};

export const ActionBarPrice = () => {
    const { total, totalWithoutDiscount } = useTotalsContext();
    const {
        type: { code },
    } = useConfiguratorContext();

    return useMemo(() => {
        const configuratorsToExclude = [
            'squattoman',
            'squattomanCover',
            'sactionalCover',
            'sacCover',
            'throwPillow',
            'sactionalCover',
            'throwPillowCover',
        ];
        if (configuratorsToExclude.includes(code)) {
            return;
        }

        return (
            <PriceContainer
                total={total}
                totalWithoutDiscount={totalWithoutDiscount}
                classes={`${styles.priceSummaryPriceWrapper}`}
                showSubtotalPricingText={true}
            />
        );
    }, [code, total, totalWithoutDiscount]);
};

const ActionBarButton = ({ action, title }) => {
    const onClick = useCallback(
        (event) => {
            event.preventDefault();
            action();
        },
        [action],
    );

    return (
        <button className={styles.actionTrigger} onClick={onClick}>
            {title}
        </button>
    );
};
