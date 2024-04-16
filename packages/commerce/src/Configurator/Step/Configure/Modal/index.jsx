/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { VrayImageModal } from '../../../View/Player/Toolbar/Modal/VrayImageModal';
import { ARModal } from '../../../View/Player/Toolbar/Modal/ARModal';
import { IntroductionalModal } from './IntroductionalModal';
import { ErrorModal } from './ErrorModal';
import { Info } from './Info';
import { DeleteItemModal } from './DeleteItemModal';

export default {
    introductionalModal: <IntroductionalModal />,
    errorModal: <ErrorModal />,
    info: <Info />,
    vrayImageModal: <VrayImageModal />,
    deleteItemModal: <DeleteItemModal />,
    arModal: <ARModal />,
};
