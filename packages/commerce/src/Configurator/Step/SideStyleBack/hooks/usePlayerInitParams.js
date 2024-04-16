/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useStateContext } from '../../../Context/State';
import { TYPE_PREBUILT } from '../../Configure/constants';
import { usePlayerBackType } from './usePlayerBackType';

export const usePlayerInitParams = ({ initialConfiguration }) => {
    const backType = usePlayerBackType();
    const {
        state: { configurationType },
    } = useStateContext();
    if (configurationType === TYPE_PREBUILT) {
        initialConfiguration.BackType = backType;
    }
};
