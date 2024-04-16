/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */

import { useMemo } from 'preact/hooks';
import { useConfiguratorContext } from '../../../Context/Configurator';
import { useStateContext } from '../../../Context/State';
import { calculateTotalPrice } from '../../../calculator';

export const useCustomItemPrice = (code) => {
    const index = useConfiguratorContext();
    const {
        state: { fabricId, fabricLeadTime },
    } = useStateContext();

    return useMemo(() => {
        return calculateTotalPrice(index, {
            pieces: { [code]: 1 },
            fabricId,
            fabricLeadTime,
        }).total;
    }, [index, code, fabricId, fabricLeadTime]);
};
