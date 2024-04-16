/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */

import { title, code } from '../Accessories/constants';
import { updateState } from '../Accessories/hooks/updateState';
import { collectTotals } from '../Accessories/hooks/collectTotals';
import { SummaryComponent } from '../Accessories/SummaryComponent';
import { buildIndex } from './hooks/buildIndex';
import { StepComponent } from './StepComponent';

export default {
    title,
    code,
    buildIndex,
    updateState,
    collectTotals,
    StepComponent,
    SummaryComponent,
};
