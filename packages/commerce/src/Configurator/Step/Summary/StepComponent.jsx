/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { Fragment } from 'preact';
import { useEffect } from 'preact/hooks';
import { ActionAddToCart } from '../../View/ActionAddToCart';
import { useTotalsContext } from '../../Context/Totals';
import { Price } from '../../View/Price';
import { SummaryContent } from '../../View/Summary';
import FinancingContent from '../../View/Financing';
import ShowroomContent from '../../View/Showroom';
import { ReviewContent } from '../../View/Review';
import { SaveShareMobileContent } from '../../View/ActionMobile';
import { ProductDetailsRiskFree, ProductDetailsShippingReturns } from '../../View/ProductDetailsMobile';
import { useConfiguratorContext } from '../../Context/Configurator';
import ShippingInfoComponent from '../../View/ShippingInfoComponent';
import { LogoSubtitle } from '../../View/LogoSubtitle';
import { Player } from '../../View/Player';
import { useDataLayerContext } from '../../Context/DataLayer';
import { Loader } from '../../View/Loader';
import styles from './style.module.css';

export const StepComponent = ({ showQtySelector = false }) => {
    const push = useDataLayerContext();
    useEffect(() => {
        push('summary');
    }, [push]);

    return (
        <Fragment>
            <div className="summary">
                <SummaryHeader />
                <SummaryContent />
                <Loader>
                    <ShippingInfoComponent />
                    <FinancingContent />
                    <ShowroomContent />
                    <ProductDetailsMobile />
                </Loader>
            </div>
            <SummaryActionBar showQtySelector={showQtySelector} />
        </Fragment>
    );
};

const SummaryHeader = () => {
    const {
        type: { title },
        steps: { summary },
    } = useConfiguratorContext();

    return (
        <div className={styles.header}>
            <ReviewContent />
            <span className={styles.title}>{summary.title ?? t`Your ${title} Setup`}</span>
            <SummaryTotalPrice />
            <div className={styles.specialFinancing}>
                <span>{t`Or, pay over time with`}</span>
                <div className={styles.affirmImage} />
                <a className={styles.link} href="/financing-options" target="_blank">{t`Apply Today`}</a>
            </div>
            <Player show="mobile" helperClass={styles.summaryPlayer} />
            <SaveShareMobileContent />
        </div>
    );
};

const SummaryTotalPrice = () => {
    const { total, totalWithoutDiscount } = useTotalsContext();

    return (
        <div className={styles.priceContainer}>
            <Price value={total} />{' '}
            {totalWithoutDiscount > total ? (
                <s>
                    <Price value={totalWithoutDiscount} />
                </s>
            ) : null}
        </div>
    );
};

const ProductDetailsMobile = () => {
    const {
        messages: { riskFreeText, shippingReturnsText },
    } = useConfiguratorContext();
    return (
        <div className={styles.mobileLinksWrapper}>
            <LogoSubtitle />
            <ProductDetailsRiskFree
                title={t`Risk-Free 60-Day Home Trial`}
                cssClass={'risk-free'}
                content={riskFreeText}
            />
            <ProductDetailsShippingReturns
                title={t`Shipping and Returns`}
                cssClass={'shipping-returns'}
                content={shippingReturnsText}
            />
        </div>
    );
};

const SummaryActionBar = ({ showQtySelector }) => {
    return <ActionAddToCart showQtySelector={showQtySelector} />;
};
