import loadConfig from '../../scripts/utils/loadConfig';

export default function preload() {
    return loadConfig('/config.json');
}
