/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useEffect, useErrorBoundary } from 'preact/hooks';
import { Fragment } from 'preact';
import { useConfiguratorContext } from '../../Context/Configurator';
import { useStateContext } from '../../Context/State';
import { usePlayerContext } from '../../Context/Player';
import { useModulesByMethod } from '../../hooks/useModulesByMethod';
import { usePlayerFloorId } from './Toolbar/FloorButton';

export const PlayerStateSync = () => {
    const { type } = useConfiguratorContext();
    const modules = useModulesByMethod(type, 'usePlayerSync');

    return (
        <Fragment>
            <Fragment>
                {modules.map((module, index) => (
                    <ModuleStateSync module={module} key={index} />
                ))}
            </Fragment>
            <MeasurementStateSync />
            <FloorStateSync />
        </Fragment>
    );
};

const ModuleStateSync = ({ module }) => {
    // eslint-disable-next-line no-console
    useErrorBoundary((error) => console.error(error));
    const { state: playerState } = usePlayerContext();
    const { state } = useStateContext();
    const index = useConfiguratorContext();
    module.usePlayerSync(playerState, state, index);
};

const MeasurementStateSync = () => {
    const {
        state: { isMeasurementEnabled, api },
    } = usePlayerContext();

    useEffect(() => {
        if (api.toggleMeasurement) {
            if (isMeasurementEnabled) {
                api.toggleMeasurement('on');
            } else {
                api.toggleMeasurement('off');
            }
        }
    }, [api, isMeasurementEnabled]);
};

const FloorStateSync = () => {
    const tkFloor = usePlayerFloorId();
    const {
        state: { api },
    } = usePlayerContext();

    useEffect(() => {
        if (api.setFloor) {
            api.setFloor(tkFloor);
        }
    }, [api, tkFloor]);
};
