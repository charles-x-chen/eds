import { readBlockConfig } from '../../scripts/aem';
import loadConfig from '../../scripts/utils/loadConfig';
import Configurator from '~/Configurator';
import render from '~/render';
import './configurator.css';

export default async function decorate(block) {
    const { config: path } = readBlockConfig(block);
    block.innerHTML = '';

    const config = await loadConfig(path, 'key', 'value');
    const options = await getOptions(config);
    render(block, Configurator, options);
}

async function getOptions(config) {
    const { basePath } = config;
    const dynamicPath = location.pathname.replace(basePath, '').replace(/^\/+|\/+$/g, '');
    const params = dynamicPath.split('/').reduce((acc, val, idx, arr) => {
        if (idx % 2 === 0 && val) {
            acc[val] = arr[idx + 1];
        }
        return acc;
    }, {});

    const promises = [
        loadConfig(config.messages, 'Key', 'Text'),
        loadConfig(config.steps, 'code'),
        loadConfig(config.global, 'key', 'value'),
    ];

    const [messages, steps, global] = await Promise.all(promises);
    return { basePath, params, messages, steps, config, global };
}
