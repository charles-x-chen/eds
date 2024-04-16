/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';

export const getLeadTimeText = (objects) => {
    let maxFrom = 0;
    let maxTo = 0;
    let maxLeadTime = null;

    for (const object of objects) {
        const leadTime = object.leadTime;
        if (leadTime) {
            const [from, to] = leadTime.replace(/[ -]+/g, '-').split('-').map(Number);
            if (to > maxTo) {
                maxTo = to;
                maxFrom = from;
                maxLeadTime = leadTime;
            } else if (to === maxTo && from > maxFrom) {
                maxFrom = from;
                maxLeadTime = leadTime;
            }
        }
    }

    if (maxLeadTime) {
        return t`Shipping in ${maxLeadTime}`;
    }
    return null;
};
