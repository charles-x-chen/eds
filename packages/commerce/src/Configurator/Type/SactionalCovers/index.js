/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import StepCover from '../../Step/Cover';
import StepSummary from '../../Step/Summary';
import StepPieces from '../../Step/Pieces';
import { StepNavigator } from '../../View/StepNavigator';
import { code, title } from './constants';
import { usePlayerInitParams } from './hooks/usePlayerInitParams';
import { PlayerToolbar } from './Toolbar/PlayerToolbar';
import query from './gql/configurator.gql';

const steps = [StepPieces, StepCover, StepSummary];

export default {
    code,
    title,
    steps,
    query,
    usePlayerInitParams,
    PlayerToolbar,
    View: StepNavigator,
};
