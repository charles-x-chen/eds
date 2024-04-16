/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */

export const isCoverAvailable = (index, options) => {
    const { fabricOptions } = index;
    const { fabricId = null, fabricLeadTime = null, pieces = {} } = options;

    for (const [code, qty] of Object.entries(pieces)) {
        if (qty <= 0) {
            continue;
        }
        if (code.includes('_side') && code.includes('_outdoor')) {
            continue;
        }
        const coverObject = fabricOptions?.[fabricLeadTime]?.[fabricId]?.pieces?.[code];
        if (!coverObject) {
            return false;
        }
    }

    return true;
};
