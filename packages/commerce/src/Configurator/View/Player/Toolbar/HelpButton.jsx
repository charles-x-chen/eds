/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */

import { useCallback } from 'preact/hooks';

export const HelpButton = ({ title }) => {
    const callback = useCallback((event) => {
        event.preventDefault();
    }, []);

    return (
        <button className="player-button help" onClick={callback}>
            <span>{title}</span>
        </button>
    );
};
