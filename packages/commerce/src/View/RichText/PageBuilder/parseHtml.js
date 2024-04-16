/**
 * @package     BlueAcorn/View
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
/* eslint github/array-foreach: off */
/* eslint no-console: off */
import { createElement } from 'preact';
import RawHtml from '../RawHtml';

const NODE_TYPE_TEXT = '#text';
const NODE_TYPE_COMMENT = '#comment';

export default function parseHtml(htmlStr, registeredComponents) {
    const container = new DOMParser().parseFromString(htmlStr, 'text/html');
    container.body.id = bodyId;
    convertToInlineStyles(container);
    cleanUp(container);

    const nodeTree = [];

    for (let i = 0; i < container.body.childNodes.length; i++) {
        nodeTree.push(convertNode(container.body.childNodes[i], i, registeredComponents));
    }

    return nodeTree.length === 1 ? nodeTree[0] : nodeTree;
}

function convertNode(node, key, registeredComponents) {
    if (node.nodeName === NODE_TYPE_TEXT || node.nodeName === NODE_TYPE_COMMENT) {
        return (node.value || node.nodeValue).trim();
    }

    const contentType = node.dataset.contentType;
    const hasComponent = contentType && registeredComponents[contentType];
    const tagName = hasComponent ? registeredComponents[contentType] : RawHtml;
    const children = [];
    const attributes = {};

    if (contentType && !registeredComponents[contentType]) {
        console.warn('Page builder component is not available', contentType);
    }

    if (hasComponent) {
        const { dataset } = node;
        for (const key in dataset) {
            if (dataset[key] === 'true') {
                attributes[key] = true;
            } else if (dataset[key] === 'false') {
                attributes[key] = false;
            } else if (!isNaN(Number(dataset[key]))) {
                attributes[key] = Number(dataset[key]);
            }
        }
        attributes.className = node.getAttribute('class') || '';
        attributes.style = node.getAttribute('style') || '';
        for (let i = 0; i < node.childNodes.length; i++) {
            const converted = convertNode(node.childNodes[i], i, registeredComponents);
            if (converted) {
                children.push(converted);
            }
        }
    } else {
        attributes.content = node.outerHTML;
    }

    return createElement(tagName, attributes, children);
}

const cleanUp = (container) => {
    const nodes = container.querySelectorAll('body *:not([data-content-type]):has(*[data-content-type])');
    for (const node of nodes) {
        node.replaceWith(...node.childNodes);
    }
};

const pbStyleAttribute = 'data-pb-style';
const bodyId = 'html-body';

const convertToInlineStyles = (document) => {
    const styleBlocks = document.getElementsByTagName('style');
    const styles = {};
    const mediaStyles = {};

    if (styleBlocks.length > 0) {
        Array.from(styleBlocks).forEach((styleBlock) => {
            const cssRules = styleBlock.sheet.cssRules;

            Array.from(cssRules).forEach((rule) => {
                if (rule instanceof CSSStyleRule) {
                    const selectors = rule.selectorText.split(',').map((selector) => selector.trim());
                    selectors.forEach((selector) => {
                        if (!styles[selector]) {
                            styles[selector] = [];
                        }
                        styles[selector].push(rule.style);
                    });
                } else if (rule instanceof CSSMediaRule) {
                    Array.from(rule.media).forEach((media) => {
                        const styles = Array.from(rule.cssRules).map((rule) => {
                            return {
                                selectors: rule.selectorText.split(',').map((selector) => selector.trim()),
                                css: rule.style.cssText,
                            };
                        });
                        mediaStyles[media] = styles;
                    });
                }
            });
        });
    }

    Object.keys(mediaStyles).map((media, i) => {
        mediaStyles[media].forEach((style) => {
            style.selectors.forEach((selector) => {
                const element = document.querySelector(selector);
                if (element) {
                    element.setAttribute(`data-media-${i}`, media);
                    const savedStyles = element.getAttribute(`data-media-style-${i}`);
                    // avoids overwriting previously saved styles
                    element.setAttribute(
                        `data-media-style-${i}`,
                        `${savedStyles ? `${savedStyles} ` : ''}${style.css}`,
                    );
                }
            });
        });
    });

    Object.keys(styles).map((selector) => {
        const element = document.querySelector(selector);
        if (!element) {
            return;
        }

        styles[selector].map((style) => {
            element.setAttribute('style', element.style.cssText + style.cssText);
        });
        element.removeAttribute(pbStyleAttribute);
    });

    Array.from(document.getElementsByTagName('style')).forEach((node) => node.remove());
};
