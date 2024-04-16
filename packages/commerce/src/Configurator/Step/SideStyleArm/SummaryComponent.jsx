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
            styleArm: { title },
        },
    } = useTotalsContext();

    const options = useMemo(
        () => [
            {
                title,
            },
        ],
        [title],
    );

    return <SummaryLine stepIndex={stepIndex} options={options} />;
};
