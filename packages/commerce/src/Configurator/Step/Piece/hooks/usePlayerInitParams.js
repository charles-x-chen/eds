/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { usePlayerProductId } from './usePlayerProductId';

export const usePlayerInitParams = (params) => {
    params.initialConfiguration.productId = usePlayerProductId();
};
