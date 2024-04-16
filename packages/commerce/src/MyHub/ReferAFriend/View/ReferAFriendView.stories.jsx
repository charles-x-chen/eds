/**
 * @package     BlueAcorn/MyHub
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import ReferAFriendView from './ReferAFriendView';

export default {
    title: 'My Hub/Refer A Friend',
    component: ReferAFriendView,
};

export const Mock = (
    <ReferAFriendView
        customer={{
            email: 'igor.rain@blueacornici.com',
            firstname: 'Igor',
            lastname: 'Rain',
            refer: {
                partnerUserId: 441313,
                jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjdiMGVhZWZmLTU0OTktNGJhOC04NDc5LWI4MDk0YWY2NDA4MSJ9.eyJlbWFpbCI6Imlnb3IucmFpbkBibHVlYWNvcm5pY2kuY29tIiwicGFydG5lcl91c2VyX2lkIjoiNDQxMzEzIiwiZmlyc3RfbmFtZSI6Iklnb3IiLCJsYXN0X25hbWUiOiJSYWluIn0.lnhhWuLyD-xqCOL1nMEjjyNr5rE0tZKJxvnBkHvmKH0',
            },
        }}
    />
);
Mock.args = Mock.props;
Mock.parameters = {
    design: [
        {
            type: 'figma',
            name: 'Desktop',
            url: 'https://www.figma.com/file/YADYZ7dnLBTrtWKfuyBfao/BA---MYHUB?type=design&node-id=1201-26426',
        },
    ],
};
