/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { configuration } from '../data/configurator';

export const addOrUpdateToCart = (configuratorContext, stateContext, totalsContext, shareCode) => {
    const {
        config: { isConfigureMode = false },
    } = configuratorContext;

    return {
        event: `configurator.${!isConfigureMode ? 'addtocart' : 'updatecart'}`,
        configurator: configuration(configuratorContext, stateContext, totalsContext, shareCode),
    };
};
