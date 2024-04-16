import { createOptimizedPicture } from '../../scripts/aem';
import './cards.css';
import { moveInstrumentation } from '../../scripts/scripts';

export default function decorate(block) {
    /* change to ul, li */
    const ul = document.createElement('ul');
    for (const row of [...block.children]) {
        const li = document.createElement('li');
        moveInstrumentation(row, li);
        while (row.firstElementChild) li.append(row.firstElementChild);
        for (const div of [...li.children]) {
            if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
            else div.className = 'cards-card-body';
        }
        ul.append(li);
    }
    for (const img of Array.from(ul.querySelectorAll('img'))) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '550' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        for (const attr of ['itemtype', 'itemprop']) {
            optimizedPic.lastElementChild.setAttribute(attr, img.getAttribute(attr));
        }
        img.closest('picture').replaceWith(optimizedPic);
    }
    block.textContent = '';
    block.append(ul);
}
