import { moveInstrumentation } from '../../scripts/scripts';
import styles from './hero.module.css';

export default function decorate(block) {
    const [overlay, ...slides] = [...block.children];
    block.classList.add(styles.root);

    const slider = document.createElement('div');
    slider.classList.add(styles.slider);
    slider.role = 'presentation';
    slider.append(...slides);
    block.appendChild(slider);

    overlay.classList.add(styles.overlay);
    const ratings = Array.from(overlay.querySelectorAll('a[href="#reviews-block-link"]'));
    if (ratings.length) {
        renderRating(ratings);
    }

    loadNextImage(slider);

    if (slides.length >= 2) {
        const animationSlide = slides[0].cloneNode(true);
        if (animationSlide.dataset.aueType) {
            instrumentationCleanUp(animationSlide);
        }
        slider.append(animationSlide);
        animate(slider, slides.length);
    }
}

function animate(slider, qty) {
    let index = 0;

    const nextSlide = () => {
        const showIndex = index + 1;
        const offset = -showIndex * 100;
        slider.style.transform = `translateX(${offset}%)`;
        index = showIndex % qty;
        setTimeout(() => loadNextImage(slider), 3000);

        if (index === 0) {
            setTimeout(() => {
                slider.style.transition = 'none';
                slider.style.transform = 'translateX(0)';
                setTimeout(() => {
                    slider.style.transition = null;
                }, 200);
            }, 600);
        }
    };

    setInterval(nextSlide, 5000);
    setTimeout(() => loadNextImage(slider), 3000);
}

function loadNextImage(slider) {
    const next = slider.querySelector('img[loading=lazy]');
    if (next) {
        next.loading = 'eager';
    }
}

function instrumentationCleanUp(slide) {
    const aemCleanup = [slide, ...slide.querySelectorAll('*[data-aue-type], *[data-richtext-prop]')];
    for (const element of aemCleanup) {
        moveInstrumentation(element, document.createElement('div'));
    }
}

async function renderRating(ratings) {
    const [{ default: render }, { default: StarRating }] = await Promise.all([
        import('~/render'),
        import('~/Reviews/HeroRating'),
    ]);
    for (const elem of ratings) {
        const { parentNode } = elem;
        const sku = elem.innerText;
        parentNode.replaceChildren();
        render(parentNode, StarRating, { sku });
    }
}
