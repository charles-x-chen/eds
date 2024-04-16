/**
 * @package     BlueAcorn/View
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import Price from '.';

const { defaultProps } = Price;

export default {
    title: 'View/Price',
    tags: ['autodocs'],
    component: Price,
    argTypes: {
        value: {
            control: 'number',
            description: 'price value',
            table: {
                defaultValue: { summary: defaultProps.value },
            },
        },
        currency: {
            control: 'inline-radio',
            options: ['USD', 'EUR', 'CAD'],
            description: 'price currency',
            table: {
                defaultValue: { summary: defaultProps.currency },
            },
        },
    },
};

export const Decimal = <Price value={12345.67} currency="USD" />;
Decimal.args = Decimal.props;

export const Round = <Price value={100} currency="EUR" />;
Round.args = Round.props;
