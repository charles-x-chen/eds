/**
 * @package     BlueAcorn/Reviews
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import styles from './style.module.css';
import ReviewFeedback from './Feedback';
import ShareReview from './Share';

export default function ReviewFooter({ id, title, photos, text, feedback }) {
    return (
        <div className={styles.actions}>
            <ShareReview id={`review-${id}`} title={title} photos={photos} text={text} />
            <ReviewFeedback id={id} feedback={feedback} />
        </div>
    );
}
