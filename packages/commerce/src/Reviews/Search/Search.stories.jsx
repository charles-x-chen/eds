/**
 * @package     BlueAcorn/Reviews
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import ReviewStory from '../Review/Review.stories';
import Search from '.';

export default {
    title: 'Components/Reviews/List/Search',
    component: Search,
    tags: ['autodocs'],
    decorators: ReviewStory.decorators,
};

export const Input = <Search />;
Input.args = Input.props;
