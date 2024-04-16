/**
 * @package     BlueAcorn/Reviews
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { createContext } from 'preact';
import { useContext } from 'preact/hooks';
import { useReviewReducer } from './hooks/useReviewReducer';
import { useReviewQuery } from './hooks/useReviewQuery';

const ReviewStateContext = createContext();
const ReviewDispatchContext = createContext();
const ReviewQueryContext = createContext();

export default function ReviewProvider({ options, children }) {
    const [state, dispatch] = useReviewReducer(options);

    return (
        <ReviewDispatchContext.Provider value={dispatch}>
            <ReviewStateContext.Provider value={state}>
                <ReviewQueryProvider state={state}>{children}</ReviewQueryProvider>
            </ReviewStateContext.Provider>
        </ReviewDispatchContext.Provider>
    );
}

const ReviewQueryProvider = ({ state, children }) => {
    const value = useReviewQuery(state);

    return <ReviewQueryContext.Provider value={value}>{children}</ReviewQueryContext.Provider>;
};

export const useStateContext = () => useContext(ReviewStateContext);
export const useDispatchContext = () => useContext(ReviewDispatchContext);
export const useQueryContext = () => useContext(ReviewQueryContext);
