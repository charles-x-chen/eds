/**
 * @package     BlueAcorn/View
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import Gallery from '.';

const { defaultProps } = Gallery;

const childrenMapping = {};

export default {
    title: 'View/Gallery',
    component: Gallery,
    tags: ['autodocs'],
    argTypes: {
        children: {
            control: false,
            description: 'gallery items',
            mapping: childrenMapping,
        },
        activeIndex: {
            description: 'set current slide',
            control: 'number',
            defaultValue: { summary: defaultProps.activeIndex },
        },
        responsive: {
            description: 'responsive breakpoints',
            control: 'object',
            defaultValue: { summary: '{0:{items:1}}' },
        },
        showDots: {
            description: 'show dot navigation',
            control: 'boolean',
            defaultValue: { summary: defaultProps.showDots },
        },
        showArrows: {
            description: 'show arrow navigation',
            control: 'boolean',
            defaultValue: { summary: defaultProps.showArrows },
        },
        keyboardNavigation: {
            description: 'allow keyboard navigation (arrow left and arrow right)',
            control: 'boolean',
            defaultValue: { summary: defaultProps.keyboardNavigation },
        },
        swipeable: {
            description: 'allow swiping on touch devices',
            control: 'boolean',
            defaultValue: { summary: defaultProps.swipeable },
        },
        variant: {
            description: 'gallery style variant',
            control: 'select',
            options: ['standard', 'classic'],
            defaultValue: { summary: defaultProps.variant },
        },
    },
};

export const Standard = (
    <Gallery
        responsive={{
            0: { items: 1 },
            768: { items: 3 },
        }}
    >
        <img src="https://picsum.photos/id/25/5000/3333" alt="Test 1" key={1} />
        <img src="https://picsum.photos/id/16/2500/1667" alt="Test 2" key={2} />
        <img src="https://picsum.photos/id/14/2500/1667" alt="Test 3" key={3} />
        <img src="https://picsum.photos/id/29/4000/2670" alt="Test 4" key={4} />
        <img src="https://picsum.photos/id/39/3456/2304" alt="Test 5" key={5} />
        <img src="https://picsum.photos/id/41/1280/805" alt="Test 6" key={6} />
        <img src="https://picsum.photos/id/58/1280/853" alt="Test 7" key={7} />
    </Gallery>
);
childrenMapping.Standard = Standard.props.children;
Standard.args = {
    ...Standard.props,
    children: 'Standard',
};

export const Classic = (
    <Gallery
        variant="classic"
        responsive={{
            0: { items: 1 },
            768: { items: 3 },
        }}
    >
        <img src="https://picsum.photos/id/25/5000/3333" alt="Test 1" key={1} />
        <img src="https://picsum.photos/id/16/2500/1667" alt="Test 2" key={2} />
        <img src="https://picsum.photos/id/14/2500/1667" alt="Test 3" key={3} />
        <img src="https://picsum.photos/id/29/4000/2670" alt="Test 4" key={4} />
        <img src="https://picsum.photos/id/39/3456/2304" alt="Test 5" key={5} />
        <img src="https://picsum.photos/id/41/1280/805" alt="Test 6" key={6} />
        <img src="https://picsum.photos/id/58/1280/853" alt="Test 7" key={7} />
    </Gallery>
);
childrenMapping.Classic = Classic.props.children;
Classic.args = {
    ...Classic.props,
    children: 'Classic',
};

export const Simple = (
    <Gallery>
        <img src="https://picsum.photos/id/25/5000/3333" alt="Test 1" key={1} />
        <img src="https://picsum.photos/id/16/2500/1667" alt="Test 2" key={2} />
        <img src="https://picsum.photos/id/14/2500/1667" alt="Test 3" key={3} />
        <img src="https://picsum.photos/id/29/4000/2670" alt="Test 4" key={4} />
        <img src="https://picsum.photos/id/39/3456/2304" alt="Test 5" key={5} />
        <img src="https://picsum.photos/id/41/1280/805" alt="Test 6" key={6} />
        <img src="https://picsum.photos/id/58/1280/853" alt="Test 7" key={7} />
    </Gallery>
);
childrenMapping.Simple = Simple.props.children;
Simple.args = {
    ...Simple.props,
    children: 'Simple',
};

export const ResponsiveDecimal = (
    <Gallery
        responsive={{
            0: { items: 1.2 },
            500: { items: 3.2 },
        }}
    >
        <img src="https://picsum.photos/id/25/5000/3333" alt="Test 1" key={1} />
        <img src="https://picsum.photos/id/16/2500/1667" alt="Test 2" key={2} />
        <img src="https://picsum.photos/id/14/2500/1667" alt="Test 3" key={3} />
        <img src="https://picsum.photos/id/29/4000/2670" alt="Test 4" key={4} />
        <img src="https://picsum.photos/id/39/3456/2304" alt="Test 5" key={5} />
        <img src="https://picsum.photos/id/41/1280/805" alt="Test 6" key={6} />
        <img src="https://picsum.photos/id/58/1280/853" alt="Test 7" key={7} />
    </Gallery>
);
childrenMapping.ResponsiveDecimal = ResponsiveDecimal.props.children;
ResponsiveDecimal.args = {
    ...ResponsiveDecimal.props,
    children: 'ResponsiveDecimal',
};

export const NoControl = (
    <Gallery showDots={false} showArrows={false} keyboardNavigation={false} swipeable={false}>
        <img src="https://picsum.photos/id/25/5000/3333" alt="Test 1" key={1} />
        <img src="https://picsum.photos/id/16/2500/1667" alt="Test 2" key={2} />
        <img src="https://picsum.photos/id/14/2500/1667" alt="Test 3" key={3} />
        <img src="https://picsum.photos/id/29/4000/2670" alt="Test 4" key={4} />
        <img src="https://picsum.photos/id/39/3456/2304" alt="Test 5" key={5} />
        <img src="https://picsum.photos/id/41/1280/805" alt="Test 6" key={6} />
        <img src="https://picsum.photos/id/58/1280/853" alt="Test 7" key={7} />
    </Gallery>
);
childrenMapping.NoControl = NoControl.props.children;
NoControl.args = {
    ...NoControl.props,
    children: 'NoControl',
};
