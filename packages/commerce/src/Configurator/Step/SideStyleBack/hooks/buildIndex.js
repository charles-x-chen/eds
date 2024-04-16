/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */

export const buildIndex = (index) => {
    const styles = Object.fromEntries(index.backStyles.map((style) => [style.code, style]));
    const styleCandidates = [index.params?.back, index.config?.backStyle, Object.keys(styles)[0]].filter(Boolean);
    index.backStyle = styles;
    index.defaultBackStyle = styleCandidates.find((style) => styles[style]);
};
