/**
 * @package     BlueAcorn/Api
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */

export async function synchronyInit(config) {
    const src = config['synchrony.script'];
    const syfPartnerId = config['synchrony.partner_id'];

    if (!src || !syfPartnerId || window.syfWidgetObject) {
        return null;
    }

    window.syfWidgetObject = {
        syfPartnerId,
        flowType: 'PDP',
    };

    /* eslint github/no-dynamic-script-tag: off */
    const script = document.createElement('script');
    script.src = src;
    script.id = 'syfMPPScript';
    document.head.append(script);
}
