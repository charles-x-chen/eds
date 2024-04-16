/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */

import { t } from 'ttag';
import { useCallback, useEffect, useState } from 'preact/hooks';
import { useModalContext } from '../ModalContext';
import { usePlayerContext } from '../../../../Context/Player';
import { useConfiguratorContext } from '../../../../Context/Configurator';
import { getCommerceUrl } from '~/Api/Url';
import Modal from '~/View/Modal';

export const SaveLoginAfter = () => {
    const { setModal } = useModalContext();
    const closeCallback = useCallback(
        (event) => {
            event.preventDefault();
            setModal(null);
        },
        [setModal],
    );

    return (
        <Modal title={t`Save`} onCloseModal={closeCallback}>
            <SampleContent onCloseModal={closeCallback} />
        </Modal>
    );
};

export const SampleContent = ({ onCloseModal }) => {
    const {
        state: { api },
    } = usePlayerContext();
    const {
        type: { title },
    } = useConfiguratorContext();
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        (async () => {
            if (api) {
                setImageUrl(await api.getThumbnail());
            }
        })();
    }, [api]);

    return (
        <div className="modal-body">
            <div className="configurator-image">
                <img src={imageUrl} alt="" className={`image`} />
            </div>
            <div className="configurator-text">
                <div className="title">{t`Your ${title} Setup Has Been Saved.`}</div>
                <div className="signature">
                    {t`You can go to your saved ${title} setup at any time by visiting the configurations section
                        of your account.`}
                </div>
            </div>
            <div className="modal-actions">
                <a
                    className="view-account"
                    href={getCommerceUrl('configurator/customer/savedconfigurations')}
                >{t`View Account`}</a>
                <button className="continue" onClick={onCloseModal}>{t`Continue Editing`}</button>
            </div>
        </div>
    );
};
