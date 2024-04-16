/**
 * @package     BlueAcorn/Api
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { computed } from '@preact/signals';

const userAgentSignal = computed(getUserAgent);

export default userAgentSignal;

function getUserAgent() {
    const userAgent = navigator.userAgent.toLowerCase();

    if (/android/.test(userAgent)) {
        return 'Android';
    }
    if (/(iphone|ipad|ipod)/.test(userAgent)) {
        return 'iOS';
    }
    if (/(windows|macintosh|linux)/.test(userAgent)) {
        return 'Desktop';
    }
    return 'unknown';
}
