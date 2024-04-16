import styles from './headline-and-four-images.module.css';

export function generateHeadlineFourImgDOM(props) {
    // Extract properties, always same order as in model, empty string if not set
    const [title, img1, link1, text1, img2, link2, text2, img3, link3, text3, img4, link4, text4] = props;
    // Build DOM
    const headlineFourImgDOM = document.createRange().createContextualFragment(`
        <div class=${styles.parentContainer}>
            <div>
                <p class=${styles.headline}>${title.textContent}</p>
            </div>
            <div class=${styles.imagesContainer}>
                <div class=${styles.imagesDiv}>
                    <div class=${styles.imageBlock}>
                        <a href="${link1.textContent}">${img1.innerHTML}</a>
                        <a href=${link1.textContent} class=${styles.link}> ${text1.textContent}</a>
                    </div>
                    <div class=${styles.imageBlock}>
                        <a href="${link2.textContent}">${img2.innerHTML}</a>
                        <a href=${link2.textContent} class=${styles.link}> ${text2.textContent}</a>
                    </div>
                </div>

                <div class=${styles.imagesDiv}>
                    <div class=${styles.imageBlock}>
                        <a href="${link3.textContent}">${img3.innerHTML}</a>
                        <a href=${link3.textContent} class=${styles.link}> ${text3.textContent}</a>
                    </div>
                    <div class=${styles.imageBlock}>
                        <a href="${link4.textContent}">${img4.innerHTML}</a>
                        <a href=${link4.textContent} class=${styles.link}> ${text4.textContent}</a>
                    </div>
                </div>
            </div>
        </div>
    `);

    return headlineFourImgDOM;
}

export default function decorate(block) {
    // get the first and only cell from each row
    const props = [...block.children].map((row) => row.firstElementChild);
    const headlineFourImgDOM = generateHeadlineFourImgDOM(props, block.classList);
    block.classList.add(styles.headlineFourImgBlock);
    block.parentNode.classList.add(styles.parent);
    block.parentNode.parentNode.classList.add(styles.headlineFourImgSection);
    block.textContent = '';
    block.append(headlineFourImgDOM);
}
