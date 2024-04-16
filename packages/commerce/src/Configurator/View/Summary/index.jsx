/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { useCallback, useMemo } from 'preact/hooks';
import { useNavigatorContext } from '../../Context/Navigator';
import { SaveShareMobileContent } from '../ActionMobile';
import { Loader } from '../Loader';
import FinancingContent from '../Financing';
import { LogoSubtitle } from '../LogoSubtitle';
import { ProductDetailsRiskFree, ProductDetailsShippingReturns, ReviewMobileBlock } from '../ProductDetailsMobile';
import { ActionAddToCart } from '../ActionAddToCart';
import { useConfiguratorContext } from '../../Context/Configurator';
import { useTotalsContext } from '../../Context/Totals';
import Price from '../../../View/Price';
import { SidebarHeader } from '../SidebarHeader';
import ShippingInfoComponent from '../ShippingInfoComponent';
import ShowroomContent from '../Showroom';
import styles from './style.module.css';

export const SummaryBar = () => {
    const { stepIndex, stepQty, summaryExpanded, setSummaryExpanded } = useNavigatorContext();

    if (stepIndex + 1 >= stepQty) {
        return;
    }

    return <SummaryBarVisible setSummaryExpanded={setSummaryExpanded} summaryExpanded={summaryExpanded} />;
};

const SummaryBarVisible = ({ setSummaryExpanded, summaryExpanded }) => {
    const clickHandle = useCallback(
        (event) => {
            event.preventDefault();
            setSummaryExpanded((expanded) => !expanded);
        },
        [setSummaryExpanded],
    );

    const SummaryButton = (
        <div className={'sidebar-header-wrapper__action'}>
            <button
                className={`${styles.sidebarHeaderAction} ${summaryExpanded ? 'active' : ''}`}
                onClick={clickHandle}
            >
                {t`Summary`}
            </button>
        </div>
    );

    return <SidebarHeader summaryButton={SummaryButton} />;
};

export const SummaryExpanded = ({ showQtySelector = false }) => {
    return (
        <div className={styles.summaryExpanded}>
            <div className={styles.summary}>
                <div className={styles.header}>
                    <SaveShareMobileContent />
                    <div className={styles.title}>{t`Review your setup and add to cart`}</div>
                </div>

                <SummaryContent />

                <Loader>
                    <ShippingInfoComponent />
                    <FinancingContent />
                    <ShowroomContent />

                    <div className={styles.detailsMobile}>
                        <LogoSubtitle />
                        <ReviewMobileBlock />
                        <SummaryRiskFree />
                        <SummaryShippingReturns />
                    </div>
                </Loader>
            </div>
            <ActionAddToCart showQtySelector={showQtySelector} />
        </div>
    );
};

const SummaryRiskFree = () => {
    const {
        messages: { riskFreeText },
    } = useConfiguratorContext();

    return (
        <ProductDetailsRiskFree title={t`Risk-Free 60-Day Home Trial`} cssClass={'risk-free'} content={riskFreeText} />
    );
};

const SummaryShippingReturns = () => {
    const {
        messages: { shippingReturnsText },
    } = useConfiguratorContext();

    return (
        <ProductDetailsShippingReturns
            title={t`Shipping and Returns`}
            cssClass={'shipping-returns'}
            content={shippingReturnsText}
        />
    );
};

export const SummaryContent = () => {
    return (
        <div>
            <SummaryLines />
            <TotalsLine />
        </div>
    );
};

const SummaryLines = () => {
    const { type } = useConfiguratorContext();

    return useMemo(() => {
        const { steps, extra = [] } = type;
        return (
            <div className="summary-lines">
                {extra.map((step, index) => (
                    <step.SummaryComponent stepIndex={index} key={-1 - index} />
                ))}
                {steps.map((step, index) => (
                    <step.SummaryComponent stepIndex={index} key={index} />
                ))}
            </div>
        );
    }, [type]);
};

const TotalsLine = () => {
    return (
        <div className={styles.total}>
            <div className={styles.totalTitle}>{t`Total`}</div>
            <div className={styles.totalPrice}>
                <TotalsPrice />
            </div>
        </div>
    );
};

const TotalsPrice = () => {
    const { total } = useTotalsContext();
    return <Price value={total} />;
};

export const SummaryLineEditButton = ({ stepIndex }) => {
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
            <div className="summary-button-wrapper">
                <button className="summary-line-edit" onClick={clickHandler}>
                    {t`Edit`}
                </button>
            </div>
        ),
        [clickHandler],
    );
};
