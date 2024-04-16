/**
 * @package     BlueAcorn/Reviews
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import ReviewStory from '../Review/Review.stories';
import SortBy from '.';

export default {
    title: 'Components/Reviews/List/SortBy',
    component: SortBy,
    tags: ['autodocs'],
    decorators: ReviewStory.decorators,
};

export const Sorting = <SortBy />;
Sorting.args = Sorting.props;
