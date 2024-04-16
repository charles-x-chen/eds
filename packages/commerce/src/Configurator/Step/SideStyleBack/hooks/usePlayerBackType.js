/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useMemo } from 'preact/hooks';
import { useStateContext } from '../../../Context/State';

export const usePlayerBackType = () => {
    const {
        state: { backStyle },
    } = useStateContext();
    return useMemo(() => {
        if (backStyle === 'angled') {
            return 'Angled';
        }
        return 'Standard';
    }, [backStyle]);
};
