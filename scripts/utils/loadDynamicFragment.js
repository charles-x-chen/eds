import { getMetadata } from '../aem';
import loadFragment from './loadFragment';

export default function loadDynamicFragment(name, defaultPath) {
    const navMeta = getMetadata(name);
    return loadFragment(navMeta || defaultPath);
}
