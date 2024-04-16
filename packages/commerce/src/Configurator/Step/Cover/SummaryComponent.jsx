/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useMemo } from 'preact/hooks';
import { useTotalsContext } from '../../Context/Totals';
import SummaryLine from '../../View/SummaryLine';

export const SummaryComponent = ({ stepIndex }) => {
    const {
        modules: {
            cover: { title, price },
        },
    } = useTotalsContext();

    const options = useMemo(
        () => [
            {
                title,
                price,
            },
        ],
        [title, price],
    );

    return <SummaryLine stepIndex={stepIndex} options={options} />;
};
