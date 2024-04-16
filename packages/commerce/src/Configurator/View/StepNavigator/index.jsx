/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useEffect, useMemo, useRef } from 'preact/hooks';
import { useNavigatorContext } from '../../Context/Navigator';
import { SummaryBar, SummaryExpanded } from '../Summary';
import { Footer } from '../Footer';
import { TitleBar } from '../Title';
import { useConfiguratorContext } from '../../Context/Configurator';
import { Player, PlayerLoader } from '../Player';
import styles from './style.module.css';

export const StepNavigator = () => {
    document.body.classList.add(styles.configuratorPage);
    return (
        <div className={styles.stepWrapper}>
            <Player show="desktop" />
            <div className={styles.step}>
                <StepGlobalComponent />
                <SummaryBar />
                <StepViewInner />
                <Footer />
            </div>
            <PlayerLoader />
        </div>
    );
};

const StepViewInner = () => {
    const { summaryExpanded } = useNavigatorContext();

    return useMemo(
        () =>
            summaryExpanded ? (
                <SummaryExpanded />
            ) : (
                <div className={`${styles.sidebarContent}`}>
                    <TitleBar />
                    <StepViewContent />
                </div>
            ),
        [summaryExpanded],
    );
};

const StepViewContent = () => {
    const { stepIndex, step } = useNavigatorContext();
    const ref = useRef(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollTop = 0;
        }
    }, [stepIndex]);

    return (
        <div className={`${styles.stepContent}`} ref={ref} data-step={step?.code}>
            <step.StepComponent />
        </div>
    );
};

const StepGlobalComponent = () => {
    const {
        type: { steps },
    } = useConfiguratorContext();
    return useMemo(
        () => steps.map((step, index) => (step.GlobalComponent ? <step.GlobalComponent key={index} /> : null)),
        [steps],
    );
};
