/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { title, code } from './constants';
import { buildIndex } from './hooks/buildIndex';
import { updateState } from './hooks/updateState';
import { collectTotals } from './hooks/collectTotals';
import { StepComponent } from './StepComponent';
import { SummaryComponent } from './SummaryComponent';
import { usePlayerSync } from './hooks/usePlayerSync';
import { usePlayerInitParams } from './hooks/usePlayerInitParams';

export default {
    title,
    code,
    buildIndex,
    updateState,
    collectTotals,
    usePlayerSync,
    usePlayerInitParams,
    StepComponent,
    SummaryComponent,
};
