/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */

export const buildIndex = (index) => {
    const styles = Object.fromEntries(index.armStyles.map((style) => [style.code, style]));
    const styleCandidates = [index.params?.arm, index.config?.armStyle, Object.keys(styles)[0]].filter(Boolean);
    index.armStyle = styles;
    index.defaultArmStyle = styleCandidates.find((style) => styles[style]);
};
