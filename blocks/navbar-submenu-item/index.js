import './navbar-submenu-item.css';

/**
 * Creates DOM for Submenu Item
 * @param {Array} props All submenu properties
 */
export function generateSubmenuItemDOM(props) {
    // Extract properties, always same order as in model, empty string if not set
    const [imageType, descr, firstImage, firstCta, firstCtaLink, secondImage, secondCta, secondCtaLink] = props;

    const submenuContent = document.createElement('div');
    submenuContent.classList.add('submenu-content');
    if (descr?.innerHTML.trim() !== '') submenuContent.append(descr);
    const row = document.createElement('div');
    row.classList.add('row');

    // Append first div if properties are available
    if (
        firstImage?.innerHTML.trim() !== '' ||
        firstCta?.innerHTML.trim() !== '' ||
        firstCtaLink?.innerHTML.trim() !== ''
    ) {
        const firstDiv = document.createElement('div');
        const a1 = document.createElement('a');
        a1.href = firstCtaLink?.querySelector('a')?.href || firstCtaLink?.innerText.trim();
        a1.title = firstCta?.innerText.trim();
        a1.append(firstImage);
        a1.append(firstCta);
        firstDiv.append(a1);
        row.append(firstDiv);

        if (imageType?.textContent.trim() === 'background') {
            a1.classList.add('button');

            const imageSrc = firstImage.querySelector('img')?.src;
            imageSrc && (submenuContent.style.backgroundImage = `url(${imageSrc})`);

            submenuContent.classList.add('bg-image');
            submenuContent.append(row);
        } else {
            // Append second div if properties are available
            if (
                secondImage?.innerHTML.trim() !== '' &&
                secondCta?.innerHTML.trim() !== '' &&
                secondCtaLink?.innerHTML.trim() !== ''
            ) {
                const secondDiv = document.createElement('div');
                const a2 = document.createElement('a');
                a2.href = secondCtaLink?.querySelector('a')?.href || secondCtaLink?.innerText.trim();
                a2.title = secondCta?.innerText.trim();
                a2.append(secondImage);
                a2.append(secondCta);
                secondDiv.append(a2);
                row.append(secondDiv);
            }
            submenuContent.append(row);
        }
    }

    return submenuContent;
}

export default function decorate(block) {
    const props = [...block.children].map((row) => row.firstElementChild);

    const submenuContainer = document.createElement('div');
    submenuContainer.classList.add('submenu-container');
    const submenuItemDOM = generateSubmenuItemDOM(props);

    submenuContainer.append(submenuItemDOM);
    block.textContent = '';
    block.append(submenuContainer);
}
