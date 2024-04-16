/**
 * @package     BlueAcorn/PresetVite
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { preact } from '@preact/preset-vite';
import graphqlOperationPlugin from './graphqlOperation.js';
import postCssPlugin from './postcss.js';
import serverPlugin from './server.js';
import blocksPlugin from './blocks.js';

export default function presetVite(options) {
    return [
        ...preact({
            include: [/\.[tj]sx$/],
        }),
        graphqlOperationPlugin(),
        postCssPlugin(),
        blocksPlugin(),
        serverPlugin(options),
    ];
}
