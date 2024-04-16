/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */

export const collectTotals = ({ options: prevOptions }, { fabricLeadTime, fabricId }, index) => {
    return {
        title: index.fabricOptions[fabricLeadTime][fabricId].name,
        options: { ...prevOptions, fabricLeadTime, fabricId },
    };
};
