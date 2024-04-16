/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useEffect } from 'preact/hooks';
import { useStateContext } from '../../../Context/State';
import { usePlayerArmType } from './usePlayerArmType';

export const usePlayerSync = ({ api }) => {
    const armType = usePlayerArmType();
    const {
        state: { armStyleChanged },
    } = useStateContext();
    useEffect(() => {
        if (armStyleChanged && api.setArmType) {
            api.setArmType(armType);
        }
    }, [armStyleChanged, api, armType]);
};
