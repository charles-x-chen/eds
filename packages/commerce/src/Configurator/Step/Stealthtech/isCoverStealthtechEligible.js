/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */

export const isCoverStealthtechEligible = (index, options) => {
    const { fabricOptions } = index;
    const { fabricLeadTime, fabricId } = options;
    return fabricOptions?.[fabricLeadTime]?.[fabricId]?.stealthtech || false;
};
