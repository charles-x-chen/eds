/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useCallback, useMemo } from 'preact/hooks';
import { Fragment } from 'preact';
import { Tabs } from '../../View/Tabs';
import { Player } from '../../View/Player';
import { useStateContext } from '../../Context/State';
import { useConfiguratorContext } from '../../Context/Configurator';
import { ModalContextProvider, useModalContext } from '../../View/Modal';
import { TabPreBuilt } from './TabPreBuilt';
import { TabCustom } from './TabCustom';
import { SET_CONFIGURATION_TYPE, TYPE_CUSTOM, TYPE_PREBUILT } from './constants';

import ModalTypes from './Modal';

export const StepComponent = () => {
    return (
        <Fragment>
            <Player show="mobile" />
            <StepTabs />
        </Fragment>
    );
};

const StepTabs = () => {
    const {
        messages: { customTabLabel, prebuiltTabLabel },
    } = useConfiguratorContext();
    return (
        <ModalContextProvider types={ModalTypes}>
            <StepTabsDynamic>
                <TabPreBuilt title={prebuiltTabLabel} code={TYPE_PREBUILT} />
                <TabCustom title={customTabLabel} code={TYPE_CUSTOM} />
            </StepTabsDynamic>
        </ModalContextProvider>
    );
};

const StepTabsDynamic = ({ children }) => {
    const {
        dispatch,
        state: { configurationType, isConfiguratorChanged },
    } = useStateContext();

    const { setModal } = useModalContext();

    const tabClickCallback = useCallback(
        (event) => {
            event.preventDefault();
            const { name, value } = event.target;

            if (configurationType === TYPE_CUSTOM && isConfiguratorChanged) {
                setModal({
                    type: 'errorModal',
                    name,
                    value,
                });
            } else {
                dispatch({
                    type: name,
                    value,
                });
            }
        },
        [dispatch, configurationType, isConfiguratorChanged, setModal],
    );

    return useMemo(() => {
        return (
            <Tabs activeTab={configurationType} tabClickCallback={tabClickCallback} buttonName={SET_CONFIGURATION_TYPE}>
                {children}
            </Tabs>
        );
    }, [configurationType, tabClickCallback, children]);
};
