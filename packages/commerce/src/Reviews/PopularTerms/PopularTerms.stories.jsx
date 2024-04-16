/**
 * @package     BlueAcorn/Reviews
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import ReviewStory from '../Review/Review.stories';
import PopularTerms from '.';

export default {
    title: 'Components/Reviews/List/PopularTerms',
    component: PopularTerms,
    tags: ['autodocs'],
    decorators: ReviewStory.decorators,
};

export const Terms = <PopularTerms />;
Terms.args = Terms.props;
