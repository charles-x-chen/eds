/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import StepConfigure from '../../Step/Configure';
import StepCover from '../../Step/Cover';
import StepAccessories from '../../Step/Accessories';
import StepSummary from '../../Step/Summary';
import { StepNavigator } from '../../View/StepNavigator';
import { code, title } from './constants';
import { usePlayerInitParams } from './hooks/usePlayerInitParams';
import { PlayerToolbar } from './Toolbar/PlayerToolbar';
import { Thumbnails } from './Thumbnails';

const steps = [StepConfigure, StepCover, StepAccessories, StepSummary];

export default {
    code,
    title,
    steps,
    usePlayerInitParams,
    PlayerToolbar,
    Thumbnails,
    View: StepNavigator,
};
