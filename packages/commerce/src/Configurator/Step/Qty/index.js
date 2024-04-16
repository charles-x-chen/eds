/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { title, code } from './constants';
import { StepComponent } from './StepComponent';
import { updateState } from './hooks/updateState';
import { collectTotals } from './hooks/collectTotals';
import { SummaryComponent } from './SummaryComponent';

export default {
    title,
    code,
    updateState,
    collectTotals,
    StepComponent,
    SummaryComponent,
};
