/**
 * @package     BlueAcorn/Reviews
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useRef, useEffect } from 'preact/hooks';
import styles from './style.module.css';
import ReviewHeader from './Header';
import ReviewContent from './Content';
import ReviewFooter from './Footer';

export default function Review({
    id,
    title,
    rating,
    text,
    username,
    verifiedPurchaser,
    submissionTime,
    attributes,
    photos,
    feedback,
}) {
    const reviewId = `review-${id}`;
    const ref = useRef();

    useEffect(() => {
        if (ref.current && window.location.hash === `#${reviewId}`) {
            ref.current.scrollIntoView();
        }
    }, [reviewId, ref]);

    return (
        <div className={styles.review} ref={ref}>
            <ReviewHeader
                username={username}
                verifiedPurchaser={verifiedPurchaser}
                rating={rating}
                submissionTime={submissionTime}
            />
            <ReviewContent attributes={attributes} title={title} text={text} photos={photos} />
            <ReviewFooter id={id} title={title} photos={photos} text={text} feedback={feedback} />
        </div>
    );
}

Review.defaultProps = {
    id: 0,
    title: '',
    rating: 0,
    text: '',
    username: '',
    verifiedPurchaser: false,
    submissionTime: 1704128400,
    attributes: [],
    photos: [],
    feedback: { positive: 0, negative: 0 },
};
