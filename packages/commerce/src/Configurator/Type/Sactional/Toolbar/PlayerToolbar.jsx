/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */

import { useStateContext } from '../../../Context/State';
import { TYPE_CUSTOM } from '../../../Step/Configure/constants';
import { WebglPlayerToolbar } from './WebglPlayerToolbar';
import { VrayPlayerToolbar } from './VrayPlayerToolbar';

export const PlayerToolbar = () => {
    const {
        state: { configurationType },
    } = useStateContext();

    return configurationType === TYPE_CUSTOM ? <WebglPlayerToolbar /> : <VrayPlayerToolbar />;
};
