/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */

import { Fragment } from 'preact';
import { Popup } from './Popup/Popup';
import { SubwooferErrorPopup } from './Popup/SubwooferErrorPopup';

export const GlobalComponent = () => {
    return (
        <Fragment>
            <Popup />
            <SubwooferErrorPopup />
        </Fragment>
    );
};
