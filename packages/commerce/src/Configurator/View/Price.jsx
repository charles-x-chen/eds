/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
const cache = {};

export const Price = ({ value }) => {
    return <span className="price">{getPriceFormatted(value)}</span>;
};

const getPriceFormatted = (value) => {
    if (!(value in cache)) {
        cache[value] = convertToString(value);
    }
    return cache[value];
};

const convertToString = (price) => {
    if (isNaN(price)) {
        return '';
    }
    return price
        .toFixed(2)
        .replace(/\B(?!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
        .replace(/^(-)?/, '$1 $')
        .trim();
};
