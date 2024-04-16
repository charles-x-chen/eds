/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { useCallback, useRef } from 'preact/hooks';
import FinancingContent from '../../View/Financing';
import { ReviewContentStars } from '../../View/Review';
import { useNavigatorContext } from '../../Context/Navigator';
import { QtyIncrementor } from '../../View/QtyIncrementor';
import { ActionAddToCart } from '../../View/ActionAddToCart';
import { PriceContainer } from '../../View/PriceContainer';
import { useTotalsContext } from '../../Context/Totals';
import { SquattomanCoverHeader } from './SquattomanCoverHeader';
import styles from './style.module.css';

export const SquattomanCoverSidebar = () => {
    const { total, totalWithoutDiscount } = useTotalsContext();
    const squattomanCoverHeaderRef = useRef(null);
    const scrollToReviews = useCallback(() => {
        const reviewsBlock = document.querySelector('[data-block-name="reviews"]');
        reviewsBlock.scrollIntoView({ behavior: 'smooth' });
    }, []);

    return (
        <div className={styles.sidebarWrapper}>
            <SquattomanCoverHeader ref={squattomanCoverHeaderRef} />
            <StepView />
            <div className={styles.summaryActions}>
                <QtyIncrementor show="both" label={t`Select Quantity to Add:`} />
                <div className={styles.actionsWrapper}>
                    <PriceContainer
                        total={total}
                        totalWithoutDiscount={totalWithoutDiscount}
                        showSubtotalPricingText={true}
                    />
                    <ActionAddToCart helperClass={styles.summaryAtc} />
                </div>
            </div>
            <FinancingContent helperClass={styles.financing} />
            <div className={styles.reviews}>
                <ReviewContentStars />
                <div className="total-reviews">
                    <button onClick={scrollToReviews}>{t`See All Reviews`}</button>
                </div>
            </div>
        </div>
    );
};

const StepView = () => {
    const { step } = useNavigatorContext();
    return <step.StepComponent />;
};
