/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import StepCover from '../../Step/Cover';
import StepPiece from '../../Step/Piece';
import StepQty from '../../Step/Qty';
import { Thumbnails } from '../Sac/Thumbnails';
import { View } from './View';
import { usePlayerInitParams } from './hooks/usePlayerInitParams';
import query from './gql/configurator.gql';

const code = 'sacCover';
const steps = [StepCover, StepPiece];

export default {
    code,
    steps,
    query,
    extra: [StepQty],
    usePlayerInitParams,
    Thumbnails,
    View,
};
