/**
 * @package     BlueAcorn/Reviews
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import ReviewProvider from '../ReviewContext';
import Review from '.';

const { defaultProps } = Review;

export default {
    title: 'Components/Reviews/List/Review',
    component: Review,
    tags: ['autodocs'],
    argTypes: {
        id: { description: 'review ID', control: 'number', defaultValue: { summary: defaultProps.id } },
        rating: {
            description: 'rating value (from 0 to 5)',
            control: { type: 'number', min: 0, max: 5, step: 0.1 },
            defaultValue: { summary: defaultProps.rating },
        },
        title: { description: 'review title', control: 'text' },
        text: { description: 'review text', control: 'text' },
        username: { description: 'review username', control: 'text' },
        verifiedPurchaser: {
            description: 'is purchaser verified',
            control: 'boolean',
            defaultValue: { summary: defaultProps.verifiedPurchaser },
        },
        submissionTime: { description: 'submission date timestamp', control: 'number' },
        attributes: {
            description: 'review attributes',
            control: 'object',
            defaultValue: { summary: JSON.stringify(defaultProps.photos) },
        },
        photos: {
            description: 'review photos',
            control: 'object',
            defaultValue: { summary: JSON.stringify(defaultProps.photos) },
        },
        feedback: {
            description: 'review feedback',
            control: 'object',
            defaultValue: { summary: JSON.stringify(defaultProps.feedback) },
        },
    },
    parameters: {
        docs: {
            story: {
                inline: false,
                height: 650,
            },
        },
    },
    decorators: [
        (Story) => (
            <ReviewProvider options={{ test: true }}>
                <Story />
            </ReviewProvider>
        ),
    ],
};

export const Individual = (
    <Review
        id={46968881}
        rating={4}
        username="Test User"
        verifiedPurchaser={true}
        submissionTime={1693464858}
        title="Sactionals"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lacinia elit eget erat pellentesque, id imperdiet purus semper. Duis vitae erat iaculis, dictum erat sit amet, venenatis est. Cras placerat arcu urna, et aliquam eros vulputate at. Curabitur nunc velit, placerat nec diam efficitur, congue consequat velit. Duis non volutpat sem. Etiam et cursus nisl. Nunc ut tincidunt neque, sed auctor sem. Nullam vitae tempor ipsum. Nunc libero massa, mattis quis iaculis ac, varius vitae nisi. Curabitur vel mi sed risus ultricies facilisis sed eget sem. Vivamus lorem lacus, varius eget urna ut, condimentum consequat orci. Vestibulum at urna quis ex pharetra auctor. Donec varius vestibulum magna, id posuere velit finibus id. Etiam ac gravida velit, ac finibus mi. Sed et convallis nisl. Cras feugiat odio quam, eu dapibus velit accumsan nec."
        attributes={[
            {
                label: 'Fill',
                valueLabel: 'Lovesoft',
            },
            {
                label: 'Room Size',
                valueLabel: 'Small Space',
            },
            {
                label: 'Fabric',
                valueLabel: 'Vintage Corded Velvet',
            },
            {
                label: 'Features',
                valueLabel: 'Durability, Washability',
            },
        ]}
        photos={[
            {
                label: 'Photo 1',
                thumbnail: 'https://picsum.photos/id/95/367/267',
                large: 'https://picsum.photos/id/95/2048/2048',
            },
            {
                label: 'Photo 2',
                thumbnail: 'https://picsum.photos/id/102/367/267',
                large: 'https://picsum.photos/id/102/4320/3240',
            },
        ]}
        feedback={{
            positive: 50,
            negative: 3,
        }}
    />
);
Individual.args = Individual.props;
