/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { save } from './events/save';
import { addOrUpdateToCart } from './events/add-or-update-cart';
import { load } from './events/load';
import { share } from './events/share';
import { summary } from './events/summary';
import { init } from './events/init';

export const pool = {
    save,
    addOrUpdateToCart,
    init,
    load,
    share,
    summary,
};
