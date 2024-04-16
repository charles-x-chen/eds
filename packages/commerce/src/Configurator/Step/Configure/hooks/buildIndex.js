/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { TYPE_CUSTOM, TYPE_PREBUILT } from '../constants';

export const buildIndex = (index) => {
    index.preBuiltGroups = index.preBuilt;
    buildPreBuiltIndex(index);
};

const buildPreBuiltIndex = (index) => {
    index.preBuilt = Object.fromEntries(
        index.preBuiltGroups.flatMap((group) =>
            group.items.map((item) => [
                item.code,
                {
                    ...item,
                    pieces: Object.fromEntries(item.pieces.map(({ key, type, qty }) => [`${key}_${type}`, qty])),
                },
            ]),
        ),
    );
    const configurationCandidates = [
        index.params?.configuration,
        index.config?.configuration,
        Object.keys(index.preBuilt)[0],
    ].filter(Boolean);
    index.defaultConfiguration = configurationCandidates.find((conf) => index.preBuilt[conf]);

    const typeCandidates = [index.params?.configurationType, index.config?.configurationType, TYPE_PREBUILT].filter(
        Boolean,
    );
    const types = [TYPE_PREBUILT, TYPE_CUSTOM];
    index.defaultConfigurationType = typeCandidates.find((type) => types.includes(type));
};
