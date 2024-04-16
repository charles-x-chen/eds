/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */

export const collectTotals = ({ options: prevOptions }, { pieces: statePieces, piece }, { pieces: indexPieces }) => {
    const { name: title } = indexPieces[piece];
    const options = { ...prevOptions, pieces: statePieces };

    return {
        title,
        options,
    };
};
