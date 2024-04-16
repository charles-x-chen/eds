/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useMemo } from 'preact/hooks';
import { useStateContext } from '../../../Context/State';

export const usePlayerArmType = () => {
    const {
        state: { armStyle },
    } = useStateContext();
    return useMemo(() => {
        switch (armStyle) {
            case 'angled':
                return 'Angled';
            case 'rollArm':
                return 'Rollarm';
            default:
                return 'Standard';
        }
    }, [armStyle]);
};
