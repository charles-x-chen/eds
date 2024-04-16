/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */

export const getThreekitApi = (key) => {
    const tk = window.threekit;
    if (key) {
        return tk ? tk[key] : null;
    }
    return tk;
};

export const playerId = 'threekit-player';
export const getOrCreateDomNode = () => getDomNode() || createDomNode();
export const getDomNode = () => document.getElementById(playerId);
export const createDomNode = () => {
    const node = document.createElement('div');
    node.id = playerId;
    document.body.appendChild(node);
    addQmImageMask(node);
    return node;
};

const addQmImageMask = (node) => {
    const image = document.createElement('img');
    const isActiveCanvas = (canvas) => canvas && canvas.width > 50 && canvas.height > 50;
    const getCanvases = () => Array.from(document.querySelectorAll('#threekit-player canvas'));
    let activeCanvas = null;
    const getActiveCanvas = () => {
        if (!isActiveCanvas(activeCanvas)) {
            activeCanvas = getCanvases().find((canvas) => isActiveCanvas(canvas));
        }
        return activeCanvas;
    };

    image.className = 'qm-image-mask';
    image.style.display = 'none';
    node.appendChild(image);

    setInterval(() => {
        const canvas = getActiveCanvas();
        if (canvas) {
            image.src = canvas.toDataURL('image/webp', 0.1);
        }
    }, 5000);
};
