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
import query from './gql/configurator.gql';

const steps = [StepCover, StepPiece];

export default {
    code,
    title,
    query,
    steps,
    extra: [StepQty],
    usePlayerInitParams,
    View,
};
