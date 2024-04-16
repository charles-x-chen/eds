/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useCallback } from 'preact/hooks';
import { useModalContext } from './ModalContext';
import styles from './style.module.css';

export const Modal = ({ title, subtitle = null, closeTitle, children, modalClass = null }) => {
    const { modal } = useModalContext();
    const modalClassName = modal?.modalClass ?? '';
    return (
        <div
            className={` ${styles.moreInfoWrapper} ${styles.moreInfoWrapperActive} ${modalClass} ${modalClassName}`}
            data-modalActive={!!modal}
        >
            <div className={` ${styles.moreInfoHeader}`}>
                <ModelCloseButton title={closeTitle} />
                <h2 className={` ${styles.moreInfoTitle}`}>
                    {title}
                    {subtitle ? <span className={` ${styles.moreInfoSubTitle}`}>{subtitle}</span> : null}
                </h2>
            </div>
            {children}
        </div>
    );
};

const ModelCloseButton = ({ title }) => {
    const { setModal } = useModalContext();

    const closeCallback = useCallback(
        (event) => {
            event.preventDefault();
            setModal(null);
        },
        [setModal],
    );

    return (
        <button className={` ${styles.moreInfoBackLink}`} onClick={closeCallback}>
            <span>{title}</span>
        </button>
    );
};
