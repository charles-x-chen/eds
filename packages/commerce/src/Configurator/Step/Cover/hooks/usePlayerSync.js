/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useEffect } from 'preact/hooks';

export const usePlayerSync = ({ api }, { fabricId }) => {
    useEffect(() => {
        api.setFabric(String(fabricId));
    }, [api, fabricId]);
};
