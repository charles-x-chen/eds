/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { TYPE_CUSTOM } from '../../Configure/constants';

export const collectTotals = (
    { options: prevOptions },
    { armStyle: stateArmStyle, configurationType = null, sideStyles = null },
    { armStyle: indexArmStyle },
) => {
    let title = indexArmStyle[stateArmStyle].name;

    if (configurationType === TYPE_CUSTOM) {
        title =
            (sideStyles?.ArmStyles || [])
                .map((text) => text.split(/(?=[A-Z])/).join(' '))
                .map((text) => `${text} Side`)
                .join(' + ') || title;
    }

    return {
        title,
        options: prevOptions,
    };
};
