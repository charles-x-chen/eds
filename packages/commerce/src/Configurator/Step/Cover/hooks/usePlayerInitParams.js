/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useStateContext } from '../../../Context/State';

export const usePlayerInitParams = ({ initialConfiguration }) => {
    const {
        state: { fabricId },
    } = useStateContext();
    initialConfiguration.fabric = String(fabricId);
};
