/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useEffect, useLayoutEffect, useState, useMemo, useCallback } from 'preact/hooks';
import { NO_STEALTHTECH_CODE, SET_STEALTHTECH_ELIGIBLE } from '../constants';
import { useStateContext } from '../../../Context/State';
import { isCoverStealthtechEligible } from '../isCoverStealthtechEligible';
import { TYPE_CUSTOM } from '../../Configure/constants';
import { useTotalsContext } from '../../../Context/Totals';
import { PLAYER_WEBGL_MODE } from '../../../View/Player/constants';
import { TYPE_SUBWOOFER } from '../../Options/constants';

export const usePlayerSync = (playerState, state, index) => {
    useSetStealthtechSync(playerState, state);
    useSetStealthTechEligibleSync(playerState, state, index);
    useSetSubwoofers(playerState, state);
};

export const getStealthtechSkus = (preBuilt, sideStealthtech, configuration, armStyle, backStyle) => {
    const stealthtech = preBuilt[configuration]?.stealthtech || [];
    const skus = [];
    for (const sku of stealthtech) {
        if (sideStealthtech?.[armStyle]?.[backStyle]?.[sku]) {
            skus.push(sku);
        }
    }

    return skus;
};

const useSetStealthtechSync = ({ api }, { stealthtech }) => {
    useEffect(() => {
        try {
            if (api.setStealthTech) {
                api.setStealthTech({
                    key: stealthtech !== NO_STEALTHTECH_CODE ? stealthtech : null,
                    showIndicators: true,
                });
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
        }
    }, [api, stealthtech]);
};

const useSetStealthTechEligibleSync = (
    playerState,
    { configurationType, configuration, armStyle, backStyle },
    index,
) => {
    const {
        modules: {
            stealthtech: { options },
        },
    } = useTotalsContext();

    const playerSTEligible = usePlayerStealthTechEligible(playerState);

    const STEligible = useMemo(() => {
        if (configurationType === TYPE_CUSTOM) {
            if (playerSTEligible !== null) {
                return playerSTEligible;
            }
            if (index.saved?.stealthtech) {
                return index.saved?.stealthtech;
            }
        }

        return getStealthtechSkus(index.preBuilt, index.sideStealthtech, configuration, armStyle, backStyle).join(',');
    }, [index, configurationType, playerSTEligible, configuration, armStyle, backStyle]);
    const eligibleError = useStealthTechEligibleError(index, options, STEligible);

    const { dispatch } = useStateContext();
    useLayoutEffect(() => {
        let value = [];
        if (!eligibleError && STEligible) {
            value = STEligible.split(',');
        }
        dispatch({
            type: SET_STEALTHTECH_ELIGIBLE,
            value,
            error: eligibleError,
        });
    }, [eligibleError, STEligible, dispatch]);
};

const useStealthTechEligibleError = (index, options, STEligible) => {
    return useMemo(() => {
        if (!isCoverStealthtechEligible(index, options)) {
            return index.messages.stealthtechIneligibleFabricErrorMsg;
        } else if (!options.pieces['standard_seat'] && !options.pieces['deep_seat']) {
            return index.messages.stealthtechCoreToNoneErrorMsg;
        } else if (options.pieces['rollArm_side']) {
            return index.messages.stealthtechOptimalToCoreErrorMsg;
        } else if (
            options.pieces['standard_side'] &&
            (options.pieces['angled_side'] || options.pieces['deepAngled_side']) &&
            !STEligible
        ) {
            return index.messages.stealthtechEligibilityDifferentArmStylesMsg;
        }
        return null;
    }, [index, options, STEligible]);
};

const usePlayerStealthTechEligible = ({ api, mode }) => {
    const [playerSTEligible, setPlayerSTEligible] = useState(null);

    const setSTEligible = useCallback(
        (event) => {
            let stealthTechEligible = event?.detail?.state?.stealthTechEligible || null;
            if (!stealthTechEligible && api.checkEligibility) {
                try {
                    stealthTechEligible = api.checkEligibility();
                } catch (error) {
                    // eslint-disable-next-line no-console
                    console.error(error);
                }
            }
            setPlayerSTEligible(stealthTechEligible ? stealthTechEligible.map((item) => item.key).join(',') : '');
        },
        [api],
    );

    useEffect(() => {
        if (mode === PLAYER_WEBGL_MODE) {
            window.addEventListener('capacityChange', setSTEligible);
            setSTEligible();
        } else {
            setPlayerSTEligible(null);
        }

        return () => {
            if (mode === PLAYER_WEBGL_MODE) {
                window.removeEventListener('capacityChange', setSTEligible);
            }
        };
    }, [api, mode, setSTEligible]);

    return playerSTEligible;
};

const useSetSubwoofers = ({ api }, { options }) => {
    const qty = options[TYPE_SUBWOOFER]?.qty || 0;
    return useMemo(() => {
        try {
            if (api.setSubwoofers) {
                api.setSubwoofers(qty + 1);
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
        }
    }, [api, qty]);
};
