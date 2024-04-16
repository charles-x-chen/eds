/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */

import { useEffect } from 'preact/hooks';

export const useHtmlPreloader = (content) => {
    useEffect(() => {
        const div = document.createElement('div');
        div.innerHTML = content;
    }, [content]);
};
