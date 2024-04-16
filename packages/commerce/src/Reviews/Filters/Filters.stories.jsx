/**
 * @package     BlueAcorn/Reviews
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import ReviewStory from '../Review/Review.stories';
import Filters from '.';

export default {
    title: 'Components/Reviews/List/Filters',
    component: Filters,
    tags: ['autodocs'],
    decorators: ReviewStory.decorators,
};

export const Filter = <Filters />;
Filter.args = Filter.props;
