/**
 * @package     BlueAcorn/Headless
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { render } from 'preact';

export default function renderComponent(element, Component, props = {}) {
    render(<Component {...props} />, element);
}
