/**
 * @package     BlueAcorn/View
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useState } from 'preact/hooks';
import Pagination from '.';

const { defaultProps } = Pagination;

export default {
    title: 'View/Pagination',
    component: Pagination,
    tags: ['autodocs'],
    argTypes: {
        page: {
            description: 'current page',
            control: 'number',
            defaultValue: { summary: defaultProps.page },
        },
        first: {
            description: 'first page',
            control: 'number',
            defaultValue: { summary: defaultProps.first },
        },
        last: {
            description: 'last page',
            control: 'number',
            defaultValue: { summary: defaultProps.last },
        },
        siblings: {
            description: 'show N prev and N next pages, show N*2 if the current page is first or last',
            control: 'number',
            defaultValue: { summary: defaultProps.siblings },
        },
        dots: {
            description: 'dots icon',
            control: 'text',
            defaultValue: { summary: defaultProps.dots },
        },
        onChange: {
            action: 'onChange',
            description: 'page change callback',
        },
    },
    decorators: [
        (Story, { args }) => {
            const [page, setPage] = useState(args.first);
            return <Story args={{ ...args, page, onChange: setPage }} />;
        },
    ],
};

export const TenPages = <Pagination page={1} last={10} onChange={() => {}} />;
TenPages.args = TenPages.props;

export const TwoPages = <Pagination page={1} last={2} onChange={() => {}} />;
TwoPages.args = TwoPages.props;

export const OnePage = <Pagination page={1} last={1} onChange={() => {}} />;
OnePage.args = OnePage.props;
