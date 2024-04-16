/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */

export const collectTotals = (
    { options: prevOptions },
    { pieces: statePieces, piece },
    { pieces: indexPieces, type: { code } },
) => {
    const { name: title } = indexPieces[piece];
    const isCoversOnly = !!code.includes('Cover');
    const options = {
        ...prevOptions,
        pieces: statePieces,
        coversOnly: isCoversOnly,
    };

    return {
        title,
        options,
    };
};
