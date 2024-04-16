/**
 * @package     BlueAcorn/Reviews
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import ReviewStory from '../Review/Review.stories';
import Stats from '.';

const { defaultProps } = Stats;

export default {
    title: 'Components/Reviews/List/Stats',
    component: Stats,
    tags: ['autodocs'],
    argTypes: {
        rating: {
            description: 'rating value (from 0 to 5)',
            control: { type: 'number', min: 0, max: 5, step: 0.01 },
            defaultValue: { summary: defaultProps.rating },
        },
        reviewCount: {
            description: 'total review qty',
            control: 'number',
            defaultValue: { summary: defaultProps.reviewCount },
        },
    },
    decorators: ReviewStory.decorators,
};

export const Overall = <Stats rating={4.37} reviewCount={5670} />;
Overall.args = Overall.props;
