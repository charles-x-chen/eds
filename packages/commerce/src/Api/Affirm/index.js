/**
 * @package     BlueAcorn/Api
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */

export function affirmInit(config) {
    const script = config['affirm.script'];
    const apiKey = config['affirm.public_api_key'];

    if (!script || !apiKey || window.affirm?.ui) {
        return null;
    }

    /* eslint camelcase: off */
    const affirmConfig = {
        public_api_key: apiKey,
        script,
        locale: config['affirm.locale'],
        country_code: config['affirm.country_code'],
    };

    /* eslint prefer-rest-params: off */
    /* eslint func-style: off */
    // prettier-ignore
    (function(m, g, n, d, a, e, h, c) {
        const b = m[n] || {};
        const k = document.createElement(e);
        const p = document.getElementsByTagName(e)[0];
        const l = function(a, b, c) {
            return function() {
                a[b]._.push([c, arguments]);
            };
        };
        b[d] = l(b, d, "set");
        const f = b[d];
        b[a] = {};
        b[a]._ = [];
        f._ = [];
        b._ = [];
        b[a][h] = l(b, a, h);
        b[c] = function() {
            b._.push([h, arguments]);
        };
        a = 0;
        for (c = "set add save post open empty reset on off trigger ready setProduct".split(" "); a < c.length; a++) f[c[a]] = l(b, d, c[a]);
        a = 0;
        for (c = ["get", "token", "url", "items"]; a < c.length; a++) f[c[a]] = function() {
        };
        k.async =
            !0;
        k.src = g[e];
        p.parentNode.insertBefore(k, p);
        delete g[e];
        f(g);
        m[n] = b;
    })(window, affirmConfig, "affirm", "checkout", "ui", "script", "ready", "jsReady");

    return new Promise((resolve) => {
        window.affirm.ui.ready(resolve);
    });
}
