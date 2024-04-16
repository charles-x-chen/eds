/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { useMemo, useCallback } from 'preact/hooks';
import { useNavigatorContext } from '../../Context/Navigator';
import { useConfiguratorContext } from '../../Context/Configurator';
import { useStateContext } from '../../Context/State';
import { NO_STEALTHTECH_CODE } from '../../Step/Stealthtech/constants';
import styles from './style.module.css';

export const TitleBar = () => {
    const { stepIndex, stepQty } = useNavigatorContext();

    return (
        <div className={`${styles.titleBarWrapper} ${stepIndex >= stepQty - 1 ? 'center' : ''}`} data-index={stepIndex}>
            {stepIndex >= 1 ? <PrevStepButton /> : <ExitButton />}
            <TitlePageNumber />
            <NextStepButton />
        </div>
    );
};

const PrevStepButton = () => {
    const { setStepIndex } = useNavigatorContext();
    const onClick = useCallback(
        (event) => {
            event.preventDefault();
            setStepIndex((stepIndex) => stepIndex - 1);
        },
        [setStepIndex],
    );

    return <button className={`${styles.stepPrev}`} onClick={onClick} />;
};

const NextStepButton = () => {
    const { stepIndex, setStepIndex, stepQty } = useNavigatorContext();
    const onClick = useCallback(
        (event) => {
            event.preventDefault();
            setStepIndex((stepIndex) => stepIndex + 1);
        },
        [setStepIndex],
    );

    return stepIndex <= stepQty - 2 ? <button className={`${styles.stepNext} next-trigger`} onClick={onClick} /> : null;
};

const ExitButton = () => {
    const url = usePLPUrl();
    const onClick = useCallback(
        (event) => {
            event.preventDefault();
            location.href = url;
        },
        [url],
    );

    return <button onClick={onClick}>{t`Exit`}</button>;
};

const TitlePageNumber = () => {
    const {
        step: { name },
        stepIndex,
        stepQty,
    } = useNavigatorContext();

    return (
        <div>
            <span className={`${styles.title}`}>{name}</span>
            <span className={`${styles.pageNumber}`}>
                {stepIndex >= stepQty - 1 ? '' : `${stepIndex + 1} / ${stepQty - 1}`}
            </span>
        </div>
    );
};

const usePLPUrl = () => {
    const {
        config: { isConfigureMode = false },
        type,
    } = useConfiguratorContext();
    const {
        state: { stealthtech = null },
    } = useStateContext();

    return useMemo(() => {
        if (isConfigureMode) {
            return '/checkout/cart';
        }
        switch (type.code) {
            case 'sactional':
                if (stealthtech && stealthtech !== NO_STEALTHTECH_CODE) {
                    return '/sactionals-with-stealthtech-sound-charge.html';
                }
                return '/sactionals.html';
            case 'outdoorSactional':
                return '/sactionals/outdoor.html';
            case 'sac':
                return '/sacs.html';
            case 'throwPillow':
                return '/accessories/throw-pillows.html';
            case 'squattoman':
                return '/sacs/accessories.html';
        }
        return '/';
    }, [isConfigureMode, type, stealthtech]);
};
