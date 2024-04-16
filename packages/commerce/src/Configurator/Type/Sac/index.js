/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import StepCover from '../../Step/Cover';
import StepSacAccessories from '../../Step/SacAccessories';
import StepSummary from '../../Step/Summary';
import StepSacSize from '../../Step/SacSize';
import { StepNavigator } from '../../View/StepNavigator';
import { code, title } from './constants';
import { usePlayerInitParams } from './hooks/usePlayerInitParams';
import { PlayerToolbar } from './Toolbar/PlayerToolbar';
import { Thumbnails } from './Thumbnails';
import query from './gql/configurator.gql';

const steps = [StepSacSize, StepCover, StepSacAccessories, StepSummary];

export default {
    code,
    query,
    title,
    steps,
    usePlayerInitParams,
    PlayerToolbar,
    Thumbnails,
    View: StepNavigator,
};
