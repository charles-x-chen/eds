import loadDynamicFragment from '../../scripts/utils/loadDynamicFragment';

export default async function preload() {
    const promises = [loadDynamicFragment('header'), loadDynamicFragment('banner')];
    return (await Promise.allSettled(promises)).map((fragment) => fragment.value);
}
