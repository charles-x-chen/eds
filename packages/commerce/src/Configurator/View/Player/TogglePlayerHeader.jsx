/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useEffect } from 'preact/hooks';
import mobileSignal from '~/Api/Mobile';

export const useTogglePlayerHeaderEffect = (elementRef) => {
    const isMobile = mobileSignal.value;

    return useEffect(() => {
        if (isMobile && elementRef) {
            const playerMobile = document.querySelector('.player');
            const playerHeaderHandler = () => {
                if (elementRef.current.getBoundingClientRect().top <= window.innerHeight) {
                    playerMobile.style.display = 'none';
                } else {
                    playerMobile.style.display = 'block';
                }
            };
            window.removeEventListener('scroll', playerHeaderHandler);
            window.addEventListener('scroll', playerHeaderHandler);
        }
    }, [isMobile, elementRef]);
};
