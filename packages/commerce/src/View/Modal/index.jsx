/**
 * @package     BlueAcorn/View
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { BsFillXCircleFill } from 'react-icons/bs';
import { t } from 'ttag';
import { useCallback, useEffect, useRef } from 'preact/hooks';
import FocusTrap from '../FocusTrap';
import styles from './style.module.css';
import ErrorBox from '~/View/ErrorBox';

const variants = {
    standard: {
        rootClass: styles.standard,
        borderClass: styles.roundBorder,
    },
    classic: {
        rootClass: styles.classic,
        borderClass: styles.roundBorder,
    },
    submitReview: {
        rootClass: styles.submitReview,
    },
};

export default function Modal({
    title,
    onCloseModal,
    children,
    icon,
    variant,
    roundedBorders = true,
    modalClass = null,
}) {
    const modalRef = useRef();
    const { rootClass, borderClass } = variants[variant] || variants[Modal.defaultProps.variant];
    const handleOutsideClick = useCallback(
        (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                event.preventDefault();
                onCloseModal(event);
            }
        },
        [onCloseModal, modalRef],
    );

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => document.removeEventListener('click', handleOutsideClick);
    }, [handleOutsideClick]);

    return (
        <FocusTrap className={`${styles.modal} ${rootClass} ${modalClass}`} onEscape={onCloseModal} initialIndex={1}>
            <div className={`${styles.inner} ${roundedBorders ? borderClass : ''}`} ref={modalRef}>
                <div className={styles.header}>
                    <div className={styles.title}>{title}</div>
                    <button className={styles.closeButton} onClick={onCloseModal} aria-label={t`Close`}>
                        {icon ?? <BsFillXCircleFill />}
                    </button>
                </div>
                <div className={styles.content}>
                    <ErrorBox>{children}</ErrorBox>
                </div>
            </div>
        </FocusTrap>
    );
}

Modal.defaultProps = {
    title: '',
    variant: 'standard',
    onCloseModal: () => {},
};
