/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { pool } from './pool';

export const push = (action, configuratorContext, stateContext, totalsContext) => {
    if (!window.dataLayer) {
        window.dataLayer = [];
    }

    try {
        const event = typeof action === 'string' ? action : action.event;
        const shareCode = typeof action === 'string' ? null : action.shareCode;

        const callback = pool[event];
        if (callback) {
            const data = callback(configuratorContext, stateContext, totalsContext, shareCode);
            window.dataLayer.push(data);
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }
};
