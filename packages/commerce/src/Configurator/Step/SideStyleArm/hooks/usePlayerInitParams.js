/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { TYPE_PREBUILT } from '../../Configure/constants';
import { useStateContext } from '../../../Context/State';
import { usePlayerArmType } from './usePlayerArmType';

export const usePlayerInitParams = ({ initialConfiguration }) => {
    const armType = usePlayerArmType();
    const {
        state: { configurationType },
    } = useStateContext();
    if (configurationType === TYPE_PREBUILT) {
        initialConfiguration.ArmType = armType;
    }
};
