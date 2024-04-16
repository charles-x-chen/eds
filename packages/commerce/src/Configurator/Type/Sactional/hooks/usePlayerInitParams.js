/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import mobileSignal from '~/Api/Mobile';

export const usePlayerInitParams = (params) => {
    const isMobile = mobileSignal.value;

    params.productCategory = 'indoorSactional';
    params.mode = 'vray';
    params.device = isMobile ? 'mobile' : '';
};
