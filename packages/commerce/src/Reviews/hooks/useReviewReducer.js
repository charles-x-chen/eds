/**
 * @package     BlueAcorn/Reviews
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useReducer } from 'preact/hooks';
import {
    SET_PRODUCT_TYPE,
    TOGGLE_FILTER_VALUE,
    SET_SEARCH_TERM,
    SET_SORT,
    SET_CURRENT_PAGE,
    RESET_FILTERS,
    TOGGLE_TERM,
    SET_REVIEW_FEEDBACK,
    INIT,
} from '../constants';

const defaultSort = {
    field: 'relevant',
    order: 'DESC',
};

const initialState = {
    productType: 0,
    filters: [],
    popularTerms: [],
    searchTerm: '',
    sort: defaultSort,
    currentPage: 1,
    lastAction: { type: INIT },
};

const reviewReducer = (state, action) => {
    switch (action.type) {
        case SET_PRODUCT_TYPE:
            return { ...state, productType: action.value, lastAction: action };
        case TOGGLE_FILTER_VALUE: {
            const { field, value } = action;
            const currentValues = state.filters[field] || [];
            const newValues = currentValues.includes(value)
                ? currentValues.filter((v) => v !== value)
                : [...currentValues, value];
            return { ...state, filters: { ...state.filters, [field]: newValues }, lastAction: action };
        }
        case TOGGLE_TERM: {
            const { value } = action;
            const currentTerms = state.popularTerms || [];
            const newTerms = currentTerms.includes(value)
                ? currentTerms.filter((t) => t !== value)
                : [...currentTerms, value];
            return { ...state, popularTerms: newTerms, lastAction: action };
        }
        case SET_SEARCH_TERM: {
            if (state.searchTerm === action.value) {
                return state;
            }
            return { ...state, searchTerm: action.value, lastAction: action };
        }
        case SET_SORT:
            return { ...state, sort: action.value, lastAction: action };
        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.value, lastAction: action };
        case RESET_FILTERS:
            return { ...state, productType: null, filters: [], lastAction: action };
        case SET_REVIEW_FEEDBACK:
            return { ...state, lastAction: action };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

const init = (options) => {
    return {
        ...initialState,
        options,
    };
};

export const useReviewReducer = (options) => useReducer(reviewReducer, options, init);
