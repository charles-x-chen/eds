/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */

import { useMemo } from 'preact/hooks';
import { useConfiguratorContext } from '../Context/Configurator';
import { calculateTotalPrice } from '../calculator';
import { useModulesByMethod } from './useModulesByMethod';

const defaultTotals = {
    total: 0,
    totalWithoutDiscount: 0,
    modules: {},
};

export const useTotals = (state, addSubtotals = true) => {
    const index = useConfiguratorContext();
    const modules = useModulesByMethod(index.type, 'collectTotals');

    return useMemo(() => {
        const totals = { ...defaultTotals, modules: {} };
        let previousTotal = { options: {}, total: 0 };

        for (const module of modules) {
            const moduleTotal = module.collectTotals(previousTotal, state, index);

            if (addSubtotals) {
                Object.assign(moduleTotal, calculateTotalPrice(index, moduleTotal.options));
                moduleTotal.price = moduleTotal.total - previousTotal.total;
            }

            moduleTotal.prevTotal = previousTotal;
            totals.modules[module.code] = moduleTotal;
            previousTotal = moduleTotal;
        }

        if (!addSubtotals) {
            Object.assign(previousTotal, calculateTotalPrice(index, previousTotal.options));
        }

        totals.last = previousTotal;
        totals.total = previousTotal.total;
        totals.totalWithoutDiscount = previousTotal.msrp;

        return totals;
    }, [index, modules, state, addSubtotals]);
};
