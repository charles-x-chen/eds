import './accordion.css';

/* this function also gets called by accordion-group */
export function generateAccordionDOM(block) {
    const details = document.createElement('details');
    const summary = document.createElement('summary');
    details.append(summary);
    let summaryText;
    Array.from(block.children).map((element, i) => {
        if (i === 0) {
            summaryText = element.textContent.trim();
        } else if (i === 1) {
            const heading = document.createElement(element.textContent.trim());
            heading?.append(summaryText);
            summary.append(heading);
        } else {
            details.append(element);
        }
    });
    return details;
}

export default function decorate(block) {
    const dom = generateAccordionDOM(block);
    block.textContent = '';
    block.append(dom);
}
