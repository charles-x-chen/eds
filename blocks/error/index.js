import { sampleRUM } from '../../scripts/aem';
import styles from './error.module.css';
import image from './error.svg';

export default async function decorate(block) {
    block.classList.add(styles.error);
    block.innerHTML = `
    <img src="${image}" alt="404" />
    <h2>404 Page Not Found</h2>
    <h3>Oops... This Wasn't Supposed to Happen.</h3>
    <p class="button-container">
        <a href="/" class="button secondary error-button-home">Go home</a>
        <a href="/" class="button error-button-back">Go back</a>
    </p>`;

    const backButton = block.querySelector('.error-button-back');
    const referrer = getReferrer();
    if (referrer) {
        backButton.href = referrer;
    } else {
        backButton.remove();
    }

    sampleRUM('404', { source: document.referrer, target: window.location.href });
}

function getReferrer() {
    if (document.referrer) {
        const { origin, pathname } = new URL(document.referrer);
        if (origin === window.location.origin) {
            return pathname;
        }
    }
    return null;
}
