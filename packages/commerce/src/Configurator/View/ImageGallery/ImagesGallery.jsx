/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import RichText from '../../../View/RichText';
import styles from './style.module.css';
import Carousel from '~/View/Gallery';

export const ImagesGallery = ({ gallery }) => (
    <div className={styles.reactCarousel}>
        <Carousel>
            {gallery.map((image, index) => (
                <span key={index}>
                    <Image image={image.img} />
                    {image.note ? (
                        <p className="gallery-note">
                            <RichText content={image.note} />
                        </p>
                    ) : null}
                </span>
            ))}
        </Carousel>
    </div>
);

const Image = ({ image }) => (
    <div className="gallery single-image">
        <div className="item" data-image-type={'single'}>
            <img src={image} alt="" />
        </div>
    </div>
);
