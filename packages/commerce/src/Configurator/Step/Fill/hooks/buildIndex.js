/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */

export const buildIndex = (index, type) => {
    /*if (shouldHideFillStep(index)) {
        type.steps = type.steps.filter(({ code }) => code !== 'fill');
    }*/
};

const shouldHideFillStep = ({ preBuilt = null }) => {
    if (preBuilt) {
        const preBuiltSkus = Object.keys(preBuilt);
        if (preBuiltSkus.length === 1) {
            const preBuiltSku = preBuiltSkus[0];
            const { pieces } = preBuilt[preBuiltSku];
            if (pieces) {
                for (const key in pieces) {
                    if (pieces[key] > 0 && (key.includes('seat') || key === 'angled_sidePillow')) {
                        return false;
                    }
                }
                return true;
            }
        }
    }
    return false;
};
