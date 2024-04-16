/**
 * @package     BlueAcorn/View
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useEffect, useState } from 'preact/hooks';
import Default from './Default';
import Html from './Html';

function lazy(loader) {
    return (props) => {
        const [Component, setComponent] = useState(null);
        useEffect(() => {
            (async () => {
                const { default: res } = await loader();
                setComponent(() => res);
            })();
        }, []);
        return Component ? <Component {...props} /> : null;
    };
}

const components = {
    row: Default,
    column: Default,
    'column-group': Default,
    'column-line': Default,
    text: Default,
    buttons: Default,
    'button-item': Default,
    block: Default,
    video: Default,
    banner: Default,
    html: Html,
    'content-slider': lazy(() => import('./ContentSlider')),
    'content-slider-item': Default,
    'blueacorn-tabs': Default,
    'tab-item': Default,
    products: lazy(() => import('./Products')),
};

export default components;
