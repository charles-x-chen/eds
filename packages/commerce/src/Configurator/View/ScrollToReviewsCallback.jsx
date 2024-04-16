/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useCallback } from 'preact/hooks';
import mobileSignal from '~/Api/Mobile';

export const useScrollToReviewsCallback = (headerRef) => {
    const isMobile = mobileSignal.value;

    return useCallback(() => {
        const reviewsContainer = document.querySelector('.configurator-review-widget');
        if (reviewsContainer && headerRef.current) {
            const reviewsOffsetTop = reviewsContainer.offsetTop;
            const reviewsMarginTop = parseInt(
                window.getComputedStyle(reviewsContainer).getPropertyValue('margin-top'),
                10,
            );
            const headerBottom = isMobile ? headerRef.current.getBoundingClientRect().bottom : 0;
            const scrollPosition = reviewsOffsetTop - reviewsMarginTop - headerBottom;
            window.scroll(0, scrollPosition);
        }
    }, [headerRef, isMobile]);
};
