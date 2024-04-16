import decorateCtaBanner from './decorate';

export default async function decorate(block) {
    const variant = block.classList[1];
    const elements = [...block.children].map((row) => row.firstElementChild);

    const media = window.matchMedia('(min-width: 900px)');
    media.onchange = (event) => {
        decorateCtaBanner(block, event.matches, elements, variant);
    };

    decorateCtaBanner(block, media.matches, elements, variant);
}
