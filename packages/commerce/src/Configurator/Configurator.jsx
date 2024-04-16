/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useEffect, useState } from 'preact/hooks';
import { ConfiguratorContextProvider } from './Context/Configurator';
import { StateContextProvider } from './Context/State';
import { TotalsContextProvider } from './Context/Totals';
import { NavigatorContextProvider } from './Context/Navigator';
import { PlayerContextProvider } from './Context/Player';
import { DataLayerContextProvider } from './Context/DataLayer';
import ConfiguratorTypes from './Type';
import QUERY_CONFIGURATION from './gql/configuration.gql';
import QUERY_RATING from './gql/rating.gql';
import graphqlRequest from '~/Api/GraphQL';
import Loading from '~/View/Loading';

export default function Configurator(props) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const typeLoader = ConfiguratorTypes[props.config.type];
        if (!typeLoader) {
            throw new Error(`Invalid configurator type: ${props.config.type}`);
        }
        (async () => {
            const { default: type } = await typeLoader();

            const id = props.params.id || props.params.edit || null;
            const reviewSku = props.params.stealthtech ? props.config.stealthtechReviewSku : props.config.reviewSku;

            const promises = [
                graphqlRequest({ query: type.query }),
                reviewSku ? graphqlRequest({ query: QUERY_RATING, variables: { sku: reviewSku } }) : null,
                id ? graphqlRequest({ query: QUERY_CONFIGURATION, variables: { code: id } }) : null,
            ];

            const [configurator, rating, saved] = await Promise.all(promises);
            setData({
                ...(configurator?.data || {}),
                type,
                reviews: {
                    ...(rating?.data?.rating || {}),
                    sku: reviewSku,
                },
                saved: saved?.data?.configuration,
            });
        })();
    }, [props.config, props.params]);

    return data ? <ConfiguratorLoaded {...props} {...data} /> : <Loading />;
}

function ConfiguratorLoaded(props) {
    const { type } = props;
    return (
        <ConfiguratorContextProvider {...props}>
            <PlayerContextProvider>
                <StateContextProvider>
                    <TotalsContextProvider>
                        <DataLayerContextProvider>
                            <NavigatorContextProvider>
                                <type.View />
                            </NavigatorContextProvider>
                        </DataLayerContextProvider>
                    </TotalsContextProvider>
                </StateContextProvider>
            </PlayerContextProvider>
        </ConfiguratorContextProvider>
    );
}
