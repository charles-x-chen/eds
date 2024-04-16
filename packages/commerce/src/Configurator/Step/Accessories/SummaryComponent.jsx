/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useMemo } from 'preact/hooks';
import { useTotalsContext } from '../../Context/Totals';
import SummaryLine from '../../View/SummaryLine';
import { useConfiguratorContext } from '../../Context/Configurator';
import { TYPE_SQUATTOMAN } from './constants';

export const SummaryComponent = ({ stepIndex }) => {
    const {
        modules: {
            accessories: { objects, types },
        },
    } = useTotalsContext();
    const { accessories } = useConfiguratorContext();

    const options = useMemo(() => {
        const lines = [];

        if (types[TYPE_SQUATTOMAN]) {
            let rowTotal = 0;
            let name = '';
            let squattomanObject;
            for (const object of objects) {
                if (object.type === TYPE_SQUATTOMAN) {
                    if (object.key) {
                        squattomanObject = object;
                        name = `${object.name}: ${object.first} `;
                    }
                    rowTotal += object.rowTotal;
                }
            }
            if (squattomanObject) {
                lines.push({ ...squattomanObject, rowTotal, name });
            }
        }

        for (const object of objects) {
            if (types[object.type] && object.type !== TYPE_SQUATTOMAN) {
                lines.push(object);
            }
        }

        return lines.map(({ key, type, rowTotal, qty }) => ({
            title: `${accessories[type][key].name} (x${qty})`,
            price: rowTotal,
        }));
    }, [objects, accessories, types]);

    return <SummaryLine stepIndex={stepIndex} options={options} />;
};
