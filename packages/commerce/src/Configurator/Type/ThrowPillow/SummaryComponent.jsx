/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { SummaryLineEditButton } from '../../View/Summary';
import { useTotalsContext } from '../../Context/Totals';
import { Price } from '../../View/Price';

export const SummaryComponent = ({ stepIndex }) => {
    const { PillowSize, PillowSizeTitle } = useTotalsContext();

    return (
        <div className="summary-line item-4">
            <div className="title">{t`Size`}</div>
            <SummaryLineEditButton stepIndex={stepIndex} />
            <div className="price-container">
                <Price value={PillowSize} />
            </div>
            <div className="option-name">{PillowSizeTitle}</div>
        </div>
    );
};
