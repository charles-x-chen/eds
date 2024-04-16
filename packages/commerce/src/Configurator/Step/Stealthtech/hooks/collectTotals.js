/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { NO_STEALTHTECH_CODE } from '../constants';

export const collectTotals = (
    { options: prevOptions },
    { stealthtech: stateStealthtech },
    { stealthtech: indexStealthtech },
) => {
    const objects = prevOptions.objects ? [...prevOptions.objects] : [];
    const options = { ...prevOptions, objects };

    let title = null;
    if (stateStealthtech !== NO_STEALTHTECH_CODE) {
        const stealthtech = indexStealthtech[stateStealthtech];

        if (stealthtech) {
            objects.push([stealthtech, 1]);
            title = stealthtech.name;
        }

        /* eslint camelcase: off */
        if (options.pieces.angled_sidePillow > 0) {
            options.pieces = { ...options.pieces };
            options.pieces.acousticAngled_sidePillow = options.pieces.angled_sidePillow;
            options.pieces.angled_sidePillow = 0;
        }
    }

    return {
        title,
        options,
    };
};
