/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { configuration } from '../data/configurator';

export const load = (configuratorContext, stateContext, totalsContext) => {
    return {
        event: 'configurator.load',
        configurator: configuration(configuratorContext, stateContext, totalsContext),
    };
};
