/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useCallback, useState } from 'preact/hooks';
import { t } from 'ttag';
import { BsFillXCircleFill, BsX } from 'react-icons/bs';
import Modal from '../../View/Modal';
import Gallery from '../../View/Gallery';
import { useConfiguratorContext } from '../Context/Configurator';
import mobileSignal from '~/Api/Mobile';

export const ThumbnailCarousel = ({ currentConfiguration, currentFabric }) => {
    const { thumbnailCarousel } = useConfiguratorContext();
    const isMobile = mobileSignal.value;
    const thumbnailCarouselKey = currentConfiguration.replace(/(_.*$|\s+|\(|\))/g, '');
    const thumbnailCarouselData = Object.entries(thumbnailCarousel || {})
        .filter(
            ([key]) =>
                key.toLowerCase() === `${thumbnailCarouselKey}_${currentFabric}`.toLowerCase() ||
                (!thumbnailCarouselKey.includes('_') && key.toLowerCase() === thumbnailCarouselKey.toLowerCase()),
        )
        .map(([, thumbnails]) => thumbnails)
        .flat();

    const [showModal, setShowModal] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const openModal = useCallback(
        (event) => {
            setShowModal(true);
            setCurrentIndex(event.currentTarget.getAttribute('data-index'));
            document.body.classList.add('thumbnail-modal-active');
        },
        [setShowModal],
    );

    return thumbnailCarouselData.length > 0
        ? thumbnailCarouselKey && (
              <div className="player-thumbnails-carousel__wrapper">
                  {!isMobile ? (
                      thumbnailCarouselData.map((thumbnail, index) => (
                          <button className={`player-thumbnail`} onClick={openModal} data-index={index} key={index}>
                              <img src={thumbnail.thumb_url} alt={thumbnail.title} />
                              <span>{thumbnail.title}</span>
                          </button>
                      ))
                  ) : (
                      <button className="player-button thumbnails" onClick={openModal} data-index={0}>
                          <span>{t`Product Thumbnails`}</span>
                      </button>
                  )}
                  <ThumbnailModal
                      showModal={showModal}
                      thumbnailCarouselData={thumbnailCarouselData}
                      setShowModal={setShowModal}
                      currentIndex={currentIndex}
                  />
              </div>
          )
        : null;
};

const ThumbnailModal = ({ showModal, thumbnailCarouselData, setShowModal, currentIndex }) => {
    const modalClose = useCallback(() => {
        setShowModal(false);
        document.body.classList.remove('thumbnail-modal-active');
    }, [setShowModal]);
    const isMobile = mobileSignal.value;
    const variant = isMobile ? 'classic' : 'standard';
    const icon = isMobile ? <BsX /> : <BsFillXCircleFill />;
    const showDots = isMobile && thumbnailCarouselData.length > 1;
    const showArrows = thumbnailCarouselData.length > 1;

    return (
        showModal && (
            <div className={'player-thumbnails-modal'}>
                <Modal onCloseModal={modalClose} variant={variant} icon={icon}>
                    <Gallery
                        activeIndex={parseInt(currentIndex, 10)}
                        showDots={showDots}
                        variant={variant}
                        showArrows={showArrows}
                    >
                        {thumbnailCarouselData.map((thumbnail, index) => (
                            <img src={thumbnail.large_url} alt={thumbnail.title} key={index} />
                        ))}
                    </Gallery>
                </Modal>
            </div>
        )
    );
};
