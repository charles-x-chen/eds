/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useEffect } from 'preact/hooks';
import { useStateContext } from '../../../Context/State';
import { usePlayerBackType } from './usePlayerBackType';

export const usePlayerSync = ({ api }) => {
    const backType = usePlayerBackType();
    const {
        state: { backStyleChanged },
    } = useStateContext();
    useEffect(() => {
        if (backStyleChanged && api.setBackType) {
            api.setBackType(backType);
        }
    }, [backStyleChanged, api, backType]);
};
