/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { getPiecesTitle } from '../../../calculator';

export const collectTotals = ({ options: prevOptions }, { pieces: statePieces }, index) => {
    const isCoversOnly = !!index.type.code.includes('Covers');
    const options = { ...prevOptions, pieces: statePieces, coversOnly: isCoversOnly };

    return {
        title: getPiecesTitle(index, options),
        options,
    };
};
