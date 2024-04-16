/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { useMemo, useCallback, useState, useEffect, useRef } from 'preact/hooks';
import { BsX } from 'react-icons/bs';
import { Gallery } from '../../../../View/Gallery';
import { useStateContext } from '../../../../Context/State';
import { HIDE_INSTRUCTIONAL_MODAL } from '../../constants';
import { useModalContext } from '../../../../View/Modal';
import styles from './style.module.css';
import { getCommerceUrl } from '~/Api/Url';

export const IntroductionalModal = () => {
    const modalRef = useRef();
    const { setModal } = useModalContext();
    const { dispatch } = useStateContext();
    const [slide, setSlide] = useState(0);

    const closeModal = useCallback(
        (event) => {
            event.preventDefault();
            modalRef.current.close();
            dispatch({ type: HIDE_INSTRUCTIONAL_MODAL });
            setModal(null);
        },
        [setModal, dispatch],
    );

    const galleryData = useMemo(
        () => [
            {
                img: getCommerceUrl(`media/wysiwyg/configurator/side-side.png`),
                note: '<span>Tap a seat or side to <b>select</b></span>',
            },
            {
                img: getCommerceUrl(`media/wysiwyg/configurator/new-selection-icon.png`),
                note: '<span>Tap a + icon to <b>add</b> a new section</span>',
            },
            {
                img: getCommerceUrl(`media/wysiwyg/configurator/drag-icon.png`),
                note: '<span>Tap and drag a section to <b>move</b></span>',
            },
        ],
        [],
    );

    useEffect(() => {
        modalRef.current.showModal();
    }, []);

    return (
        <dialog ref={modalRef} className={styles.modal}>
            <div className={styles.modalHeader}>
                <button className={styles.actionClose} data-role="closeBtn" onClick={closeModal} type="button">
                    <span>{t`Close`}</span>
                    <BsX />
                </button>
            </div>
            <div className={styles.content} data-role="content">
                <div className="gallery-details__wrapper">
                    <h2 className={styles.galleryTitle}>{t`Customize Your Configuration`}</h2>
                    <p className={styles.galleryDesc}>
                        {slide === 0 &&
                            t`You can select, move around, and add sections to create the Sactional setup of your dreams.`}
                    </p>
                    <div className={styles.galleryContainer}>
                        <Gallery setSlide={setSlide} gallery={galleryData} />
                    </div>
                </div>
            </div>
        </dialog>
    );
};
