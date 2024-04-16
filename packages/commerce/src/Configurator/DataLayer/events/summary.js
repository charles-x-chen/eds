/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { configuration } from '../data/configurator';

export const summary = (configuratorContext, stateContext, totalsContext, shareCode) => {
    return {
        event: 'configurator.summary',
        configurator: configuration(configuratorContext, stateContext, totalsContext, shareCode),
    };
};
