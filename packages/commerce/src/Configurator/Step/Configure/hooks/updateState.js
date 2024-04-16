/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { INIT, LOAD } from '../../../Context/State';
import {
    HIDE_INSTRUCTIONAL_MODAL,
    SET_CONFIGURATION,
    SET_CONFIGURATION_CHANGED,
    SET_CONFIGURATION_TYPE,
    SET_PIECES,
    SET_SELECTED_PIECE,
    TYPE_CUSTOM,
    TYPE_PREBUILT,
    RESET_CONFIGURATION,
} from '../constants';
import { SET_ARM_STYLE } from '../../SideStyleArm/constants';
import { SET_BACK_STYLE } from '../../SideStyleBack/constants';

export const updateState = (
    state,
    {
        preBuilt: indexPreBuilt,
        fills: {
            standard: { pieces: indexPieces },
        },
        saved,
        defaultConfiguration,
        defaultConfigurationType,
    },
    { type: actionType = null, value = null, sideStyles = null },
) => {
    switch (actionType) {
        case INIT: {
            // set default configure tab
            state.configurationType = defaultConfigurationType;
            // set default preBuilt configuration
            state.configuration = defaultConfiguration;
            state.pieces = getPreBuiltPieces(state, indexPreBuilt, indexPieces);
            state.selectedPiece = null;
            state.showInstructionalModal = true;
            state.isConfiguratorChanged = false;
            state.savedConfigurationId = null;
            state.sideStyles = null;
            break;
        }
        case RESET_CONFIGURATION: {
            state.configuration = defaultConfiguration;
            state.pieces = getPreBuiltPieces(state, indexPreBuilt, indexPieces);
            state.selectedPiece = null;
            state.isConfiguratorChanged = false;
            state.savedConfigurationId = null;
            break;
        }
        case LOAD: {
            const { configuration = null, id = null } = saved;
            state.configurationType = configuration ? TYPE_PREBUILT : TYPE_CUSTOM;
            if (configuration === 'custom') {
                state.configurationType = TYPE_CUSTOM;
                state.savedConfigurationId = id;
                state.isConfiguratorChanged = true;
                state.showInstructionalModal = false;
            } else if (configuration && indexPreBuilt[configuration]) {
                state.configurationType = TYPE_PREBUILT;
                state.configuration = configuration;
            } else {
                // legacy configuration, try to guess the configuration by pieces
                state.configurationType = TYPE_PREBUILT;
                const savedQtys = {
                    seat: 0,
                    side: 0,
                };
                for (const { type = null } of saved.items) {
                    if (type in savedQtys) {
                        savedQtys[type] += 1;
                    }
                }
                for (const configuration in indexPreBuilt) {
                    const preBuiltQtys = {
                        seat: 0,
                        side: 0,
                    };
                    const indexPieces = indexPreBuilt[configuration].pieces;
                    for (const piece in indexPieces) {
                        const type = piece.split('_')[1];
                        if (type in preBuiltQtys) {
                            preBuiltQtys[type] += indexPieces[piece];
                        }
                    }

                    let match = true;
                    for (const type in savedQtys) {
                        if (savedQtys[type] !== preBuiltQtys[type]) {
                            match = false;
                        }
                    }
                    if (match) {
                        state.configuration = configuration;
                        break;
                    }
                }
            }

            state.pieces = getPreBuiltPieces(state, indexPreBuilt, indexPieces);
            break;
        }
        case SET_CONFIGURATION_TYPE: {
            state.configurationType = value;
            state.isConfiguratorChanged = false;
            state.selectedPiece = null;
            state.pieces = getPreBuiltPieces(state, indexPreBuilt, indexPieces);
            state.savedConfigurationId = null;
            break;
        }
        case SET_CONFIGURATION: {
            state.configuration = value;
            state.pieces = getPreBuiltPieces(state, indexPreBuilt, indexPieces);
            state.isConfiguratorChanged = false;
            break;
        }
        case SET_ARM_STYLE:
        case SET_BACK_STYLE: {
            if (state.configurationType === TYPE_PREBUILT || state.armStyleChanged || state.backStyleChanged) {
                state.pieces = getPreBuiltPieces(state, indexPreBuilt, indexPieces);
            }
            break;
        }
        case SET_SELECTED_PIECE: {
            state.selectedPiece = value;
            break;
        }
        case SET_PIECES: {
            state.pieces = getCustomPieces(value, indexPieces);
            state.sideStyles = sideStyles;
            if (state.previous.pieces !== state.pieces && !state.isConfiguratorChanged) {
                state.isConfiguratorChanged = true;
            }
            break;
        }
        case HIDE_INSTRUCTIONAL_MODAL: {
            state.showInstructionalModal = false;
            break;
        }
        case SET_CONFIGURATION_CHANGED: {
            state.isConfiguratorChanged = true;
        }
    }
};

const getPreBuiltPieces = (state, indexPreBuilt, indexPieces) => {
    const { configuration, armStyle = null, backStyle = null } = state;

    const newPieces = indexPreBuilt[configuration].pieces;
    const pieces = {};
    for (const pieceKey in indexPieces) {
        pieces[pieceKey] = newPieces[pieceKey] || 0;
    }

    const armSideQty = Math.min(pieces['standard_side'], 2);
    let backSideQty = pieces['standard_side'] - armSideQty;
    if (configuration.includes('6Seats7Sides')) {
        backSideQty -= 2;
    }

    if (backStyle === 'angled') {
        pieces['deepAngled_side'] += pieces['deep_side'];
        pieces['deep_side'] = 0;
        pieces['standard_side'] -= backSideQty;
        pieces['angled_side'] += backSideQty;
        pieces['angled_sidePillow'] +=
            configuration.includes('7Seats8Sides') || configuration.includes('9Seats10Sides') ? 2 : 0;
    }

    if (armStyle === 'rollArm') {
        pieces['standard_side'] -= armSideQty;
        pieces['rollArm_side'] += armSideQty;
    } else if (armStyle === 'angled') {
        pieces['standard_side'] -= armSideQty;
        pieces['angled_side'] += armSideQty;
        pieces['angled_sidePillow'] += 2;

        if (configuration.includes('4Seats6Sides')) {
            pieces['deep_backPillow'] = 0;
        }
    }

    return pieces;
};

const getCustomPieces = (newPieces, indexPieces) => {
    const pieces = {};
    for (const pieceKey in indexPieces) {
        pieces[pieceKey] = newPieces[pieceKey] || 0;
    }
    return pieces;
};
