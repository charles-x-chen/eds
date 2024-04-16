import getNav from './nav';
import getBanners from './banner';

/**
 * decorates the header, mainly the nav
 * @param {Element} block The header block element
 * @param {Array<Element>} fragments
 */
export default async function decorate(block, fragments) {
    const [navFragment, bannersFragment] = fragments;

    if (navFragment) {
        block.append(...getNav(navFragment));
    }
    if (bannersFragment) {
        block.append(...getBanners(bannersFragment));
    }
}
