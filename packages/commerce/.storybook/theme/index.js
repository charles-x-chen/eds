import { create } from '@storybook/theming/create';
import brandImage from './logo.svg';

export default create({
    base: 'dark',
    brandTitle: 'LoveSac',
    brandUrl: 'https://www.lovesac.com/',
    brandImage,
    brandTarget: '_self',
    colorPrimary: '#00808c',
    colorSecondary: '#56585a',
    textColor: '#f5f5f5',
});
