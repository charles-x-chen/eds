/**
 * @package     BlueAcorn/View
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useErrorBoundary } from 'preact/hooks';

export default function Price({ value, currency }) {
    const [error] = useErrorBoundary();
    return <span className="price">{error ? '' : getFormatter(currency).format(value)}</span>;
}

const formatters = {};
function getFormatter(currency) {
    if (!formatters[currency]) {
        formatters[currency] = new Intl.NumberFormat('en-US', { style: 'currency', currency });
    }
    return formatters[currency];
}

Price.defaultProps = {
    value: null,
    currency: 'USD',
};
