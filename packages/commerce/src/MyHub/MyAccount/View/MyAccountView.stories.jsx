/**
 * @package     BlueAcorn/MyHub
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import MyAccountView from './MyAccountView';

export default {
    title: 'My Hub / My Account',
    component: MyAccountView,
};

export const Mock = {
    args: {
        customer: {
            email: 'igor.rain@blueacornici.com',
            firstname: 'Igor',
            lastname: 'Rain',
            refer: {
                partnerUserId: 441313,
                jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjdiMGVhZWZmLTU0OTktNGJhOC04NDc5LWI4MDk0YWY2NDA4MSJ9.eyJlbWFpbCI6Imlnb3IucmFpbkBibHVlYWNvcm5pY2kuY29tIiwicGFydG5lcl91c2VyX2lkIjoiNDQxMzEzIiwiZmlyc3RfbmFtZSI6Iklnb3IiLCJsYXN0X25hbWUiOiJSYWluIn0.lnhhWuLyD-xqCOL1nMEjjyNr5rE0tZKJxvnBkHvmKH0',
                __typename: 'ReferFriend',
            },
            orders: {
                items: [
                    {
                        id: 'MTIwMTY0NQ==',
                        orderDate: '2023-11-30 14:07:21',
                        number: '090003148',
                        status: 'Processing',
                        items: [
                            {
                                productName: 'BigOne Insert',
                                __typename: 'OrderItem',
                            },
                            {
                                productName: 'BigOne Cover: Charcoal Wombat Phur',
                                __typename: 'OrderItem',
                            },
                        ],
                        total: {
                            grandTotal: {
                                currency: 'USD',
                                value: 1273.4,
                                __typename: 'Money',
                            },
                            __typename: 'OrderTotal',
                        },
                        __typename: 'CustomerOrder',
                    },
                    {
                        id: 'MTIwMTY0Mg==',
                        orderDate: '2023-11-30 14:05:04',
                        number: '090003145',
                        status: 'Processing',
                        items: [
                            {
                                productName: 'Storage Seat Cover Set: Sapphire Navy Corded Velvet',
                                __typename: 'OrderItem',
                            },
                            {
                                productName: 'Sactionals Storage Seat Insert Set: Lovesoft',
                                __typename: 'OrderItem',
                            },
                            {
                                productName: 'Angled Side Cover: Sapphire Navy Corded Velvet',
                                __typename: 'OrderItem',
                            },
                            {
                                productName: 'Sactionals Angled Side Insert: Standard',
                                __typename: 'OrderItem',
                            },
                            {
                                productName: 'Angled Side Pillow Cover: Sapphire Navy Corded Velvet',
                                __typename: 'OrderItem',
                            },
                            {
                                productName: 'Sactionals StealthTech Sound + Charge Angled Side Pillow Insert',
                                __typename: 'OrderItem',
                            },
                            {
                                productName: 'Seat Cover Set: Sapphire Navy Corded Velvet',
                                __typename: 'OrderItem',
                            },
                            {
                                productName: 'Sactionals Seat Insert Set: Lovesoft',
                                __typename: 'OrderItem',
                            },
                            {
                                productName: 'Sactionals StealthTech Sound + Charge Angled Side Insert: R',
                                __typename: 'OrderItem',
                            },
                            {
                                productName: 'Sactionals StealthTech Sound + Charge Angled Side Insert: L',
                                __typename: 'OrderItem',
                            },
                            {
                                productName: 'Sactionals StealthTech Sound + Charge Angled Satellite Side Insert',
                                __typename: 'OrderItem',
                            },
                            {
                                productName: 'Sactionals StealthTech Sound + Charge Center Channel',
                                __typename: 'OrderItem',
                            },
                            {
                                productName: 'Sactionals StealthTech Sound + Charge Subwoofer',
                                __typename: 'OrderItem',
                            },
                            {
                                productName: 'Sactionals StealthTech Power Hub',
                                __typename: 'OrderItem',
                            },
                            {
                                productName: 'Sactionals StealthTech Power Hub',
                                __typename: 'OrderItem',
                            },
                            {
                                productName: 'Sactionals Angled Side Coaster: Dark Walnut',
                                __typename: 'OrderItem',
                            },
                        ],
                        total: {
                            grandTotal: {
                                currency: 'USD',
                                value: 13446.1,
                                __typename: 'Money',
                            },
                            __typename: 'OrderTotal',
                        },
                        __typename: 'CustomerOrder',
                    },
                ],
                __typename: 'CustomerOrders',
            },
            __typename: 'Customer',
        },
        blocks: {
            quickLinks: {
                identifier: 'my-account-quick-links',
                title: 'My Account - Quick Links',
                content:
                    '<style>#html-body [data-pb-style=IADOJTM], #html-body [data-pb-style=Y9PN5H6] {\n    background-position: left top;\n    background-size: cover;\n    background-repeat: no-repeat;\n    background-attachment: scroll\n}\n\n#html-body [data-pb-style=IADOJTM] {\n    justify-content: flex-start;\n    display: flex;\n    flex-direction: column;\n    margin: 0;\n    padding: 0\n}\n\n#html-body [data-pb-style=Y9PN5H6] {\n    align-self: stretch\n}\n\n#html-body [data-pb-style=CT7P7AJ] {\n    display: flex;\n    width: 100%\n}\n\n#html-body [data-pb-style=GBGGFKX], #html-body [data-pb-style=JYEL6IL] {\n    justify-content: flex-start;\n    display: flex;\n    flex-direction: column;\n    background-position: left top;\n    background-size: cover;\n    background-repeat: no-repeat;\n    background-attachment: scroll;\n    width: 50%;\n    margin: 0;\n    padding: 0;\n    align-self: stretch\n}</style>\n<div data-content-type="row" data-appearance="contained" data-element="main">\n    <div data-enable-parallax="0" data-parallax-speed="0.5" data-background-images="{}" data-background-type="image"\n         data-video-loop="true" data-video-play-only-visible="true" data-video-lazy-load="true"\n         data-video-fallback-src="" data-element="inner" data-pb-style="IADOJTM">\n        <div data-content-type="text" data-appearance="default" data-element="main"><p>Quick Links</p></div>\n        <div class="pagebuilder-column-group" data-background-images="{}" data-content-type="column-group"\n             data-appearance="default" data-grid-size="12" data-element="main" data-pb-style="Y9PN5H6">\n            <div class="pagebuilder-column-line" data-content-type="column-line" data-element="main"\n                 data-pb-style="CT7P7AJ">\n                <div class="pagebuilder-column" data-content-type="column" data-appearance="full-height"\n                     data-background-images="{}" data-element="main" data-pb-style="GBGGFKX">\n                    <div data-content-type="text" data-appearance="default" data-element="main"><p><a\n                        title="Sactionals Configuration Guides" href="#">Sactionals Configuration Guides</a></p></div>\n                    <div data-content-type="text" data-appearance="default" data-element="main"><p><a tabindex="0"\n                                                                                                      title="Cleaning Instructions"\n                                                                                                      href="https://s7d4.scene7.com/is/content/LovesacRender/How-To%20PDFs/Setting-up-Your-Sactionals.pdf">Cleaning\n                        Instructions</a></p></div>\n                    <div data-content-type="text" data-appearance="default" data-element="main"><p><a tabindex="0"\n                                                                                                      title="Covering a Seat + Side"\n                                                                                                      href="https://s7d4.scene7.com/is/content/LovesacRender/How-To%20PDFs/Setting-up-Your-Sactionals.pdf">Covering\n                        a Seat + Side</a></p></div>\n                    <div data-content-type="text" data-appearance="default" data-element="main"><p><a tabindex="0"\n                                                                                                      title="Installing a Power Hub"\n                                                                                                      href="https://s7d4.scene7.com/is/content/LovesacRender/How-To%20PDFs/Setting-up-Your-Sactionals.pdf">Installing\n                        a Power Hub</a></p></div>\n                </div>\n                <div class="pagebuilder-column" data-content-type="column" data-appearance="full-height"\n                     data-background-images="{}" data-element="main" data-pb-style="JYEL6IL">\n                    <div data-content-type="text" data-appearance="default" data-element="main"><p><a tabindex="0"\n                                                                                                      title="Roll Arm Setup Guide"\n                                                                                                      href="https://s7d4.scene7.com/is/content/LovesacRender/How-To%20PDFs/Setting-up-Your-Sactionals.pdf">Roll Arm\n                        Setup Guide</a></p></div>\n                    <div data-content-type="text" data-appearance="default" data-element="main"><p><a tabindex="0"\n                                                                                                      title="Setting Up Your Storage Seat"\n                                                                                                      href="https://s7d4.scene7.com/is/content/LovesacRender/How-To%20PDFs/Setting-up-Your-Sactionals.pdf">Setting\n                        Up Your Storage Seat</a></p></div>\n                    <div data-content-type="text" data-appearance="default" data-element="main"><p><a tabindex="0"\n                                                                                                      title="Setting Up Your Wedge Seat"\n                                                                                                      href="https://s7d4.scene7.com/is/content/LovesacRender/How-To%20PDFs/Setting-up-Your-Sactionals.pdf">Setting\n                        Up Your Wedge Seat</a></p></div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n',
                __typename: 'CmsBlock',
            },
            sactionalsHelp: {
                identifier: 'my-account-sactionals-help',
                title: 'My Account - Sactional Help',
                content:
                    '<style>#html-body [data-pb-style=PM3CGOT] {\n    justify-content: flex-start;\n    display: flex;\n    flex-direction: column;\n    background-position: left top;\n    background-size: cover;\n    background-repeat: no-repeat;\n    background-attachment: scroll;\n    margin: 0;\n    padding: 0\n}</style>\n<div data-content-type="row" data-appearance="contained" data-element="main">\n    <div data-enable-parallax="0" data-parallax-speed="0.5" data-background-images="{}" data-background-type="image"\n         data-video-loop="true" data-video-play-only-visible="true" data-video-lazy-load="true"\n         data-video-fallback-src="" data-element="inner" data-pb-style="PM3CGOT">\n        <div data-content-type="text" data-appearance="default" data-element="main"><h3>Sactionals Help <a\n            title="View All" href="/sactional.html">View All</a></h3></div>\n        <div class="content-slider" data-content-type="content-slider" data-appearance="default" data-slide-count="4"\n             data-mobile-slide-count="1" data-autoplay="false" data-autoplay-speed="4000" data-infinite-loop="false"\n             data-show-arrows="true" data-show-dots="true" data-adaptive-height="false" data-navigation-style="dots"\n             data-navigation-position="after" data-add-navigation-borders="false" data-arrows-outside="false"\n             data-arrows-vertical-position="bottom" data-navigation-for="" data-element="main">\n            <div class="content-slider-list">\n                <div class="content-slider-link-container" data-content-type="content-slider-item"\n                     data-appearance="default" data-slide-title="" data-element="main"><a class="content-slider-link"\n                                                                                          href="https://s7d4.scene7.com/is/content/LovesacRender/LS25-Hero-Video-Holiday2"\n                                                                                          target=""\n                                                                                          data-link-type="default"\n                                                                                          data-element="link"><img\n                    class="pagebuilder-mobile-hidden" src="/media/wysiwyg/sactional-slider1.png"\n                    alt="Unpacking Your Sactionals" title="" height="301" width="302" data-element="image"><img\n                    class="pagebuilder-mobile-only" src="/media/wysiwyg/sactional-slider1.png"\n                    alt="Unpacking Your Sactionals" title="" height="301" width="302" data-element="mobile_image">\n                    <div data-element="content"><p style="text-align: center;">Unpacking Your Sactionals</p></div>\n                </a></div>\n                <div class="content-slider-link-container" data-content-type="content-slider-item"\n                     data-appearance="default" data-slide-title="" data-element="main"><a class="content-slider-link"\n                                                                                          href="https://s7d4.scene7.com/is/content/LovesacRender/LS25-Hero-Video-Holiday2"\n                                                                                          target=""\n                                                                                          data-link-type="default"\n                                                                                          data-element="link"><img\n                    class="pagebuilder-mobile-hidden" src="/media/wysiwyg/sactional-slider2.png"\n                    alt="Putting On Your Covers" title="" height="301" width="302" data-element="image"><img\n                    class="pagebuilder-mobile-only" src="/media/wysiwyg/sactional-slider2.png"\n                    alt="Putting On Your Covers" title="" height="301" width="302" data-element="mobile_image">\n                    <div data-element="content"><p style="text-align: center;">Putting On Your Covers</p></div>\n                </a></div>\n                <div class="content-slider-link-container" data-content-type="content-slider-item"\n                     data-appearance="default" data-slide-title="" data-element="main"><a class="content-slider-link"\n                                                                                          href="https://s7d4.scene7.com/is/content/LovesacRender/LS25-Hero-Video-Holiday2"\n                                                                                          target=""\n                                                                                          data-link-type="default"\n                                                                                          data-element="link"><img\n                    class="pagebuilder-mobile-hidden" src="/media/wysiwyg/sactional-slider3.png"\n                    alt="Setting Up Sactionals" title="" height="301" width="302" data-element="image"><img\n                    class="pagebuilder-mobile-only" src="/media/wysiwyg/sactional-slider3.png"\n                    alt="Setting Up Sactionals" title="" height="301" width="302" data-element="mobile_image">\n                    <div data-element="content"><p style="text-align: center;">Setting Up Sactionals</p></div>\n                </a></div>\n                <div class="content-slider-link-container" data-content-type="content-slider-item"\n                     data-appearance="default" data-slide-title="" data-element="main"><a class="content-slider-link"\n                                                                                          href="https://s7d4.scene7.com/is/content/LovesacRender/LS25-Hero-Video-Holiday2"\n                                                                                          target=""\n                                                                                          data-link-type="default"\n                                                                                          data-element="link"><img\n                    class="pagebuilder-mobile-hidden" src="/media/wysiwyg/sactional-slider4.png"\n                    alt="Rearrange Your Sactionals" title="" height="301" width="302" data-element="image"><img\n                    class="pagebuilder-mobile-only" src="/media/wysiwyg/sactional-slider4.png"\n                    alt="Rearrange Your Sactionals" title="" height="301" width="302" data-element="mobile_image">\n                    <div data-element="content"><p style="text-align: center;">Rearrange Your Sactionals</p></div>\n                </a></div>\n                <div class="content-slider-link-container" data-content-type="content-slider-item"\n                     data-appearance="default" data-slide-title="" data-element="main"><a class="content-slider-link"\n                                                                                          href="https://s7d4.scene7.com/is/content/LovesacRender/LS25-Hero-Video-Holiday2"\n                                                                                          target=""\n                                                                                          data-link-type="default"\n                                                                                          data-element="link"><img\n                    class="pagebuilder-mobile-hidden" src="/media/wysiwyg/sactional-slider5.png"\n                    alt="Chaise Sectional with Ottoman" title="" height="300" width="302" data-element="image"><img\n                    class="pagebuilder-mobile-only" src="/media/wysiwyg/sactional-slider5.png"\n                    alt="Chaise Sectional with Ottoman" title="" height="300" width="302" data-element="mobile_image">\n                    <div data-element="content"><p style="text-align: center;">Chaise Sectional with Ottoman</p></div>\n                </a></div>\n            </div>\n        </div>\n    </div>\n</div>\n',
                __typename: 'CmsBlock',
            },
            stealthtechApp: {
                identifier: 'my-account-stealthtech',
                title: 'My Account - Stealthtech App',
                content:
                    '<style>#html-body [data-pb-style=ILEFQ4Q], #html-body [data-pb-style=YAGLKR8] {\n    background-position: left top;\n    background-size: cover;\n    background-repeat: no-repeat;\n    background-attachment: scroll\n}\n\n#html-body [data-pb-style=YAGLKR8] {\n    justify-content: flex-start;\n    display: flex;\n    flex-direction: column;\n    margin: 0;\n    padding: 0\n}\n\n#html-body [data-pb-style=ILEFQ4Q] {\n    align-self: stretch\n}\n\n#html-body [data-pb-style=PXH65CY] {\n    display: flex;\n    width: 100%\n}\n\n#html-body [data-pb-style=RDV7BKY] {\n    justify-content: center;\n    display: flex;\n    flex-direction: column;\n    background-position: left top;\n    background-size: cover;\n    background-repeat: no-repeat;\n    background-attachment: scroll;\n    width: 25%;\n    margin: 0;\n    padding: 0;\n    align-self: stretch\n}\n\n#html-body [data-pb-style=QAEOVMR] {\n    border-style: none\n}\n\n#html-body [data-pb-style=ADQCP2B], #html-body [data-pb-style=F4GP15G] {\n    max-width: 100%;\n    height: auto\n}\n\n#html-body [data-pb-style=MXMVTYI], #html-body [data-pb-style=VQTU32Y] {\n    justify-content: center;\n    display: flex;\n    flex-direction: column;\n    background-position: left top;\n    background-size: cover;\n    background-repeat: no-repeat;\n    background-attachment: scroll;\n    width: 50%;\n    margin: 0;\n    padding: 0;\n    align-self: stretch\n}\n\n#html-body [data-pb-style=VQTU32Y] {\n    width: 25%\n}\n\n#html-body [data-pb-style=PTTM4O1] {\n    border-style: none\n}\n\n#html-body [data-pb-style=N81BLA6], #html-body [data-pb-style=XTT6MLO] {\n    max-width: 100%;\n    height: auto\n}\n\n#html-body [data-pb-style=NTT3BB3] {\n    text-align: center;\n    display: flex;\n    flex-direction: column\n}\n\n#html-body [data-pb-style=QXH0POL] {\n    display: inline-block\n}\n\n#html-body [data-pb-style=PV7DYCC] {\n    text-align: center\n}\n\n#html-body [data-pb-style=BOMGBCO] {\n    display: inline-block\n}\n\n#html-body [data-pb-style=GHHAL9O] {\n    text-align: center\n}\n\n@media only screen and (max-width: 768px) {\n    #html-body [data-pb-style=PTTM4O1], #html-body [data-pb-style=QAEOVMR] {\n        border-style: none\n    }\n}</style>\n<div data-content-type="row" data-appearance="contained" data-element="main">\n    <div data-enable-parallax="0" data-parallax-speed="0.5" data-background-images="{}" data-background-type="image"\n         data-video-loop="true" data-video-play-only-visible="true" data-video-lazy-load="true"\n         data-video-fallback-src="" data-element="inner" data-pb-style="YAGLKR8">\n        <div class="pagebuilder-column-group" data-background-images="{}"\n             data-content-type="column-group" data-appearance="default" data-grid-size="12" data-element="main"\n             data-pb-style="ILEFQ4Q">\n            <div class="pagebuilder-column-line" data-content-type="column-line" data-element="main"\n                 data-pb-style="PXH65CY">\n                <div class="pagebuilder-column stealthtech-image" data-content-type="column"\n                     data-appearance="full-height" data-background-images="{}" data-element="main"\n                     data-pb-style="RDV7BKY">\n                    <figure data-content-type="image" data-appearance="full-width" data-element="main"\n                            data-pb-style="QAEOVMR"><img class="pagebuilder-mobile-hidden"\n                                                         src="/media/wysiwyg/stealthtech-app-image.png"\n                                                         alt="Stealthtech App" title="Stealthtech App" height="241"\n                                                         width="377" data-element="desktop_image"\n                                                         data-pb-style="F4GP15G"><img class="pagebuilder-mobile-only"\n                                                                                      src="/media/wysiwyg/stealthtech-app-image-mobile.png"\n                                                                                      alt="Stealthtech App"\n                                                                                      title="Stealthtech App"\n                                                                                      height="241" width="377"\n                                                                                      data-element="mobile_image"\n                                                                                      data-pb-style="ADQCP2B">\n                        <figcaption data-element="caption">Stealthtech App</figcaption>\n                    </figure>\n                </div>\n                <div class="pagebuilder-column steahthtech-text" data-content-type="column"\n                     data-appearance="full-height" data-background-images="{}" data-element="main"\n                     data-pb-style="MXMVTYI">\n                    <div data-content-type="text" data-appearance="default" data-element="main"><p>The mobile app gives\n                        you total control of your StealthTech Experience, whether changing the layout or updating sound\n                        based on a new fabric, all right there on your phone or tablet.</p></div>\n                </div>\n                <div class="pagebuilder-column steahthtech-code" data-content-type="column"\n                     data-appearance="full-height" data-background-images="{}" data-element="main"\n                     data-pb-style="VQTU32Y">\n                    <figure class="pagebuilder-mobile-hidden" data-content-type="image" data-appearance="full-width"\n                            data-element="main" data-pb-style="PTTM4O1"><img class="pagebuilder-mobile-hidden"\n                                                                             src="/media/wysiwyg/steahthtech-app-code.png"\n                                                                             alt="" title="" height="141" width="294"\n                                                                             data-element="desktop_image"\n                                                                             data-pb-style="XTT6MLO"><img\n                        class="pagebuilder-mobile-only" src="/media/wysiwyg/steahthtech-app-code.png" alt=""\n                        title="" height="141" width="294" data-element="mobile_image" data-pb-style="N81BLA6"></figure>\n                    <div data-content-type="buttons" data-appearance="stacked" data-same-width="false"\n                         data-element="main" data-pb-style="NTT3BB3" class="pagebuilder-mobile-only">\n                        <div data-content-type="button-item" data-appearance="default" data-element="main"\n                             data-pb-style="QXH0POL"><a class="pagebuilder-button-primary" href="#" target=""\n                                                        data-link-type="default" data-element="link"\n                                                        data-pb-style="PV7DYCC"><span\n                            data-element="link_text">App store</span></a></div>\n                        <div data-content-type="button-item" data-appearance="default" data-element="main"\n                             data-pb-style="BOMGBCO"><a class="pagebuilder-button-primary" href="#" target=""\n                                                        data-link-type="default" data-element="link"\n                                                        data-pb-style="GHHAL9O"><span data-element="link_text">Play Store</span></a>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n',
                __typename: 'CmsBlock',
            },
            sacsHelp: {
                identifier: 'my-account-sacs-help',
                title: 'My Account - Sacs Help',
                content:
                    '<style>#html-body [data-pb-style=PM3CGOT] {\n    justify-content: flex-start;\n    display: flex;\n    flex-direction: column;\n    background-position: left top;\n    background-size: cover;\n    background-repeat: no-repeat;\n    background-attachment: scroll;\n    margin: 0;\n    padding: 0\n}</style>\n<div data-content-type="row" data-appearance="contained" data-element="main">\n    <div data-enable-parallax="0" data-parallax-speed="0.5" data-background-images="{}" data-background-type="image"\n         data-video-loop="true" data-video-play-only-visible="true" data-video-lazy-load="true"\n         data-video-fallback-src="" data-element="inner" data-pb-style="PM3CGOT">\n        <div data-content-type="text" data-appearance="default" data-element="main"><h3>Sacs Help <a\n            title="View All" href="/sacs.html">View All</a></h3></div>\n        <div class="content-slider" data-content-type="content-slider" data-appearance="default" data-slide-count="4"\n             data-mobile-slide-count="1" data-autoplay="false" data-autoplay-speed="4000" data-infinite-loop="false"\n             data-show-arrows="true" data-show-dots="true" data-adaptive-height="false" data-navigation-style="dots"\n             data-navigation-position="after" data-add-navigation-borders="false" data-arrows-outside="false"\n             data-arrows-vertical-position="bottom" data-navigation-for="" data-element="main">\n            <div class="content-slider-list">\n                <div class="content-slider-link-container" data-content-type="content-slider-item"\n                     data-appearance="default" data-slide-title="" data-element="main"><a class="content-slider-link"\n                                                                                          href="https://s7d4.scene7.com/is/content/LovesacRender/LS25-Hero-Video-Holiday2"\n                                                                                          target=""\n                                                                                          data-link-type="default"\n                                                                                          data-element="link"><img\n                    class="pagebuilder-mobile-hidden" src="/media/wysiwyg/sactional-slider1.png"\n                    alt="Unpacking Your Sactionals" title="" height="301" width="302" data-element="image"><img\n                    class="pagebuilder-mobile-only" src="/media/wysiwyg/sactional-slider1.png"\n                    alt="Unpacking Your Sactionals" title="" height="301" width="302" data-element="mobile_image">\n                    <div data-element="content"><p style="text-align: center;">Unpacking Your Sactionals</p></div>\n                </a></div>\n                <div class="content-slider-link-container" data-content-type="content-slider-item"\n                     data-appearance="default" data-slide-title="" data-element="main"><a class="content-slider-link"\n                                                                                          href="https://s7d4.scene7.com/is/content/LovesacRender/LS25-Hero-Video-Holiday2"\n                                                                                          target=""\n                                                                                          data-link-type="default"\n                                                                                          data-element="link"><img\n                    class="pagebuilder-mobile-hidden" src="/media/wysiwyg/sactional-slider2.png"\n                    alt="Putting On Your Covers" title="" height="301" width="302" data-element="image"><img\n                    class="pagebuilder-mobile-only" src="/media/wysiwyg/sactional-slider2.png"\n                    alt="Putting On Your Covers" title="" height="301" width="302" data-element="mobile_image">\n                    <div data-element="content"><p style="text-align: center;">Putting On Your Covers</p></div>\n                </a></div>\n                <div class="content-slider-link-container" data-content-type="content-slider-item"\n                     data-appearance="default" data-slide-title="" data-element="main"><a class="content-slider-link"\n                                                                                          href="https://s7d4.scene7.com/is/content/LovesacRender/LS25-Hero-Video-Holiday2"\n                                                                                          target=""\n                                                                                          data-link-type="default"\n                                                                                          data-element="link"><img\n                    class="pagebuilder-mobile-hidden" src="/media/wysiwyg/sactional-slider3.png"\n                    alt="Setting Up Sactionals" title="" height="301" width="302" data-element="image"><img\n                    class="pagebuilder-mobile-only" src="/media/wysiwyg/sactional-slider3.png"\n                    alt="Setting Up Sactionals" title="" height="301" width="302" data-element="mobile_image">\n                    <div data-element="content"><p style="text-align: center;">Setting Up Sactionals</p></div>\n                </a></div>\n                <div class="content-slider-link-container" data-content-type="content-slider-item"\n                     data-appearance="default" data-slide-title="" data-element="main"><a class="content-slider-link"\n                                                                                          href="https://s7d4.scene7.com/is/content/LovesacRender/LS25-Hero-Video-Holiday2"\n                                                                                          target=""\n                                                                                          data-link-type="default"\n                                                                                          data-element="link"><img\n                    class="pagebuilder-mobile-hidden" src="/media/wysiwyg/sactional-slider4.png"\n                    alt="Rearrange Your Sactionals" title="" height="301" width="302" data-element="image"><img\n                    class="pagebuilder-mobile-only" src="/media/wysiwyg/sactional-slider4.png"\n                    alt="Rearrange Your Sactionals" title="" height="301" width="302" data-element="mobile_image">\n                    <div data-element="content"><p style="text-align: center;">Rearrange Your Sactionals</p></div>\n                </a></div>\n                <div class="content-slider-link-container" data-content-type="content-slider-item"\n                     data-appearance="default" data-slide-title="" data-element="main"><a class="content-slider-link"\n                                                                                          href="https://s7d4.scene7.com/is/content/LovesacRender/LS25-Hero-Video-Holiday2"\n                                                                                          target=""\n                                                                                          data-link-type="default"\n                                                                                          data-element="link"><img\n                    class="pagebuilder-mobile-hidden" src="/media/wysiwyg/sactional-slider5.png"\n                    alt="Chaise Sectional with Ottoman" title="" height="300" width="302" data-element="image"><img\n                    class="pagebuilder-mobile-only" src="/media/wysiwyg/sactional-slider5.png"\n                    alt="Chaise Sectional with Ottoman" title="" height="300" width="302" data-element="mobile_image">\n                    <div data-element="content"><p style="text-align: center;">Chaise Sectional with Ottoman</p></div>\n                </a></div>\n            </div>\n        </div>\n    </div>\n</div>\n',
                __typename: 'CmsBlock',
            },
            stealthtechHelp: {
                identifier: 'my-account-stealthtech-help',
                title: 'My Account - Stealthtech Help',
                content:
                    '<style>#html-body [data-pb-style=PM3CGOT] {\n    justify-content: flex-start;\n    display: flex;\n    flex-direction: column;\n    background-position: left top;\n    background-size: cover;\n    background-repeat: no-repeat;\n    background-attachment: scroll;\n    margin: 0;\n    padding: 0\n}</style>\n<div data-content-type="row" data-appearance="contained" data-element="main">\n    <div data-enable-parallax="0" data-parallax-speed="0.5" data-background-images="{}" data-background-type="image"\n         data-video-loop="true" data-video-play-only-visible="true" data-video-lazy-load="true"\n         data-video-fallback-src="" data-element="inner" data-pb-style="PM3CGOT">\n        <div data-content-type="text" data-appearance="default" data-element="main"><h3>Steahthtech Help <a\n            title="View All" href="/sactionals-with-stealthtech-sound-charge.html">View All</a></h3></div>\n        <div class="content-slider" data-content-type="content-slider" data-appearance="default" data-slide-count="4"\n             data-mobile-slide-count="1" data-autoplay="false" data-autoplay-speed="4000" data-infinite-loop="false"\n             data-show-arrows="true" data-show-dots="true" data-adaptive-height="false" data-navigation-style="dots"\n             data-navigation-position="after" data-add-navigation-borders="false" data-arrows-outside="false"\n             data-arrows-vertical-position="bottom" data-navigation-for="" data-element="main">\n            <div class="content-slider-list">\n                <div class="content-slider-link-container" data-content-type="content-slider-item"\n                     data-appearance="default" data-slide-title="" data-element="main"><a class="content-slider-link"\n                                                                                          href="https://s7d4.scene7.com/is/content/LovesacRender/LS25-Hero-Video-Holiday2"\n                                                                                          target=""\n                                                                                          data-link-type="default"\n                                                                                          data-element="link"><img\n                    class="pagebuilder-mobile-hidden" src="/media/wysiwyg/sactional-slider1.png"\n                    alt="Unpacking Your Sactionals" title="" height="301" width="302" data-element="image"><img\n                    class="pagebuilder-mobile-only" src="/media/wysiwyg/sactional-slider1.png"\n                    alt="Unpacking Your Sactionals" title="" height="301" width="302" data-element="mobile_image">\n                    <div data-element="content"><p style="text-align: center;">Unpacking Your Sactionals</p></div>\n                </a></div>\n                <div class="content-slider-link-container" data-content-type="content-slider-item"\n                     data-appearance="default" data-slide-title="" data-element="main"><a class="content-slider-link"\n                                                                                          href="https://s7d4.scene7.com/is/content/LovesacRender/LS25-Hero-Video-Holiday2"\n                                                                                          target=""\n                                                                                          data-link-type="default"\n                                                                                          data-element="link"><img\n                    class="pagebuilder-mobile-hidden" src="/media/wysiwyg/sactional-slider2.png"\n                    alt="Putting On Your Covers" title="" height="301" width="302" data-element="image"><img\n                    class="pagebuilder-mobile-only" src="/media/wysiwyg/sactional-slider2.png"\n                    alt="Putting On Your Covers" title="" height="301" width="302" data-element="mobile_image">\n                    <div data-element="content"><p style="text-align: center;">Putting On Your Covers</p></div>\n                </a></div>\n                <div class="content-slider-link-container" data-content-type="content-slider-item"\n                     data-appearance="default" data-slide-title="" data-element="main"><a class="content-slider-link"\n                                                                                          href="https://s7d4.scene7.com/is/content/LovesacRender/LS25-Hero-Video-Holiday2"\n                                                                                          target=""\n                                                                                          data-link-type="default"\n                                                                                          data-element="link"><img\n                    class="pagebuilder-mobile-hidden" src="/media/wysiwyg/sactional-slider3.png"\n                    alt="Setting Up Sactionals" title="" height="301" width="302" data-element="image"><img\n                    class="pagebuilder-mobile-only" src="/media/wysiwyg/sactional-slider3.png"\n                    alt="Setting Up Sactionals" title="" height="301" width="302" data-element="mobile_image">\n                    <div data-element="content"><p style="text-align: center;">Setting Up Sactionals</p></div>\n                </a></div>\n                <div class="content-slider-link-container" data-content-type="content-slider-item"\n                     data-appearance="default" data-slide-title="" data-element="main"><a class="content-slider-link"\n                                                                                          href="https://s7d4.scene7.com/is/content/LovesacRender/LS25-Hero-Video-Holiday2"\n                                                                                          target=""\n                                                                                          data-link-type="default"\n                                                                                          data-element="link"><img\n                    class="pagebuilder-mobile-hidden" src="/media/wysiwyg/sactional-slider4.png"\n                    alt="Rearrange Your Sactionals" title="" height="301" width="302" data-element="image"><img\n                    class="pagebuilder-mobile-only" src="/media/wysiwyg/sactional-slider4.png"\n                    alt="Rearrange Your Sactionals" title="" height="301" width="302" data-element="mobile_image">\n                    <div data-element="content"><p style="text-align: center;">Rearrange Your Sactionals</p></div>\n                </a></div>\n                <div class="content-slider-link-container" data-content-type="content-slider-item"\n                     data-appearance="default" data-slide-title="" data-element="main"><a class="content-slider-link"\n                                                                                          href="https://s7d4.scene7.com/is/content/LovesacRender/LS25-Hero-Video-Holiday2"\n                                                                                          target=""\n                                                                                          data-link-type="default"\n                                                                                          data-element="link"><img\n                    class="pagebuilder-mobile-hidden" src="/media/wysiwyg/sactional-slider5.png"\n                    alt="Chaise Sectional with Ottoman" title="" height="300" width="302" data-element="image"><img\n                    class="pagebuilder-mobile-only" src="/media/wysiwyg/sactional-slider5.png"\n                    alt="Chaise Sectional with Ottoman" title="" height="300" width="302" data-element="mobile_image">\n                    <div data-element="content"><p style="text-align: center;">Chaise Sectional with Ottoman</p></div>\n                </a></div>\n            </div>\n        </div>\n    </div>\n</div>\n',
                __typename: 'CmsBlock',
            },
        },
        categories: [
            {
                uid: 'MjI=',
                urlPath: 'sactionals/accessories',
                products: {
                    items: [
                        {
                            image: {
                                url: '/media/catalog/product/s/e/secret_box_2.png?optimize=medium&bg-color=255,255,255&fit=bounds&height=&width=&format=jpeg',
                                __typename: 'ProductImage',
                            },
                            name: 'Sactionals Hardware Kit: Dark Walnut Teal',
                            canonicalUrl: 'sactionals-hardware-kit-dark-walnut-teal.html',
                            priceRange: {
                                minimumPrice: {
                                    finalPrice: {
                                        value: 50,
                                        currency: 'USD',
                                        __typename: 'Money',
                                    },
                                    regularPrice: {
                                        value: 50,
                                        currency: 'USD',
                                        __typename: 'Money',
                                    },
                                    __typename: 'ProductPrice',
                                },
                                __typename: 'PriceRange',
                            },
                            __typename: 'SimpleProduct',
                        },
                        {
                            image: {
                                url: '/media/catalog/product/l/o/lovesac-sactionals-stealthtech-power-hub-options.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=&width=',
                                __typename: 'ProductImage',
                            },
                            name: 'Sactionals StealthTech Power Hub',
                            canonicalUrl: 'sactionals-stealthtech-power-hub.html',
                            priceRange: {
                                minimumPrice: {
                                    finalPrice: {
                                        value: 200,
                                        currency: 'USD',
                                        __typename: 'Money',
                                    },
                                    regularPrice: {
                                        value: 200,
                                        currency: 'USD',
                                        __typename: 'Money',
                                    },
                                    __typename: 'ProductPrice',
                                },
                                __typename: 'PriceRange',
                            },
                            __typename: 'SimpleProduct',
                        },
                        {
                            image: {
                                url: '/media/catalog/product/g/u/guestrest_packaging_1500x1000-2.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=&width=',
                                __typename: 'ProductImage',
                            },
                            name: 'Sactionals Guest Rest Bedding Kit',
                            canonicalUrl: 'sactionals-guest-rest-bedding-kit.html',
                            priceRange: {
                                minimumPrice: {
                                    finalPrice: {
                                        value: 295,
                                        currency: 'USD',
                                        __typename: 'Money',
                                    },
                                    regularPrice: {
                                        value: 295,
                                        currency: 'USD',
                                        __typename: 'Money',
                                    },
                                    __typename: 'ProductPrice',
                                },
                                __typename: 'PriceRange',
                            },
                            __typename: 'SimpleProduct',
                        },
                        {
                            image: {
                                url: '/media/catalog/product/c/o/coaster_dark_walnut_128_1500x1500.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=&width=',
                                __typename: 'ProductImage',
                            },
                            name: 'Sactionals Coaster: Dark Walnut',
                            canonicalUrl: 'sactionals-coaster-dark-walnut.html',
                            priceRange: {
                                minimumPrice: {
                                    finalPrice: {
                                        value: 45,
                                        currency: 'USD',
                                        __typename: 'Money',
                                    },
                                    regularPrice: {
                                        value: 45,
                                        currency: 'USD',
                                        __typename: 'Money',
                                    },
                                    __typename: 'ProductPrice',
                                },
                                __typename: 'PriceRange',
                            },
                            __typename: 'SimpleProduct',
                        },
                        {
                            image: {
                                url: '/media/catalog/product/c/o/coaster_hickory_557_1500x1500_1.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=&width=',
                                __typename: 'ProductImage',
                            },
                            name: 'Sactionals Coaster: Hickory',
                            canonicalUrl: 'sactionals-coaster-hickory.html',
                            priceRange: {
                                minimumPrice: {
                                    finalPrice: {
                                        value: 45,
                                        currency: 'USD',
                                        __typename: 'Money',
                                    },
                                    regularPrice: {
                                        value: 45,
                                        currency: 'USD',
                                        __typename: 'Money',
                                    },
                                    __typename: 'ProductPrice',
                                },
                                __typename: 'PriceRange',
                            },
                            __typename: 'SimpleProduct',
                        },
                    ],
                    __typename: 'CategoryProducts',
                },
                __typename: 'CategoryTree',
            },
            {
                uid: 'Mzc=',
                urlPath: 'sacs/accessories',
                products: {
                    items: [
                        {
                            image: {
                                url: '/media/catalog/product/s/q/squattamon_boucle_onyx_1.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=&width=',
                                __typename: 'ProductImage',
                            },
                            name: 'Squattoman Insert & Cover',
                            canonicalUrl: 'squattoman-insert-and-cover-onyx-boucle.html',
                            priceRange: {
                                minimumPrice: {
                                    finalPrice: {
                                        value: 325,
                                        currency: 'USD',
                                        __typename: 'Money',
                                    },
                                    regularPrice: {
                                        value: 325,
                                        currency: 'USD',
                                        __typename: 'Money',
                                    },
                                    __typename: 'ProductPrice',
                                },
                                __typename: 'PriceRange',
                            },
                            __typename: 'BundleProduct',
                        },
                        {
                            image: {
                                url: '/media/catalog/product/s/q/squattamon_boucle_cloud_1.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=&width=',
                                __typename: 'ProductImage',
                            },
                            name: 'Squattoman Insert & Cover',
                            canonicalUrl: 'squattoman-insert-and-cover-cloud-boucle.html',
                            priceRange: {
                                minimumPrice: {
                                    finalPrice: {
                                        value: 325,
                                        currency: 'USD',
                                        __typename: 'Money',
                                    },
                                    regularPrice: {
                                        value: 325,
                                        currency: 'USD',
                                        __typename: 'Money',
                                    },
                                    __typename: 'ProductPrice',
                                },
                                __typename: 'PriceRange',
                            },
                            __typename: 'BundleProduct',
                        },
                        {
                            image: {
                                url: '/media/catalog/product/r/o/roomfor2-footsac_midnight_mink_061.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=&width=',
                                __typename: 'ProductImage',
                            },
                            name: 'Room for Two Footsac Blanket: Midnight Mink Phur',
                            canonicalUrl: 'room-for-two-footsac-blanket-midnight-mink-phur.html',
                            priceRange: {
                                minimumPrice: {
                                    finalPrice: {
                                        value: 325,
                                        currency: 'USD',
                                        __typename: 'Money',
                                    },
                                    regularPrice: {
                                        value: 325,
                                        currency: 'USD',
                                        __typename: 'Money',
                                    },
                                    __typename: 'ProductPrice',
                                },
                                __typename: 'PriceRange',
                            },
                            __typename: 'SimpleProduct',
                        },
                        {
                            image: {
                                url: '/media/catalog/product/r/o/roomfor2-footsac_grey_063.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=&width=',
                                __typename: 'ProductImage',
                            },
                            name: 'Room for Two Footsac Blanket: Glacier Mink Phur',
                            canonicalUrl: 'room-for-two-footsac-blanket-glacier-mink-phur.html',
                            priceRange: {
                                minimumPrice: {
                                    finalPrice: {
                                        value: 325,
                                        currency: 'USD',
                                        __typename: 'Money',
                                    },
                                    regularPrice: {
                                        value: 325,
                                        currency: 'USD',
                                        __typename: 'Money',
                                    },
                                    __typename: 'ProductPrice',
                                },
                                __typename: 'PriceRange',
                            },
                            __typename: 'SimpleProduct',
                        },
                        {
                            image: {
                                url: '/media/catalog/product/g/u/guestrest_packaging_1500x1000-2.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=&width=',
                                __typename: 'ProductImage',
                            },
                            name: 'Sactionals Guest Rest Bedding Kit',
                            canonicalUrl: 'sactionals-guest-rest-bedding-kit.html',
                            priceRange: {
                                minimumPrice: {
                                    finalPrice: {
                                        value: 295,
                                        currency: 'USD',
                                        __typename: 'Money',
                                    },
                                    regularPrice: {
                                        value: 295,
                                        currency: 'USD',
                                        __typename: 'Money',
                                    },
                                    __typename: 'ProductPrice',
                                },
                                __typename: 'PriceRange',
                            },
                            __typename: 'SimpleProduct',
                        },
                    ],
                    __typename: 'CategoryProducts',
                },
                __typename: 'CategoryTree',
            },
        ],
        paymentTokens: [
            {
                details: '{"type":"VI","maskedCC":"1111","expirationDate":"11\\/2028"}',
            },
            {
                details: '{"type":"MC","maskedCC":"2222","expirationDate":"11\\/2030"}',
            },
        ],
    },
    parameters: {
        design: [
            {
                type: 'figma',
                name: 'Desktop',
                url: 'https://www.figma.com/file/YADYZ7dnLBTrtWKfuyBfao/BA---MYHUB?type=design&node-id=870-57763',
            },
            {
                type: 'figma',
                name: 'Mobile',
                url: 'https://www.figma.com/file/YADYZ7dnLBTrtWKfuyBfao/BA---MYHUB?type=design&node-id=747-30658',
            },
        ],
    },
};
