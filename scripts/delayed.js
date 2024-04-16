import { fetchPlaceholders, loadScript, sampleRUM } from './aem';

// Core Web Vitals RUM collection
sampleRUM('cwv');

async function loadCookieBot() {
    const placeholders = await fetchPlaceholders();
    // Add cookie consent banner on all pages
    const { cookiebotid } = placeholders;
    if (cookiebotid) {
        loadScript('https://consent.cookiebot.com/uc.js', {
            type: 'text/javascript',
            id: 'Cookiebot',
            'data-cbid': `${cookiebotid}`,
            'data-blockingmode': 'auto',
        });
    }

    // Check if the element with data-cookie-declaration exists in the DOM
    const cookieContainer = document.querySelector('[data-cookie-declaration]');
    if (cookieContainer && cookiebotid && !window.location.host.startsWith('localhost')) {
        const cookieDeclarationScript = loadScript(`https://consent.cookiebot.com/${cookiebotid}/cd.js`, {
            type: 'text/javascript',
            id: 'CookieDeclaration',
            async: true,
        });

        cookieContainer.append(cookieDeclarationScript);
    }
}

// add more delayed functionality here
loadCookieBot();
