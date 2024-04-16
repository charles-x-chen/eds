/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */

const types = {
    sactional: () => import('./Sactional'),
    sactionalCovers: () => import('./SactionalCovers'),
    sactionalPiece: () => import('./SactionalPiece'),
    sac: () => import('./Sac'),
    outdoorSactional: () => import('./OutdoorSactional'),
    squattoman: () => import('./Squattoman'),
    throwPillow: () => import('./ThrowPillow'),
    sactionalCover: () => import('./SactionalCover'),
    sacCover: () => import('./SacCover'),
    squattomanCover: () => import('./SquattomanCover'),
    throwPillowCover: () => import('./ThrowPillowCover'),
};

export default types;
