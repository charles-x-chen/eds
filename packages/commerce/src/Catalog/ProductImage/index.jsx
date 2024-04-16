/**
 * @package     BlueAcorn/Catalog
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */

const imageTypes = {
    small: {
        height: 171,
        width: 269,
    },
    thumbnail: {
        height: 80,
        width: 80,
    },
    large: {
        height: 700,
        width: 700,
    },
};

export default function ProductImage({ type, src, alt, eager }) {
    const typeData = imageTypes[type];
    if (!typeData) {
        return null;
    }

    return (
        <picture>
            <source type="image/webp" srcset={buildImageUrl(src, 'webply', typeData)} />
            <img
                loading={eager ? 'eager' : 'lazy'}
                alt={alt}
                src={buildImageUrl(src, 'jpeg', typeData)}
                width={typeData.width}
                height={typeData.height}
            />
        </picture>
    );
}

function buildImageUrl(url, format, args) {
    const params = {
        format,
        optimize: 'medium',
        dpr: window.devicePixelRatio || 1,
        'bg-color': '255,255,255',
        fit: 'bounds',
        ...args,
    };
    const query = new URLSearchParams(params);
    return `${url}?${query}`;
}

ProductImage.defaultProps = {
    alt: '',
    eager: false,
};
