/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useCallback } from 'preact/hooks';
import { usePlayerContext } from '../../../Context/Player';
import { useModalContext } from '../../Modal';
import styles from '../style.module.css';
import mobileSignal from '~/Api/Mobile';
import userAgent from '~/Api/UserAgent';

export const ZoomButton = ({ title }) => {
    const {
        state: { api },
    } = usePlayerContext();
    const { modal, setModal } = useModalContext();
    const isMobile = mobileSignal.value;

    const callback = useCallback(async () => {
        const response = await api.getAR();
        if (response) {
            if (isMobile) {
                const bodyClassList = document.body.classList;
                bodyClassList.add(styles.arActive);
                if (userAgent === 'iOS') {
                    const { url } = await response.usdz;
                    if (url) {
                        bodyClassList.remove(styles.arActive);
                        window.location.href = url;
                    }
                } else {
                    const { url } = await response.glb;
                    if (url) {
                        bodyClassList.remove(styles.arActive);
                        window.location.href = url;
                    }
                }
            } else {
                setModal({
                    type: 'arModal',
                    data: response,
                });
            }
        }
    }, [setModal, api, isMobile]);

    if ((isMobile && userAgent.value === 'iOS') || !isMobile) {
        return (
            <button
                className={`${styles.playerButton} ${styles.zoom} ${modal?.type === 'arModal' ? styles.active : ''}`}
                onClick={callback}
            >
                <span>{title}</span>
            </button>
        );
    }
};
