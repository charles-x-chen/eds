/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { useCallback, useMemo } from 'preact/hooks';
import { CurrentModal, ModalContextProvider } from '../ActionSaveShare/Modal';
import { useNavigatorContext } from '../../Context/Navigator';
import { ShowNextStepActionBar } from '../Action';
import { useConfiguratorContext } from '../../Context/Configurator';
import { useSaveConfigurationRequest } from '../../hooks/useSaveConfigurationRequest';
import { useDataLayerContext } from '../../Context/DataLayer';
import { useModalContext } from '../ActionSaveShare/Modal/ModalContext';
import { LogoSubtitle } from '../LogoSubtitle';
import styles from './style.module.css';
import mobileSignal from '~/Api/Mobile';

export const Footer = ({ showQtySelector = false }) => {
    return (
        <ModalContextProvider>
            <div className={`${styles.summaryFooter}`}>
                <SummaryNextStepActionBar showQtySelector={showQtySelector} />
                <SummaryActionsToolbar />
                <SummaryTotalComfort />
            </div>
        </ModalContextProvider>
    );
};

const SummaryNextStepActionBar = ({ showQtySelector }) => {
    const { summaryExpanded } = useNavigatorContext();
    return useMemo(
        () => (!summaryExpanded ? <ShowNextStepActionBar showQtySelector={showQtySelector} /> : null),
        [summaryExpanded, showQtySelector],
    );
};

const SummaryActionsToolbar = () => {
    return (
        <div className={`${styles.summaryActionsToolbar}`}>
            <CurrentModal />
            <SummaryActionsSaveButton />
            <SummaryActionsShareButton />
            <span className={`${styles.showroomAction}`}>
                <a href="/showroomlocator" target="_blank">{t`Find a showroom`}</a>
            </span>
        </div>
    );
};

const SummaryActionsSaveButton = () => {
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

    return useMemo(
        () => (
            <span className={`${styles.saveAction}`}>
                <button onClick={showSaveConfiguration} className={loading ? 'disable' : ''}>
                    {loading ? t`Saving` : t`Save`}
                </button>
            </span>
        ),
        [loading, showSaveConfiguration],
    );
};

const SummaryActionsShareButton = () => {
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
    return useMemo(
        () => (
            <span className={`${styles.shareAction}`}>
                <button onClick={showShare}>{t`Share`}</button>
            </span>
        ),
        [showShare],
    );
};

const SummaryTotalComfort = () => {
    return (
        <div className={`${styles.comfort}`}>
            <span className="content">
                <SummaryTotalComfortLogo />
                {t`Total Comfort Guaranteed: `}
                <a href="/terms-and-conditions#ReturnsHomeTrial" target="_blank">
                    {t`Risk-Free 60-Day Home Trial`}
                </a>
            </span>
        </div>
    );
};

const SummaryTotalComfortLogo = () => {
    const isMobile = mobileSignal.value;
    return useMemo(() => (isMobile ? <LogoSubtitle /> : null), [isMobile]);
};
