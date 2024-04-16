/**
 * @package     BlueAcorn/MyHub
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import AccountSidebarStory, { Sidebar } from './Sidebar/AccountSidebar.stories';
import AccountPage from '.';

const childrenMapping = {};

export default {
    title: 'My Hub/Page',
    component: AccountPage,
    tags: ['autodocs'],
    argTypes: {
        type: {
            description: 'current page type',
            control: 'select',
            options: [
                'dashboard',
                'myorders',
                'wishlist',
                'addressbook',
                'accountinformation',
                'paymentmethods',
                'giftcard',
                'configurations',
                'refer',
            ],
        },
        title: {
            description: 'page title',
            control: 'text',
        },
        queryArgs: {
            description: 'graphql query props (response will be provided to children as data prop)',
        },
        children: {
            control: false,
            description: 'page content',
            mapping: childrenMapping,
        },
    },
    decorators: AccountSidebarStory.decorators,
};

export const Page = (
    <AccountPage type="myorders" title="Order History">
        <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lacinia elit eget erat pellentesque, id
            imperdiet purus semper.
        </div>
    </AccountPage>
);
childrenMapping.Page = Page.props.children;
Page.args = {
    ...Page.props,
    children: 'Page',
};
Page.parameters = {
    design: Sidebar.parameters.design,
};
