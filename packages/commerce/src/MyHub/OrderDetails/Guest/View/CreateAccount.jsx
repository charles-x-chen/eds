/**
 * @package     BlueAcorn/MyHub
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */

import { t } from 'ttag';
import { useCallback, useState } from 'preact/hooks';
import { BsX } from 'react-icons/bs';
import CreateAccountForm from './CreateAccountForm';
import styles from './style.module.css';
import Modal from '~/View/Modal';

export default function CreateAccount({ email, firstname, lastname }) {
    const [showModal, setShowModal] = useState(false);
    const openModal = useCallback(() => {
        setShowModal(true);
        document.body.classList.add('thumbnail-modal-active');
    }, [setShowModal]);

    return (
        <>
            <div className={styles.wrapper}>
                <h2>{t`Create an Account`}</h2>
                <p>{t`Benefits include easy order tracking, faster checkout, multiple addresses, and more.`}</p>
                <button className={styles.trigger} onClick={openModal}>{`create account`}</button>
                <ModalContainer
                    showModal={showModal}
                    setShowModal={setShowModal}
                    email={email}
                    firstname={firstname}
                    lastname={lastname}
                />
            </div>
        </>
    );
}

function ModalContainer({ showModal, setShowModal, email, firstname, lastname }) {
    const modalClose = useCallback(() => {
        setShowModal(false);
        document.body.classList.remove('thumbnail-modal-active');
    }, [setShowModal]);

    return (
        showModal && (
            <div className={styles.modalContainer}>
                <Modal onCloseModal={modalClose} variant={'classic'} icon={<BsX />} roundedBorders={false}>
                    <CreateAccountForm email={email} firstname={firstname} lastname={lastname} />
                </Modal>
            </div>
        )
    );
}
