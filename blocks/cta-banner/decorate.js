const variantsGlob = import.meta.glob('./variants/*.module.css', { eager: true });

const variants = Object.fromEntries(
    Object.entries(variantsGlob).map(([path, module]) => [
        path.replace('./variants/', '').replace('.module.css', ''),
        module.default,
    ]),
);

export default function decorateCtaBanner(block, isDesktop, elements, variantName) {
    const [title, subtitle, text, cta1, cta2, imageDesktop, imageMobile, videoDesktop, videoMobile] = elements;
    const imageCandidates = isDesktop ? [imageDesktop, imageMobile] : [imageMobile, imageDesktop];
    const image = imageCandidates
        .map((image) => image.querySelector('picture'))
        .find(Boolean)
        ?.cloneNode(true);
    const videoCandidates = isDesktop ? [videoDesktop, videoMobile] : [videoMobile, videoDesktop];
    const video = videoCandidates.map((video) => video.querySelector('a')).find(Boolean);
    const variant = variants[variantName] || {};

    const params = {
        variant,
        title,
        subtitle,
        text,
        cta1,
        cta2,
        image,
        video,
    };

    if (variant.block) {
        block.classList.add(variant.block);
    }
    const decorator = variant.decorator || decorateDefault;

    const result = decorator(params);
    block.replaceChildren(...result);
}

function decorateDefault({ variant, image, video, title, subtitle, text, cta1, cta2 }) {
    const mediaWrapper = document.createElement('div');
    if (variant.media) {
        mediaWrapper.classList.add(variant.media);
    }
    if (image) {
        mediaWrapper.append(image);
    }

    if (video) {
        const media = document.createElement('video');
        const params = video.textContent?.split(',') || [];
        for (const param of params) {
            media.setAttribute(param.trim(), '');
        }
        media.title = video.title;
        media.src = video.href;
        mediaWrapper.append(media);
    }

    const ctaWrapper = document.createElement('div');
    ctaWrapper.append(cta1, cta2);
    if (variant.cta) {
        ctaWrapper.classList.add(variant.cta);
    }

    const contentWrapper = document.createElement('div');
    contentWrapper.append(title, subtitle, text, ctaWrapper);
    if (variant.content) {
        contentWrapper.classList.add(variant.content);
    }

    return [mediaWrapper, contentWrapper];
}
