/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useStateContext } from '../../../Context/State';

export const usePlayerInitParams = (params) => {
    const {
        state: { configuration },
    } = useStateContext();

    params.productCategory =
        configuration?.includes('InsertCover') || configuration?.includes('SidePillow')
            ? 'sactionalCovers'
            : 'indoorSactional';
    params.initialConfiguration = params.initialConfiguration || {};
    params.initialConfiguration.BackType = configuration?.includes('AngledSide') ? 'Angled' : 'Standard';
    params.mode = 'vray';
};
