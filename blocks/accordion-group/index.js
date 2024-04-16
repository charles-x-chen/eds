import { generateAccordionDOM } from '../accordion/index';
import './accordion-group.css';

export default function decorate(block) {
    // each row is an accordion entry
    const accordions = [...block.children];

    // loop through all accordion blocks
    [...accordions].map((accordion) => {
        // generate the accordion
        const accordionDOM = generateAccordionDOM(accordion);
        // empty the content, keep root element with UE instrumentation
        accordion.textContent = '';
        // add block classes
        accordion.classList.add('accordion', 'block');
        accordion.append(accordionDOM);
    });
}
