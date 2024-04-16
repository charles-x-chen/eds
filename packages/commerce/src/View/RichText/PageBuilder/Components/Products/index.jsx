/**
 * @package     BlueAcorn/View
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { toChildArray } from 'preact';
import ProductsWidget from './Widget';

export default function Products({ children, style, className }) {
    const childArray = toChildArray(children).flatMap(parseWidgets);

    return (
        <div style={style} className={className}>
            {childArray.map((child, index) => (
                <ProductsWidget key={index} {...child} />
            ))}
        </div>
    );
}

function snakeToCamel(s) {
    return s.replace(/(_\w)/g, (m) => m[1].toUpperCase());
}

function convertValue(value) {
    if (value === 'true') return true;
    if (value === 'false') return false;
    if (!isNaN(value) && !isNaN(parseFloat(value))) return parseFloat(value);
    return value;
}

function parseWidgets(text) {
    const widgetRegex = /\{\{widget\s+([^}]+)}}/g;
    const propRegex = /(\w+)="([^"]*)"/g;

    return Array.from(text.matchAll(widgetRegex)).map((widget) =>
        Array.from(widget[1].matchAll(propRegex)).reduce((acc, [, key, value]) => {
            acc[snakeToCamel(key)] = convertValue(value);
            return acc;
        }, {}),
    );
}
