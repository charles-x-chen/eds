/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { getPiecesTitle } from '../../../calculator';

export const collectTotals = ({ options: prevOptions }, { pieces: statePieces }, index) => {
    const objects = prevOptions.objects ? [...prevOptions.objects] : [];
    const options = { ...prevOptions, pieces: statePieces, objects };

    return {
        title: getPiecesTitle(index, options),
        options,
    };
};
