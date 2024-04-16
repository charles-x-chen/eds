/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useMemo } from 'preact/hooks';
import { useTotalsContext } from '../../Context/Totals';
import SummaryLine from '../../View/SummaryLine';
import { TYPE_SUBWOOFER } from '../../Step/Options/constants';
import { useConfiguratorContext } from '../../Context/Configurator';

export const SummaryComponent = ({ stepIndex }) => {
    const {
        modules: {
            stealthtech: { title, price, objects },
        },
    } = useTotalsContext();
    const { options: indexOptions } = useConfiguratorContext();

    const options = useMemo(() => {
        const options = [
            {
                price,
                title,
            },
        ];
        const subwoofer = objects && objects.find((object) => object.type === TYPE_SUBWOOFER);
        if (subwoofer) {
            const { calculatedPrice, qty } = subwoofer;
            options.push({
                price: calculatedPrice * qty,
                title: `${indexOptions[TYPE_SUBWOOFER].name} (x${qty})`,
            });
        }

        return options;
    }, [price, title, objects, indexOptions]);

    return <SummaryLine stepIndex={stepIndex} options={options} />;
};
