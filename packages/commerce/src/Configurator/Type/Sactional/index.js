/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import StepCover from '../../Step/Cover';
import StepAccessories from '../../Step/Accessories';
import StepSummary from '../../Step/Summary';
import SideStyleArm from '../../Step/SideStyleArm';
import SideStyleBack from '../../Step/SideStyleBack';
import StepConfigure from '../../Step/Configure';
import StepOptions from '../../Step/Options';
import StepFill from '../../Step/Fill';
import StepStealthtech from '../../Step/Stealthtech';
import { StepNavigator } from '../../View/StepNavigator';
import { code, title } from './constants';
import { usePlayerInitParams } from './hooks/usePlayerInitParams';
import { PlayerToolbar } from './Toolbar/PlayerToolbar';
import { Thumbnails } from './Thumbnails';
import query from './gql/configurator.gql';

const steps = [
    SideStyleArm,
    SideStyleBack,
    StepConfigure,
    StepCover,
    StepOptions,
    StepFill,
    StepStealthtech,
    StepAccessories,
    StepSummary,
];

export default {
    code,
    title,
    steps,
    query,
    usePlayerInitParams,
    Thumbnails,
    PlayerToolbar,
    View: StepNavigator,
};
