/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */

import { useConfiguratorContext } from '../../../Context/Configurator';

export const usePlayerInitParams = (params) => {
    const { pieces: indexPieces } = useConfiguratorContext();

    params.productCategory = 'sactionalCovers';
    params.mode = 'vray';
    params.initialConfiguration.productId = indexPieces['standard_seat'].vrayId;
};
