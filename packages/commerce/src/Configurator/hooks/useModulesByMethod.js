/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useMemo } from 'preact/hooks';

export const useModulesByMethod = (type, method) => {
    return useMemo(() => {
        const modules = [];
        if (type[method]) {
            modules.push(type);
        }
        if (type.extra) {
            for (const step of type.extra) {
                if (step[method]) {
                    modules.push(step);
                }
            }
        }
        for (const step of type.steps) {
            if (step[method]) {
                modules.push(step);
            }
        }
        return modules;
    }, [type, method]);
};
