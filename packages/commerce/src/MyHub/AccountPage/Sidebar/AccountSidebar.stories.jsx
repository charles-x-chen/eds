/**
 * @package     BlueAcorn/MyHub
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useState, useCallback } from 'preact/hooks';
import AccountSidebar from '.';

export default {
    title: 'My Hub/Page/Sidebar',
    component: AccountSidebar,
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
    },
    decorators: [
        (Story, { args }) => {
            const [type, setType] = useState(args.type);
            const onClick = useCallback((event) => {
                if (event.target?.tagName === 'A') {
                    event.preventDefault();
                    setType(event.target.dataset.key);
                }
            }, []);

            return (
                <div onClick={onClick} role="presentation">
                    <Story args={{ ...args, type }} />
                </div>
            );
        },
    ],
};

export const Sidebar = <AccountSidebar type="myorders" />;
Sidebar.args = Sidebar.props;
Sidebar.parameters = {
    design: [
        {
            type: 'figma',
            name: 'Desktop',
            url: 'https://www.figma.com/file/YADYZ7dnLBTrtWKfuyBfao/BA---MYHUB?type=design&node-id=807-40384',
        },
        {
            type: 'figma',
            name: 'Mobile',
            url: 'https://www.figma.com/file/YADYZ7dnLBTrtWKfuyBfao/BA---MYHUB?type=design&node-id=1929-26784',
        },
    ],
};
