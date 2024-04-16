import { loadBlocks } from '../aem';
import { decorateMain } from '../scripts';

const cache = {};

export default async function loadFragment(path) {
    const main = await load(path);
    if (main) {
        decorateMain(main);
        await loadBlocks(main);
        return main;
    }
    return null;
}

export function cacheFragment(path, main) {
    cache[path] = main;
}

async function load(path) {
    if (path && path.startsWith('/')) {
        if (cache[path]) {
            return cache[path];
        }

        const resp = await fetch(`${window.hlx.fragmentBasePath}${path}.plain.html`);
        if (resp.ok) {
            const main = document.createElement('main');
            main.innerHTML = await resp.text();
            // reset base path for media to fragment base
            const resetAttributeBase = (tag, attr) => {
                const media = Array.from(main.querySelectorAll(`${tag}[${attr}^="./media_"]`));
                for (const elem of media) {
                    elem[attr] = new URL(elem.getAttribute(attr), `${window.hlx.codeBasePath}${path}`).href;
                }
            };
            resetAttributeBase('img', 'src');
            resetAttributeBase('source', 'srcset');

            return main;
        }
    }

    return null;
}
