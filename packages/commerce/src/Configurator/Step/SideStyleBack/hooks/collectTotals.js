/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { TYPE_CUSTOM } from '../../Configure/constants';

export const collectTotals = (
    { options: prevOptions },
    { backStyle: stateBackStyle, configurationType = null, sideStyles = null },
    { backStyle: indexBackStyle },
) => {
    let title = indexBackStyle[stateBackStyle].name;
    if (configurationType === TYPE_CUSTOM) {
        title =
            (sideStyles?.BackStyles || [])
                .map((text) => text.split(/(?=[A-Z])/).join(' '))
                .map((text) => `${text} Side`)
                .join(' + ') || title;
    }

    return {
        title,
        options: prevOptions,
    };
};
