/**
 * @package     BlueAcorn/View
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import StarRating from '.';

export default {
    title: 'View/Star Rating',
    tags: ['autodocs'],
    component: StarRating,
    argTypes: {
        rating: { description: 'rating value (from 0 to 5)', control: { type: 'number', min: 0, max: 5, step: 0.1 } },
    },
};

export const Rating = <StarRating rating={3.5} />;
Rating.args = Rating.props;
