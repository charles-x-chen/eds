/**
 * @package     BlueAcorn/Api
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */

function extoleCreateZone(params) {
    try {
        /* eslint prefer-rest-params: off */
        // prettier-ignore
        (function(c, e, k, l, a) {
            c[e] = c[e] || {};
            for (c[e].q = c[e].q || []; a < l.length;) k(l[a++], c[e]);
        })(window, "extole", (c, e) => {
            e[c] = e[c] || function() {
                e.q.push([c, arguments]);
            };
        }, ["createZone"], 0);
        return window.extole.createZone(params);
    } catch (error) {
        /* eslint no-console: off */
        console.error('Error initializing Extole:', error);
        return null;
    }
}

export function extoleCreateCustomerZone(customer, element) {
    const {
        email,
        firstname,
        lastname,
        refer: { partnerUserId, jwt },
    } = customer;
    /* eslint camelcase: off */
    const data = JSON.stringify({
        email,
        partner_user_id: partnerUserId,
        first_name: firstname,
        last_name: lastname,
    });

    return extoleCreateZone({
        name: 'advocate_stats_embedded',
        element,
        data,
        jwt,
    });
}
