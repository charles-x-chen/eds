/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useCallback } from 'preact/hooks';

export const useHookCallback = (type, method) => {
    return useCallback(
        (...args) => {
            if (type[method]) {
                type[method](...args);
            }
            if (type.extra) {
                for (const step of type.extra) {
                    if (step[method]) {
                        step[method](...args);
                    }
                }
            }
            for (const step of type.steps) {
                if (step[method]) {
                    step[method](...args);
                }
            }
        },
        [type, method],
    );
};
