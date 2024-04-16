import './image-overlay.css';

export function generateImageOverlayDOM(props) {
    // Extract properties, always same order as in model, empty string if not set
    const [pictureContainer, mobilePictureContainer, title, subtitle, longDescr, buttonType, cta1] = props;
    const picture = pictureContainer.querySelector('picture');
    const mobilePicture = mobilePictureContainer.querySelector('picture');
    cta1.firstChild.classList.add('cta');
    cta1.querySelector('.button').classList.add('cta', buttonType.innerText);

    // Build DOM
    const overlayDOM = document.createRange().createContextualFragment(`
        <div class='background'>
            <div class='desktop-image'>${picture ? picture.outerHTML : ''}</div>
            <div class='mobile-image'>${mobilePicture ? mobilePicture.outerHTML : ''}</div>
        </div>
        <div class='foreground'>
            <div class='text'>
                <h2 class='title'>${title.innerHTML}</h2>
                <h3 class='subtitle'>${subtitle.innerHTML}</h3>
                ${cta1.innerHTML}
                <h4 class='long-description'>${longDescr.innerHTML}</h4>
            </div>
        </div>
    `);

    // add final overlay DOM and classes if used as child component
    return overlayDOM;
}

export default function decorate(block) {
    // get the first and only cell from each row
    const props = [...block.children].map((row) => row.firstElementChild);
    const overlayDOM = generateImageOverlayDOM(props);
    block.textContent = '';
    block.append(overlayDOM);
}
