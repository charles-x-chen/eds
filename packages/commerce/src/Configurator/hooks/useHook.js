/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
export const useHook = (type, method, args) => {
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
};
