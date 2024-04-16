/**
 * @package     BlueAcorn/Api
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { signal } from '@preact/signals';

const commerceBaseUrl = signal(getCommerceBaseUrl());
const edgeBaseUrl = signal(getEdgeBaseUrl());

function getCommerceBaseUrl() {
    let url = process.env.COMMERCE_URL;
    if (location.hostname.includes('.lovesac.com') || location.hostname.includes('localhost')) {
        url = '/';
    }
    return new URL(url, location.origin).href;
}

function getEdgeBaseUrl() {
    let url = process.env.EDGE_URL;
    if (location.hostname.includes('.lovesac.com') || location.hostname.includes('localhost')) {
        url = '/';
    }
    return new URL(url, location.origin).href;
}

export function getCommerceUrl(path) {
    if (!path) {
        path = '';
    } else if (path.charAt(0) === '/') {
        path = path.substring(1);
    }
    return commerceBaseUrl.value + path;
}

export function getEdgeUrl(path) {
    if (!path) {
        path = '';
    } else if (path.charAt(0) === '/') {
        path = path.substring(1);
    }
    return edgeBaseUrl.value + path;
}

export function getProductUrl({ urlKey, sku }) {
    return getEdgeUrl(`products/${urlKey}/${sku}`);
}
