/**
 * @package     BlueAcorn/Reviews
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { useCallback } from 'preact/hooks';
import ReviewProvider, { useDispatchContext, useQueryContext, useStateContext } from './ReviewContext';
import Filters from './Filters';
import Search from './Search';
import Stats from './Stats';
import ReviewList from './ReviewList';
import PopularTerms from './PopularTerms';
import Pixel from './Pixel';
import SubmitModal from './Submit/Modal';
import styles from './style.module.css';
import WriteReviewButton from './Submit/WriteReviewButton';
import { SET_CURRENT_PAGE } from './constants';
import Pagination from '~/View/Pagination';

export default function Reviews(props) {
    return (
        <ReviewProvider options={props}>
            <SubmitModal>
                <Pixel />
                <ReviewsLoaded />
            </SubmitModal>
        </ReviewProvider>
    );
}

function ReviewsLoaded() {
    const {
        data: { reviews, totalCount = 0, stats = {} },
    } = useQueryContext();
    const { currentPage, pageSize = 10 } = useStateContext();
    const dispatch = useDispatchContext();

    const onPageChange = useCallback(
        (value) => {
            dispatch({ type: SET_CURRENT_PAGE, value });
        },
        [dispatch],
    );

    return (
        <div className={styles.reviews}>
            <div className={styles.header}>
                <div>
                    <div className={styles.title}>{t`Customer Reviews`}</div>
                    <Stats {...stats} />
                </div>
                <div>
                    <WriteReviewButton />
                    <Search />
                </div>
            </div>
            <Filters />
            <PopularTerms />
            <ReviewList reviews={reviews} totalCount={totalCount} />
            <Pagination
                page={currentPage}
                siblings={1}
                last={Math.ceil(totalCount / pageSize)}
                onChange={onPageChange}
            />
        </div>
    );
}

Reviews.defaultProps = {
    sku: '',
    productFilter: false,
    excludeFamily: false,
    pixel: {},
    productTypes: {
        GT4400: 'Sactionals',
        EE0362: 'Sactionals with StealthTech',
        BU5807: 'Sacs',
        BQ3306: 'Accessories',
    },
};
