/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useMemo } from 'preact/hooks';
import { useTotalsContext } from '../../Context/Totals';
import { capitalize } from '../../calculator';
import SummaryLine from '../../View/SummaryLine';

export const SummaryComponent = ({ stepIndex }) => {
    const {
        modules: {
            configure: { price, options },
        },
    } = useTotalsContext();

    const summaryOptions = useMemo(
        () => [
            {
                title: options ? getTitle(options) : null,
                price,
            },
        ],
        [options, price],
    );

    return <SummaryLine stepIndex={stepIndex} options={summaryOptions} />;
};

const getTitle = ({ pieces = null }) => {
    const piecesArray = [];
    const theOnlyPiece = Object.values(pieces).filter((qty) => qty > 0).length <= 1;

    for (const [key, value] of Object.entries(pieces)) {
        if (value > 0 && (theOnlyPiece || !key.includes('Pillow'))) {
            const label = key.split('_');
            piecesArray.push(capitalize(`${value} ${label[0]} ${label[1]}${value >= 2 ? 's' : ''}`));
        }
    }

    return piecesArray.join(' + ');
};
