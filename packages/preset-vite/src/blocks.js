/**
 * @package     BlueAcorn/PresetVite
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import fg from 'fast-glob';
import path from 'path';

export default function blocksPlugin() {
    const decorateId = 'virtual:blocks:decorate';
    const resolvedDecorateId = '\0' + decorateId;
    const preloadId = 'virtual:blocks:preload';
    const resolvedPreloadId = '\0' + preloadId;

    return {
        name: 'aem-blocks',
        resolveId(id) {
            if (id === decorateId) {
                return resolvedDecorateId;
            }
            if (id === preloadId) {
                return resolvedPreloadId;
            }
        },
        async load(id) {
            if (id === resolvedDecorateId) {
                const entries = await getBlocks('index');
                const map = entries.map(({ name, path }) => `'${name}': () => import('${path}')`);
                return `const entries = {${map.join(',')}}; export default entries;`;
            }
            if (id === resolvedPreloadId) {
                const entries = await getBlocks('preload');
                const imports = entries.map(({ path }, index) => `import var${index} from '${path}'`);
                const map = entries.map(({ name }, index) => `'${name}': var${index}`);
                return `${imports.join(';')}; const entries = {${map.join(',')}}; export default entries;`;
            }
        },
    };
}

async function getBlocks(type) {
    const entries = await fg(`./blocks/*/${type}.js`, { absolute: true });
    return entries.map((entry) => ({
        name: entry.split('/').at(-2),
        path: entry,
    }));
}
