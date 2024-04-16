/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useMemo } from 'preact/hooks';
import { usePlayerContext } from '../../Context/Player';
import { useConfiguratorContext } from '../../Context/Configurator';
import { Loader } from '../Loader';
import { ThreekitPlayer } from './ThreekitPlayer';
import { PLAYER_VRAY_MODE } from './constants';
import { PlayerMessage } from './PlayerMessage';
import styles from './style.module.css';
import mobileSignal from '~/Api/Mobile';

export const Player = ({ show, helperClass }) => {
    const isMobile = mobileSignal.value;

    const isVisible = useMemo(() => {
        if (show === 'mobile') {
            return isMobile;
        }
        if (show === 'desktop') {
            return !isMobile;
        }
        return show === 'both';
    }, [show, isMobile]);

    return useMemo(() => {
        if (!isVisible) {
            return null;
        }

        return (
            <div className={`player ${show} ${styles.player} ${helperClass || ''}`}>
                <TkPlayer />
                <Loader>
                    <Toolbar />
                    <Thumbnails />
                    <PlayerMessage />
                </Loader>
            </div>
        );
    }, [isVisible, show, helperClass]);
};

const Toolbar = () => {
    const {
        state: { isLoaded },
    } = usePlayerContext();
    const { type } = useConfiguratorContext();

    return useMemo(() => {
        if (!isLoaded || !type.PlayerToolbar) {
            return null;
        }

        return <type.PlayerToolbar />;
    }, [isLoaded, type]);
};

const Thumbnails = () => {
    const {
        state: { isInitialized, mode, api },
    } = usePlayerContext();
    const { type } = useConfiguratorContext();

    return useMemo(() => {
        if (api && isInitialized && mode === PLAYER_VRAY_MODE && type.Thumbnails) {
            return <type.Thumbnails />;
        }
    }, [api, isInitialized, mode, type]);
};

const TkPlayer = () => {
    const {
        state: { domNode },
    } = usePlayerContext();

    return useMemo(() => {
        if (!domNode) {
            return null;
        }

        return <ThreekitPlayer domNode={domNode} />;
    }, [domNode]);
};
