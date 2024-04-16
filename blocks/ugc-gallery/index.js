import { loadScript, readBlockConfig } from '../../scripts/aem';

let ugcNumber = 1;

export default async function decorate(block) {
    const { apiKey, widgetId } = readBlockConfig(block);
    if (!apiKey || !widgetId) {
        return;
    }

    block.replaceChildren();
    block.id = `ugc-${ugcNumber}`;
    block.style.display = 'block';

    ugcNumber++;

    const observer = new IntersectionObserver((entries) => {
        if (entries.some((e) => e.isIntersecting)) {
            observer.disconnect();
            loadUgc(block.id, apiKey, widgetId);
        }
    });
    observer.observe(block);
}

async function loadUgc(containerId, apiKey, widgetId) {
    if (!window.Pixlee) {
        await loadScript('https://assets.pxlecdn.com/assets/pixlee_widget_1_0_0.js');
        window.Pixlee.init({ apiKey });
    }
    window.Pixlee.addSimpleWidget({ widgetId, containerId });
    window.Pixlee.resizeWidget();
}
