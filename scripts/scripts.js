import { decorateButtons, decorateIcons, decorateSections, decorateBlocks, updateSectionsStatus } from './aem';

/**
 * Moves all the attributes from a given elmenet to another given element.
 * @param {Element} from the element to copy attributes from
 * @param {Element} to the element to copy attributes to
 */
export function moveAttributes(from, to, attributes) {
    if (!attributes) {
        attributes = [...from.attributes].map(({ nodeName }) => nodeName);
    }
    for (const attr of attributes) {
        const value = from.getAttribute(attr);
        if (value) {
            to.setAttribute(attr, value);
            from.removeAttribute(attr);
        }
    }
}

/**
 * Move instrumentation attributes from a given element to another given element.
 * @param {Element} from the element to copy attributes from
 * @param {Element} to the element to copy attributes to
 */
export function moveInstrumentation(from, to) {
    moveAttributes(
        from,
        to,
        [...from.attributes]
            .map(({ nodeName }) => nodeName)
            .filter((attr) => attr.startsWith('data-aue-') || attr.startsWith('data-richtext-')),
    );
}

/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */
function buildAutoBlocks() {
    try {
        // TODO: add auto block, if needed
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Auto Blocking failed', error);
    }
}

function decorateExternalLinks(main) {
    for (const link of main.getElementsByTagName('a')) {
        if (isExternalURL(link.href)) {
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
        }
    }
}

function isExternalURL(url) {
    return new URL(url, location.origin).origin !== location.origin;
}

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
export function decorateMain(main) {
    decorateButtons(main);
    decorateIcons(main);
    buildAutoBlocks(main);
    decorateSections(main);
    decorateBlocks(main);
    updateSectionsStatus(main);
    decorateExternalLinks(main);
}
