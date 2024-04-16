/**
 * @package     BlueAcorn/Reviews
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import ReviewStory, { Individual } from '../Review/Review.stories';
import ReviewList from '.';

const { defaultProps } = ReviewList;

export default {
    title: 'Components/Reviews/List/ReviewList',
    component: ReviewList,
    tags: ['autodocs'],
    argTypes: {
        reviews: {
            description: 'array of reviews',
            control: 'object',
            defaultValue: { summary: JSON.stringify(defaultProps.reviews) },
        },
        totalCount: {
            description: 'total amount of reviews',
            control: 'number',
            defaultValue: { summary: defaultProps.totalCount },
        },
    },
    decorators: ReviewStory.decorators,
};

const reviews = [
    {
        ...Individual.args,
    },
    {
        ...Individual.args,
        id: 1,
        rating: 3,
        title: 'Mauris facilisis',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        username: 'Adam',
        verifiedPurchaser: false,
        photos: [],
        feedback: { positive: 0, negative: 0 },
    },
    {
        ...Individual.args,
        id: 2,
        rating: 1,
        title: 'Nunc egestas',
        text: 'Maecenas ut quam dapibus, commodo ligula ut, viverra augue.',
        username: 'Karl',
        attributes: [],
        feedback: { positive: 5, negative: 20 },
    },
];

export const MultipleReviews = <ReviewList reviews={reviews} totalCount={1234} />;
MultipleReviews.args = MultipleReviews.props;
