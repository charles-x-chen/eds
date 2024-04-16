/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useCallback } from 'preact/hooks';
import { useConfiguratorContext } from '../Context/Configurator';
import { usePlayerContext } from '../Context/Player';
import { useTotalsContext } from '../Context/Totals';
import { getPiecesTitle } from '../calculator';
import { useStateContext } from '../Context/State';
import { TYPE_CUSTOM, TYPE_PREBUILT } from '../Step/Configure/constants';
import SAVE_MUTATION from '../gql/save.gql';
import { getLeadTimeText } from './getLeadTimeText';
import { buildMarketingSku } from './buildMarketingSku';
import useMutation from '~/hooks/useMutation';

export const useSaveConfigurationRequest = () => {
    const [result, mutationCallback] = useMutation(SAVE_MUTATION);
    const bodyDataCallback = useBodyDataCallback();

    const callback = useCallback(async () => {
        const configuration = await bodyDataCallback();
        return await mutationCallback({
            configuration,
        });
    }, [mutationCallback, bodyDataCallback]);

    return [result, callback];
};

const useBodyDataCallback = () => {
    const index = useConfiguratorContext();
    const totals = useTotalsContext();
    const { state } = useStateContext();
    const {
        state: { floor, api },
    } = usePlayerContext();

    return useCallback(async () => {
        const {
            last: { options, objects = [] },
            total,
            totalWithoutDiscount,
            modules,
        } = totals;
        const { fabricId = null, fill = null } = options;
        const { pieces } = options;
        const { type } = index;

        return {
            id: await getConfigurationId(state, api),
            marketingSku: buildMarketingSku(type.code, index, pieces, state),
            screenShotUrl: api ? await api.getThumbnail() : null,
            type: type.code,
            prices: {
                price: totalWithoutDiscount,
                specialPrice: total,
            },
            name: getName(index, options),
            qty: state.qty || 1,
            items: getItems(objects),
            configuration: getConfiguration(state),
            floor,
            fill,
            armStyle: state.armStyle || null,
            backStyle: state.backStyle || null,
            fabrics: {
                all: String(fabricId),
                hard: String(fabricId),
                soft: String(fabricId),
                trim: null,
            },
            // eslint-disable-next-line camelcase
            leadtime_text: getLeadTimeText(objects),
            description: getDescription(type.steps, modules),
            // eslint-disable-next-line camelcase
            covers_only: type.code.includes('Cover'),
            skus: getSkus(objects),
        };
    }, [api, index, totals, floor, state]);
};

const getConfigurationId = async (state, api) => {
    if (state.configurationType === TYPE_CUSTOM) {
        return await api.saveConfiguration();
    }
    // create a random UUID for pre-built configurations
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16),
    );
};

const getName = (index, options) => {
    const name = getPiecesTitle(index, options);
    return `<span class='summary-item'>${name}</span>`;
};

const getItems = (objects) => {
    const items = [];
    for (const object of objects) {
        const { type, key, qty, originalQty = null, first = true } = object;
        if (first) {
            const pieceQty = originalQty || qty;
            for (let index = 0; index < pieceQty; index++) {
                items.push({ type, key });
            }
        }
    }
    return items;
};

const getSkus = (objects) => {
    const skus = {
        allSkus: [],
        accessorySkus: [],
        stealthTechSkus: [],
    };

    for (const object of objects) {
        const { include = [], accessoryOptionImage = null, sku, type } = object;
        skus.allSkus.push(sku);

        if (include.length) {
            skus.allSkus.push(...include);
        }

        if (accessoryOptionImage || type === 'accessory' || type === 'squattoman') {
            skus.accessorySkus.push(sku);
        }

        if (type === 'stealthTech') {
            skus.stealthTechSkus.push(sku);
        }
    }
    return Object.entries(skus).map(([skuGroup, skus]) => ({ skuGroup, skus }));
};

const getDescription = (steps, modules) => {
    const description = steps
        .map(({ code = null, title = null }) => {
            if (modules?.[code]?.title) {
                return `<li>${title}: ${modules?.[code]?.title}</li>`;
            }
        })
        .join('');
    return description ? `<ul class='configuration-cart - description'>${description}</ul>` : '';
};

const getConfiguration = (state) => {
    switch (state.configurationType) {
        case TYPE_PREBUILT:
            return state.configuration;
        case TYPE_CUSTOM:
            return 'custom';
    }
    return null;
};
