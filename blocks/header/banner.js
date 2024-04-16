export default function getBanners(fragment) {
    const banners = document.createElement('div');
    banners.classList.add('banners');
    while (fragment.firstElementChild) {
        banners.append(fragment.firstElementChild);
    }
    return [banners];
}
