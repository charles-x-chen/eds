/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */

export const collectTotals = ({ options: prevOptions }, { fill: stateFill }, index) => {
    return {
        title: index.fills[stateFill].name,
        options: { ...prevOptions, fill: stateFill },
    };
};
