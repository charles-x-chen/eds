/**
 * @package     BlueAcorn/StoreLocator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import Showroom from '.';

const { defaultProps } = Showroom;

export default {
    title: 'Components/StoreLocator/Showroom',
    component: Showroom,
    tags: ['autodocs'],
    argTypes: {
        latitude: {
            control: { type: 'text' },
            description: 'Latitude',
            table: {
                defaultValue: { summary: defaultProps.latitude },
            },
        },
        longitude: {
            control: { type: 'text' },
            description: 'Longitude',
            table: {
                defaultValue: { summary: defaultProps.longitude },
            },
        },
    },
};

export const ShowroomName = <Showroom latitude={defaultProps.latitude} longitude={defaultProps.longitude} />;
ShowroomName.args = ShowroomName.props;
