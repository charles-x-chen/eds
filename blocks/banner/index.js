import styles from './banner.module.css';

let modalNumber = 1;

export default async function decorate(block) {
    block.classList.add(styles.root);

    for (const [message, title, content] of [...block.children].map((child) => child.children)) {
        const modalId = `banner-${modalNumber}`;
        modalNumber += 1;

        const modalContent = document.createElement('div');
        modalContent.append(title, content);
        modalContent.classList.add(styles.modalContent);
        message.append(modalContent);

        title.classList.add(styles.title);
        content.classList.add(styles.content);
        message.addEventListener('click', async (e) => {
            e.preventDefault();
            const { getModal } = await import('../modal');
            const modal = getModal(modalId, () => modalContent);
            document.getElementById(modalId).classList.add(styles.bannerModalWrapper);
            modal.showModal();
        });
    }

    const slides = [...block.children];
    const slider = document.createElement('div');
    slider.classList.add(styles.slider);
    slider.role = 'presentation';
    slider.append(...slides);
    block.replaceChildren(slider);

    if (slides.length >= 2) {
        const animationSlide = slides[0].cloneNode(true);
        delete animationSlide.dataset.aueResource;
        delete animationSlide.dataset.aueType;
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
}
