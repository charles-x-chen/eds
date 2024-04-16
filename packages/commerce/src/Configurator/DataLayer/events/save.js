/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { configuration } from '../data/configurator';

export const save = (configuratorContext, stateContext, totalsContext, shareCode) => {
    return {
        event: 'configurator.save',
        configurator: configuration(configuratorContext, stateContext, totalsContext, shareCode),
    };
};
