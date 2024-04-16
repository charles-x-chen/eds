/**
 * @package     BlueAcorn/PresetVite
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */

export default function serverPlugin({ host, target }) {
    return {
        name: 'ba-server',
        config() {
            return {
                server: {
                    host,
                    proxy: {
                        '^/(graphql|media|static)(/|$|\\?)': initProxy(target),
                    },
                },
            };
        },
    };
}

function initProxy(target) {
    return {
        target,
        changeOrigin: true,
        secure: false,
        cookieDomainRewrite: {
            '*': '',
        },
        configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
                proxyReq.setHeader('referer', proxy.options.target);
                proxyReq.setHeader('origin', proxy.options.target.replace(/\/+$/, ''));
            });
            proxy.on('proxyRes', (proxyRes) => {
                if (proxyRes.headers['set-cookie']) {
                    // remove secure cookie flag
                    proxyRes.headers['set-cookie'] = proxyRes.headers['set-cookie'].map((cookie) =>
                        cookie.replace('; secure; ', '; '),
                    );
                }
            });
        },
    };
}
