/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useMemo } from 'preact/hooks';
import { t } from 'ttag';
import { Tabs } from '../../../View/Tabs';
import { useConfiguratorContext } from '../../../Context/Configurator';
import { useStateContext } from '../../../Context/State';
import { useStateButtonCallback } from '../../../hooks/useStateButtonCallback';
import { SET_FABRIC_LEAD_TIME } from '../constants';
import { getPiecesStepTitle } from '../../../calculator';
import { TabButtons } from './TabButtons';
import { CoverTypes } from './CoverTypes';
import styles from './style.module.css';

export const StepTabs = () => {
    const { fabrics } = useConfiguratorContext();

    const tabs = useMemo(() => {
        return fabrics.map((leadType) => {
            const qty = leadType.groups.reduce((i, group) => i + group.items.length, 0);

            return (
                <Tab title={`${leadType.name} (${qty})`} code={leadType.code} leadType={leadType} key={leadType.code} />
            );
        });
    }, [fabrics]);

    return <StepTabsDynamic tabs={tabs} />;
};

const StepTabsDynamic = ({ tabs }) => {
    const {
        state: { fabricLeadTimeTab },
    } = useStateContext();
    const tabClickCallback = useStateButtonCallback();

    return useMemo(
        () => (
            <Tabs activeTab={fabricLeadTimeTab} tabClickCallback={tabClickCallback} buttonName={SET_FABRIC_LEAD_TIME}>
                {tabs}
            </Tabs>
        ),
        [tabs, fabricLeadTimeTab, tabClickCallback],
    );
};

const Tab = ({ leadType: { description, groups } }) => {
    return (
        <div className={styles.sidebarItems}>
            <CoverDescription />
            <div className={styles.description}>{description}</div>
            <TabButtons />
            <CoverTypes groups={groups} />
        </div>
    );
};

const CoverDescription = () => {
    const {
        type: { code },
    } = useConfiguratorContext();

    const {
        state: { pieces },
    } = useStateContext();

    const label = Object.values(pieces).filter((qty) => qty > 0).length
        ? t`You have selected ${getPiecesStepTitle({ pieces })}`
        : t`You have not selected any Seats or Sides.`;

    return code.includes('Covers') && pieces && <div className={styles.coverDescription}>{label}</div>;
};
