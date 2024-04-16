/**
 * @package     BlueAcorn/Catalog
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import Gallery from '~/View/Gallery';

export default function ProductGallery({ product: { images } }) {
    const activeIndex = images.findIndex((image) => image.roles.includes('image')) || 0;

    return (
        <div>
            <Gallery activeIndex={activeIndex}>
                {images.map((image, index) => (
                    <img src={image.url} alt={image.label} key={index} />
                ))}
            </Gallery>
        </div>
    );
}
