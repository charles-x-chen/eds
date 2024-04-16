/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useEffect, useMemo, useRef } from 'preact/hooks';
import { t } from 'ttag';
import { useNavigatorContext } from '../../Context/Navigator';
import { Player, PlayerLoader } from '../../View/Player';
import { useTotalsContext } from '../../Context/Totals';
import { SummaryBar, SummaryExpanded } from '../../View/Summary';
import { TitleBar } from '../../View/Title';
import { Footer } from '../../View/Footer';
import { useConfiguratorContext } from '../../Context/Configurator';
import { Dropdown, DropdownComponent } from '../../View/Dropdown';
import { useStateContext } from '../../Context/State';
import { getLeadTimeText } from '../../hooks/getLeadTimeText';
import mobileSignal from '~/Api/Mobile';
import RichText from '~/View/RichText';

export const View = () => {
    const index = useConfiguratorContext();
    const { sactionalPieceBenefitsBlock, sactionalPieceMarketingBlock } = index;

    return (
        <div className="sactional-piece-content__wrapper">
            <div className="step-wrapper step-squattoman step-piece">
                <PlayerLoader />
                <div className="player__wrapper">
                    <Player show="desktop" />
                    <div className="step-accordion__wrapper">
                        <Description />
                        <Dropdown title={t`Benefits`} content={sactionalPieceBenefitsBlock} />
                        <ShippingInfo />
                    </div>
                </div>
                <StepView />
            </div>
            <RichText className="squattoman-marketing__wrapper" content={sactionalPieceMarketingBlock} />
        </div>
    );
};

const StepView = () => {
    const { step, summaryExpanded } = useNavigatorContext();
    const ref = useRef(null);
    const isMobile = mobileSignal.value;

    useEffect(() => {
        if (isMobile && ref.current?.scrollIntoView) {
            ref.current.scrollIntoView();
        }
    }, [ref, step, isMobile]);

    return useMemo(
        () => (
            <div className={`step step-${step.code}`} ref={ref}>
                <StepGlobalComponent />
                <SummaryBar />
                {summaryExpanded ? (
                    <SummaryExpanded showQtySelector={true} />
                ) : (
                    <div className={`sidebar-content`}>
                        <TitleBar />
                        <div className="step-content">
                            <step.StepComponent showQtySelector={true} />
                        </div>
                    </div>
                )}
                <Footer showQtySelector={true} />
            </div>
        ),
        [step, summaryExpanded],
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

const ShippingInfo = () => {
    const { fabricLeadTypes } = useConfiguratorContext();
    const {
        state: { fabricLeadTime },
    } = useStateContext();
    const {
        last: { objects = [] },
    } = useTotalsContext();
    const leadTime = getLeadTimeText(objects);

    const content = useMemo(() => {
        const shippingDesc = fabricLeadTypes?.[fabricLeadTime]?.['indicator_text'];
        return {
            title: leadTime,
            desc: shippingDesc,
        };
    }, [leadTime, fabricLeadTypes, fabricLeadTime]);

    return leadTime && <DropdownComponent title={t`Shipping Info`} content={content} />;
};

const Description = () => {
    const { preBuilt } = useConfiguratorContext();
    const {
        state: { configuration },
    } = useStateContext();

    const descriptionText = preBuilt?.[configuration]?.description ?? null;

    return useMemo(() => {
        return descriptionText && <Dropdown title={t`Description`} content={descriptionText} />;
    }, [descriptionText]);
};
