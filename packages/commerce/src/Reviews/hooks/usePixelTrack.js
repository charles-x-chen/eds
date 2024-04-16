/**
 * @package     BlueAcorn/Reviews
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useEffect, useMemo } from 'preact/hooks';
import { useStateContext, useQueryContext } from '../ReviewContext';
import {
    TOGGLE_FILTER_VALUE,
    SET_SEARCH_TERM,
    SET_SORT,
    SET_CURRENT_PAGE,
    SET_REVIEW_FEEDBACK,
    SET_PRODUCT_TYPE,
    TOGGLE_TERM,
    INIT,
} from '../constants';

export const useTrackActions = () => {
    const { lastAction: action } = useStateContext();
    const pixel = usePixel();

    useEffect(() => {
        if (pixel) {
            trackAction(action, pixel);
        }
    }, [pixel, action]);
};

const usePixel = () => {
    const {
        options: { sku },
    } = useStateContext();
    const { data } = useQueryContext();
    const hasStats = !!data?.stats;
    return useMemo(() => {
        if (hasStats) {
            const { reviewCount, rating } = data?.stats || {};
            return {
                productId: sku,
                bvProduct: 'RatingsAndReviews',
                type: 'Product',
                brand: 'Lovesac',
                numReviews: reviewCount,
                avgRating: rating,
            };
        }
        return null;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sku, hasStats]);
};

const trackAction = async (action, data) => {
    const BVPixel = await waitForBV();
    if (BVPixel) {
        switch (action.type) {
            case INIT:
                BVPixel.trackPageView(data);
                BVPixel.trackInView(data, {
                    minPixels: 250,
                    containerId: 'ba-reviews',
                });
                BVPixel.trackViewedCGC(data, {
                    minPixels: 250,
                    minTime: 2500,
                    containerId: 'ba-reviews',
                });
                break;
            case SET_SORT:
                BVPixel.trackEvent('Feature', {
                    ...data,
                    type: 'Used',
                    name: 'sort',
                    detail1: `${action.value.field}-${action.value.order}`,
                    detail2: '',
                });
                break;
            case TOGGLE_FILTER_VALUE:
                BVPixel.trackEvent('Feature', {
                    ...data,
                    type: 'Used',
                    name: 'filter',
                    detail1: action.field,
                    detail2: action.value,
                });
                break;
            case SET_PRODUCT_TYPE:
                BVPixel.trackEvent('Feature', {
                    ...data,
                    type: 'Used',
                    name: 'filter',
                    detail1: 'ProductId',
                    detail2: action.value,
                });
                break;
            case TOGGLE_TERM:
                BVPixel.trackEvent('Feature', {
                    ...data,
                    type: 'Used',
                    name: 'filter',
                    detail1: 'PopularTerm',
                    detail2: action.value,
                });
                break;
            case SET_CURRENT_PAGE:
                BVPixel.trackEvent('Feature', {
                    ...data,
                    type: 'Used',
                    name: 'paginate',
                    detail1: '',
                    detail2: `${action.value}`,
                });
                break;
            case SET_REVIEW_FEEDBACK:
                BVPixel.trackEvent('Feature', {
                    ...data,
                    type: 'Used',
                    name: 'helpfulness',
                    detail1: action.value ? 'positive' : 'negative',
                    detail2: '',
                });
                break;
            case SET_SEARCH_TERM:
                BVPixel.trackEvent('Feature', {
                    ...data,
                    type: 'Used',
                    name: 'search',
                    detail1: action.value,
                    detail2: '',
                });
                break;
        }
    }
};

const trackReviews = async (reviews, data) => {
    const BVPixel = await waitForBV();
    if (BVPixel) {
        for (const review of reviews) {
            BVPixel.trackImpression({
                ...data,
                contentId: review.id,
                contentType: 'review',
            });
        }
    }
};

export const useTrackReviews = () => {
    const pixel = usePixel();
    const {
        data: { reviews },
    } = useQueryContext();

    useEffect(() => {
        if (pixel) {
            trackReviews(reviews, pixel);
        }
    }, [pixel, reviews]);
};

const waitForBV = async () => {
    if (!window.dataLayer) {
        return false;
    }
    if (!window.BV) {
        await new Promise((resolve) => setTimeout(resolve, 250));
    }
    if (window.BV) {
        return window.BV?.pixel;
    }
    return await waitForBV();
};
