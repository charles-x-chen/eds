/**
 * @package     BlueAcorn/Headless
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import useInView from './useInView';
import './global.css';

export default function App({ lazy, children }) {
    const [ref, inView] = useInView();
    return <c-reset-css ref={ref}>{!lazy || inView ? children : null}</c-reset-css>;
}

App.defaultProps = {
    lazy: true,
};
