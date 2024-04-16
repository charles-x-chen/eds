/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useCallback } from 'preact/hooks';
import { useStateContext } from '../Context/State';

export const useStateButtonCallback = () => {
    const { dispatch } = useStateContext();

    return useCallback(
        (event) => {
            event.preventDefault();
            const { name, value } = event.target;
            dispatch({
                type: name,
                value,
            });
        },
        [dispatch],
    );
};
