/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { useCallback, useMemo } from 'preact/hooks';
import { useConfiguratorContext } from '../../Context/Configurator';
import { useSaveConfigurationRequest } from '../../hooks/useSaveConfigurationRequest';
import { useDataLayerContext } from '../../Context/DataLayer';
import { useModalContext } from '../ActionSaveShare/Modal/ModalContext';
import { ModalContextProvider, CurrentModal } from '../ActionSaveShare/Modal';
import styles from './style.module.css';

export const SaveShareMobileContent = () => {
    return (
        <ModalContextProvider>
            <SaveShareMobile />
        </ModalContextProvider>
    );
};

const SaveShareMobile = () => {
    return (
        <div className={styles.actionMobile}>
            <CurrentModal />
            <SaveButton />
            <ShareButton />
        </div>
    );
};

const SaveButton = () => {
    const { setModal } = useModalContext();
    const getIsCustomerLoggedIn = () => {
        if (!window.localStorage.getItem('mage-cache-storage')) {
            return false;
        }

        const mageCacheStorage = JSON.parse(window.localStorage.getItem('mage-cache-storage'));

        if (!mageCacheStorage) {
            return false;
        }

        const customerData = mageCacheStorage.customer;

        return !!(!customerData ? false : customerData.fullname);
    };
    const showSaveLogin = useCallback(
        (event) => {
            event.preventDefault();
            setModal({
                type: 'saveLogin',
            });
        },
        [setModal],
    );
    const {
        config: { saveUrl },
    } = useConfiguratorContext();
    const [{ loading }, saveButtonCallback] = useSaveConfigurationRequest(saveUrl);
    const push = useDataLayerContext();
    const showAfterSave = useCallback(
        (event) => {
            event.preventDefault();
            setModal({
                type: 'saveLoginAfter',
            });
            saveButtonCallback();
            push('save');
        },
        [saveButtonCallback, push, setModal],
    );
    const showSaveConfiguration = getIsCustomerLoggedIn() ? showAfterSave : showSaveLogin;

    return useMemo(() => {
        return (
            <div className={styles.action}>
                <span className="save action">
                    <button
                        onClick={showSaveConfiguration}
                        className={` ${styles.save}${loading ? styles.disabled : ''}`}
                    >
                        {loading ? t`Saving` : t`Save`}
                    </button>
                </span>
            </div>
        );
    }, [loading, showSaveConfiguration]);
};

const ShareButton = () => {
    const { setModal } = useModalContext();
    const showShare = useCallback(
        (event) => {
            event.preventDefault();
            setModal({
                type: 'share',
            });
        },
        [setModal],
    );

    return (
        <div className={styles.action}>
            <span className={styles.share}>
                <button onClick={showShare}>{t`Share`}</button>
            </span>
        </div>
    );
};
