/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { title, code } from './constants';
import { StepComponent } from './StepComponent';
import { buildIndex } from './hooks/buildIndex';
import { updateState } from './hooks/updateState';
import { collectTotals } from './hooks/collectTotals';
import { usePlayerInitParams } from './hooks/usePlayerInitParams';
import { usePlayerSync } from './hooks/usePlayerSync';

export default {
    title,
    code,
    buildIndex,
    updateState,
    usePlayerInitParams,
    usePlayerSync,
    collectTotals,
    StepComponent,
};
