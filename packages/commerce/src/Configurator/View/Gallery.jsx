/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */

import { ImagesGallery } from './ImageGallery/ImagesGallery';

export const Gallery = ({ gallery = null, image = null, defaultImage = null }) => {
    if (gallery) {
        if (gallery.length > 1) {
            return <ImagesGallery gallery={gallery} />;
        }
        if (gallery.length === 1) {
            return <Image image={gallery[0].img} />;
        }
    }

    if (image) {
        return <Image image={image} />;
    }

    return <Image image={defaultImage} />;
};

const Image = ({ image }) => (
    <div className="gallery single-image">
        <div className="item">
            <img src={image} alt="" />
        </div>
    </div>
);
