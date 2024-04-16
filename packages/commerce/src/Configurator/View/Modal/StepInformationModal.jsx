/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { useCallback, useMemo, useEffect, useRef } from 'preact/hooks';
import { BsX } from 'react-icons/bs';
import { useModalContext } from './ModalContext';
import styles from './style.module.css';
import RichText from '~/View/RichText';

export const StepInformationModal = () => {
    const { modal, setModal } = useModalContext();

    const { content } = modal;

    const modalRef = useRef();

    const closeModal = useCallback(
        (event) => {
            event.preventDefault();
            document.body.classList.remove('armstyle-modal');
            setModal(null);
        },
        [setModal],
    );

    const handleOutsideClick = useCallback(
        (event) => {
            event.preventDefault();
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                closeModal(event);
            }
        },
        [closeModal, modalRef],
    );

    useEffect(() => {
        document.body.classList.add('armstyle-modal');
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.addEventListener('mousedown', handleOutsideClick);
    }, [closeModal, handleOutsideClick]);

    return useMemo(() => {
        return (
            <div
                role="dialog"
                className={`${styles.armstyleModal}`}
                style="z-index: 902;"
                data-modalActive={modal ? 'vray' : ''}
            >
                <div className={`${styles.innerWrap} ${styles.innerWrapStepInfo}`} data-role="focusable-scope">
                    <div className={`${styles.stepInfoModalHeader}`}>
                        <button
                            className={`${styles.stepInfoModalClose}`}
                            data-role="closeBtn"
                            onClick={closeModal}
                            type="button"
                        >
                            <span>{t`Close`}</span>
                            <BsX />
                        </button>
                    </div>
                    <div data-role="content">
                        <div>
                            <div ref={modalRef}>{content.type ? content : <RichText content={content} />}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }, [closeModal, content, modal]);
};
