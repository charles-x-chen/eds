/**
 * @package     BlueAcorn/PresetVite
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import postcssNesting from 'postcss-nesting';
import generateScopedName from 'mini-css-class-name/postcss-modules';

export default function postCssPlugin() {
    return {
        name: 'ba-postcss',
        config(_, { mode }) {
            const isProd = mode === 'production';
            return {
                css: {
                    modules: {
                        generateScopedName: isProd
                            ? generateScopedName({
                                  prefix: 'c-',
                              })
                            : null,
                    },
                    postcss: {
                        plugins: isProd ? [postcssNesting] : [],
                    },
                },
            };
        },
    };
}
