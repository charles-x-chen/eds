/**
 * @package     BlueAcorn/View
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import ErrorBox from '.';

const childrenMapping = {};

export default {
    title: 'View/Error Box',
    tags: ['autodocs'],
    component: ErrorBox,
    argTypes: {
        children: {
            control: false,
            description: 'error box items',
            mapping: childrenMapping,
        },
    },
};

function ComponentWithError() {
    throw new Error('Critical error');
}

export const Default = (
    <ErrorBox>
        <ComponentWithError />
    </ErrorBox>
);

childrenMapping.Default = Default.props.children;
Default.args = {
    ...Default.props,
    children: 'Default',
};
