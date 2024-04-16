/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { TYPE_SQUATTOMAN } from '../constants';

export const collectTotals = (
    { options: prevOptions },
    { accessories: stateAccessories, fabricId, fabricLeadTime },
    { accessories: indexAccessories, squattoman = null },
) => {
    const objects = prevOptions.objects ? [...prevOptions.objects] : [];

    const types = {};
    for (const type in stateAccessories) {
        const { key, qty } = stateAccessories[type];
        if (qty > 0) {
            if (type === TYPE_SQUATTOMAN) {
                const fabric = squattoman?.fabricOptions?.[fabricLeadTime]?.[fabricId];
                if (fabric) {
                    const fabricObject = fabric.pieces[`${key}_${type}`];
                    if (fabricObject) {
                        objects.push([squattoman.insert, qty, true]);
                        objects.push([fabricObject, qty, false]);
                        types[type] = qty;
                    }
                }
            } else {
                objects.push([indexAccessories[type][key].piece, qty]);
                types[type] = qty;
            }
        }
    }

    return {
        options: { ...prevOptions, objects },
        types,
    };
};
