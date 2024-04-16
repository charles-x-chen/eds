/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks';
import {
    ActionShare,
    ActionShareFacebook,
    ActionShareMail,
    ActionSharePinterest,
    ActionShareTwitter,
} from '../../../ActionShare';
import { usePlayerContext } from '../../../../../Context/Player';
import { useTotalsContext } from '../../../../../Context/Totals';
import { useConfiguratorContext } from '../../../../../Context/Configurator';
import { getPiecesTitle } from '../../../../../calculator';
import { useModalContext } from '../../ModalContext';
import styles from './style.module.css';
import Modal from '~/View/Modal';

export const Share = () => {
    const { setModal } = useModalContext();
    const closeCallback = useCallback(
        (event) => {
            event.preventDefault();
            setModal(null);
        },
        [setModal],
    );

    return (
        <Modal title={t`Share`} onCloseModal={closeCallback} modalClass={styles.shareModal}>
            <ConfiguratorImage />
            <ConfiguratorText />
            <ConfiguratorSocial />
            <ActionShare />
        </Modal>
    );
};

const ConfiguratorImage = () => {
    const {
        state: { api },
    } = usePlayerContext();
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        (async () => {
            if (api) {
                setImageUrl(await api.getThumbnail());
            }
        })();
    }, [api]);

    return useMemo(
        () => <div className={styles.image}>{imageUrl ? <img src={imageUrl} alt="" className={`image`} /> : null}</div>,
        [imageUrl],
    );
};

const ConfiguratorText = () => {
    const {
        last: { options },
    } = useTotalsContext();
    const index = useConfiguratorContext();

    return useMemo(
        () => (
            <div className={styles.text}>
                <div className={styles.title}>{t`Share your ${index.type.title}`}</div>
                <div className={styles.option}>{getPiecesTitle(index, options)}</div>
            </div>
        ),
        [index, options],
    );
};

const ConfiguratorSocial = () => {
    return (
        <div className={styles.social}>
            <span>
                <ActionShareMail />
            </span>
            <span>
                <ActionShareFacebook />
            </span>
            <span>
                <ActionShareTwitter />
            </span>
            <span>
                <ActionSharePinterest />
            </span>
        </div>
    );
};
