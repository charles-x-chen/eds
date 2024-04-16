/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useMemo } from 'preact/hooks';
import { useTotalsContext } from '../../Context/Totals';
import SummaryLine from '../../View/SummaryLine';
import { getPiecesStepTitle } from '../../calculator';

export const SummaryComponent = ({ stepIndex }) => {
    const {
        modules: {
            pieces: { options: totalsOptions },
        },
    } = useTotalsContext();

    const options = useMemo(
        () => [
            {
                title: totalsOptions ? getPiecesStepTitle(totalsOptions) : null,
            },
        ],
        [totalsOptions],
    );

    return <SummaryLine stepIndex={stepIndex} options={options} />;
};
