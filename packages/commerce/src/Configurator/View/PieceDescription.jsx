/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { useConfiguratorContext } from '../Context/Configurator';
import { useStateContext } from '../Context/State';
import { Dropdown } from './Dropdown';

export const PieceDescription = () => {
    const { pieces } = useConfiguratorContext();
    const {
        state: { piece: statePiece },
    } = useStateContext();
    const piece = pieces[statePiece];

    if (piece) {
        return <Dropdown title={t`Description`} content={piece.description} />;
    }

    return null;
};
