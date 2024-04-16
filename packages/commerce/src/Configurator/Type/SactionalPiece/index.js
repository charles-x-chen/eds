/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import StepCover from '../../Step/Cover';
import StepAccessories from '../../Step/Accessories';
import StepSummary from '../../Step/Summary';
import StepConfigure from '../../Step/Configure';
import StepOptions from '../../Step/Options';
import StepFill from '../../Step/Fill';
import StepQty from '../../Step/Qty';
import { View } from './View';
import { PlayerToolbar } from './Toolbar/PlayerToolbar';
import { usePlayerInitParams } from './hooks/usePlayerInitParams';
import { Thumbnails } from './Thumbnails';
import { code, title } from './constants';
import query from './gql/configurator.gql';

const steps = [StepCover, StepOptions, StepFill, StepAccessories, StepSummary];

export default {
    code,
    query,
    title,
    steps,
    extra: [StepConfigure, StepQty],
    usePlayerInitParams,
    PlayerToolbar,
    Thumbnails,
    View,
};
