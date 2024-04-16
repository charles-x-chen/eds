/**
 * @package     BlueAcorn/Reviews
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import AddToCart from './AddToCart';

const { defaultProps } = AddToCart;

export default {
    title: 'Components/Catalog/Add To Cart',
    component: AddToCart,
    tags: ['autodocs'],
    argTypes: {
        sku: {
            control: { type: 'text' },
            description: 'product SKU',
        },
        qty: {
            control: { type: 'number' },
            description: 'product qty',
            table: {
                defaultValue: { summary: defaultProps.qty },
            },
        },
        btnLabel: {
            control: { type: 'text' },
            description: 'button label',
            table: {
                defaultValue: { summary: defaultProps.btnLabel },
            },
        },
        redirect: {
            control: { type: 'boolean' },
            description: 'redirect to the cart page',
            table: {
                defaultValue: { summary: defaultProps.redirect },
            },
        },
    },
};

export const Button = <AddToCart sku="UM5840" qty={1} btnLabel="Add to Cart" redirect={true} />;
Button.args = Button.props;
