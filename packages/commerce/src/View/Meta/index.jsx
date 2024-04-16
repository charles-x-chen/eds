import { toChildArray } from 'preact';
import { useEffect } from 'preact/hooks';

export default function Meta({ children }) {
    useEffect(() => {
        const { head } = document;
        const childArray = toChildArray(children);

        const selectors = childArray.map(buildSelector).filter(Boolean);
        const existing = selectors.length ? Array.from(head.querySelectorAll(selectors.join(','))) : [];
        for (const el of existing) {
            head.removeChild(el);
        }

        const elements = childArray.map(convertToElement);
        head.prepend(...elements);

        return () => {
            for (const el of elements) {
                head.removeChild(el);
            }
            head.prepend(...existing);
        };
    }, [children]);

    return null;
}

function buildSelector(child) {
    const { type, props } = child;
    switch (type) {
        case 'title':
            return 'title';
        case 'meta':
            if (props.name) {
                return `meta[name="${props.name}"]`;
            }
            if (props.property) {
                return `meta[property="${props.property}"]`;
            }
            break;
        case 'link':
            if (props.rel) {
                return `link[rel="${props.rel}"]`;
            }
            break;
    }
    return null;
}

function convertToElement(child) {
    const el = document.createElement(child.type);
    for (const key of Object.keys(child.props)) {
        if (key === 'children') {
            el.textContent = child.props[key];
        } else {
            el.setAttribute(key, child.props[key]);
        }
    }
    return el;
}
