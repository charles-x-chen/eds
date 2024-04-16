import {
    sampleRUM,
    loadHeader,
    loadFooter,
    decorateTemplateAndTheme,
    waitForLCP,
    loadBlocks,
    loadCSS,
    initAem,
    loadScript,
} from './aem';
import { decorateMain } from './scripts';

/**
 * load page
 */
async function loadPage() {
    initAem();
    if (window.hlx.codeBasePath.includes('.resource')) {
        await import('./editor-support');
    }
    await loadEager(document);
    await loadLazy(document);
    loadDelayed();
}

/**
 * Loads everything needed to get to LCP (header and the first block).
 * @param {Element} doc The container element
 */
async function loadEager(doc) {
    document.documentElement.lang = 'en';
    decorateTemplateAndTheme();
    initializeDropins();

    try {
        /* if desktop (proxy for fast connection) or fonts already loaded, load fonts.css */
        if (window.innerWidth >= 900 || sessionStorage.getItem('fonts-loaded')) {
            loadFonts();
        }
    } catch (e) {
        // do nothing
    }

    const main = doc.querySelector('main');
    if (main) {
        decorateMain(main);
        document.body.classList.add('appear');
        const lcpLoader = waitForLCP();
        const headerLoader = loadHeader(doc.querySelector('header'));
        await Promise.all([lcpLoader, headerLoader]);
    }
}

async function initializeDropins() {
    const { default: init } = await import('./dropins');
    await init();
}

/**
 * Loads everything that doesn't need to be delayed.
 * @param {Element} doc The container element
 */
async function loadLazy(doc) {
    const main = doc.querySelector('main');
    await loadBlocks(main);

    const { hash } = window.location;
    const element = hash ? doc.getElementById(hash.substring(1)) : false;
    if (hash && element) element.scrollIntoView();

    loadFooter(doc.querySelector('footer'));

    loadScript('//lovesac.usablenet.com/pt/start');
    import('../styles/lazy-styles.css');
    loadFonts();

    sampleRUM('lazy');
    sampleRUM.observe(main.querySelectorAll('div[data-block-name]'));
    sampleRUM.observe(main.querySelectorAll('picture > img'));
}

/**
 * Loads everything that happens a lot later,
 * without impacting the user experience.
 */
function loadDelayed() {
    window.setTimeout(() => import('./delayed'), 3000);
    // load anything that can be postponed to the latest here
}

/**
 * load fonts.css and set a session storage flag
 */
async function loadFonts() {
    try {
        await loadCSS('https://use.typekit.net/pee8cij.css');
        if (!window.location.hostname.includes('localhost')) {
            sessionStorage.setItem('fonts-loaded', 'true');
        }
    } catch (e) {
        // do nothing
    }
}

if (import.meta.hot) {
    if (!window.hlxLoaded) {
        window.hlxLoaded = true;
        loadPage();
    }
} else {
    loadPage();
}
