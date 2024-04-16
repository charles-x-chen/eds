/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { useMemo } from 'preact/hooks';
import { useConfiguratorContext } from '../Context/Configurator';
import { useStateContext } from '../Context/State';
import { DropdownComponent } from './Dropdown';

export const ShippingInfo = ({ helperClass = null }) => {
    const index = useConfiguratorContext();
    const {
        state: { fabricId, fabricLeadTime, piece: statePiece },
    } = useStateContext();

    const content = useMemo(() => {
        const { fabrics, pieces } = index;
        const piece = pieces[statePiece];
        if (piece) {
            const { key, type } = piece;
            const shippingDesc = fabrics.filter((fabric) => fabric.code === fabricLeadTime)[0]?.shipping;
            const shippingLeadTime =
                index.fabricOptions?.[fabricLeadTime]?.[fabricId]?.pieces?.[`${key}_${type}`]?.leadTime;
            return {
                title: shippingLeadTime,
                desc: shippingDesc,
            };
        }
        return null;
    }, [index, fabricId, fabricLeadTime, statePiece]);

    if (content) {
        return <DropdownComponent title={t`Shipping Info`} content={content} helperClass={helperClass} />;
    }

    return null;
};
