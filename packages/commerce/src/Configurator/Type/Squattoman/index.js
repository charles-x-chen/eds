/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import StepCover from '../../Step/Cover';
import StepPiece from '../../Step/Piece';
import StepQty from '../../Step/Qty';
import { View } from './View';
import { usePlayerInitParams } from './hooks/usePlayerInitParams';
import { code, title } from './constants';
import { PlayerToolbar } from './Toolbar/PlayerToolbar';
import { Thumbnails } from './Thumbnails';
import query from './gql/configurator.gql';

const steps = [StepCover, StepPiece];

export default {
    code,
    title,
    steps,
    query,
    extra: [StepQty],
    PlayerToolbar,
    Thumbnails,
    usePlayerInitParams,
    View,
};
