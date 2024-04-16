/**
 * @package     BlueAcorn/Headless
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { lazy, Suspense } from 'preact/compat';

const App = lazy(() => import('./App'));

export default function init(loader) {
    const Component = lazy(loader);
    return function ComponentLoader(props) {
        return (
            <Suspense fallback={<div />}>
                <App lazy={props.lazy !== 'false'}>
                    <Component {...convertProps(props)} />
                </App>
            </Suspense>
        );
    };
}

function convertProps(oldProps) {
    const props = {};
    for (const [key, oldVal] of Object.entries(oldProps)) {
        if (key.includes('-')) {
            continue;
        }
        let value = null;
        if (oldVal === 'true') {
            value = true;
        } else if (oldVal === 'false') {
            value = false;
        } else if (Number(oldVal).toString() === oldVal) {
            value = Number(oldVal);
        } else {
            value = oldVal;
        }
        props[key] = value;
    }
    return props;
}
