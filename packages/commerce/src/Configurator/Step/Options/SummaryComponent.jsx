/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { useMemo } from 'preact/hooks';
import { useTotalsContext } from '../../Context/Totals';
import SummaryLine from '../../View/SummaryLine';
import { useConfiguratorContext } from '../../Context/Configurator';
import { TYPE_STORAGE_SEAT, TYPE_SUBWOOFER } from './constants';

export const SummaryComponent = ({ stepIndex }) => {
    const {
        modules: {
            options: { price, objects = [], types },
        },
    } = useTotalsContext();
    const { options: indexOptions } = useConfiguratorContext();

    const options = useMemo(() => {
        const lines = [];

        let storageSeatPrice = price;
        for (const object of objects) {
            if (types[object.type]) {
                lines.push(object);
                storageSeatPrice -= object.rowTotal;
            }
        }

        if (types[TYPE_STORAGE_SEAT]) {
            lines.unshift({
                name: t`Storage Seat`,
                rowTotal: storageSeatPrice,
                qty: types[TYPE_STORAGE_SEAT],
            });
        }

        return lines
            .filter((option) => option.type !== TYPE_SUBWOOFER)
            .map(({ name, type, rowTotal, qty }) => ({
                title: `${name || indexOptions[type]?.name} (x${qty})`,
                price: rowTotal,
            }));
    }, [price, objects, indexOptions, types]);

    return <SummaryLine stepIndex={stepIndex} options={options} />;
};
