/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { NO_STEALTHTECH_CODE } from '../constants';

export const buildIndex = (index) => {
    index.stealthtechList = index.stealthtech;
    index.stealthtechList.push({
        piece: {
            key: NO_STEALTHTECH_CODE,
            type: 'stealthTech',
            price: 0,
        },
        name: t`None`,
    });
    index.stealthtech = Object.fromEntries(index.stealthtech.map((st) => [st.piece.key, st]));
    index.sideStealthtech = buildSideStealthtechIndex(index);
    index.isStealthtech = !!index.params.stealthtech;
};

const buildSideStealthtechIndex = (index) => {
    const result = {};
    for (const item of index.stealthtechList) {
        const {
            piece: { sku },
            options,
        } = item;

        if (!sku) {
            continue;
        }

        const styles = {};
        for (const option of options) {
            const {
                piece: { type, key },
                position,
            } = option;
            if (type === 'side') {
                if (!styles[position]) {
                    styles[position] = {};
                }
                styles[position][key] = true;
                option.replace = index.fills.standard.pieces[`${key}_${type}`]?.sku || false;
            }
        }

        if (!styles.arm) {
            styles.arm = index.armStyle;
        }
        if (!styles.back) {
            styles.back = index.backStyle;
        }

        for (const armStyle in styles.arm) {
            if (!result[armStyle]) {
                result[armStyle] = {};
            }
            for (const backStyle in styles.back) {
                if (!result[armStyle][backStyle]) {
                    result[armStyle][backStyle] = {};
                }
                result[armStyle][backStyle][sku] = item;
            }
        }

        item.armStyles = Object.keys(styles.arm);
        item.backStyles = Object.keys(styles.back);
    }
    return result;
};
