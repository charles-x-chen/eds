/**
 * @package     BlueAcorn/StoreLocator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import Loading from '../../View/Loading';
import useLocation from './hooks/useLocation';
import Stores from './gql/stores.gql';
import useQuery from '~/hooks/useQuery';

export default function ClosestShowroom({ latitude, longitude }) {
    const { data: coords, loading } = useLocation();
    const lat = coords?.latitude ?? latitude;
    const long = coords?.longitude ?? longitude;

    const graphqlVariables = {
        lat,
        long,
        radius: 120,
    };
    const [{ data, fetching }] = useQuery({ query: Stores, variables: graphqlVariables, pause: loading });
    return fetching ? <Loading /> : data?.stores?.items?.[0]?.name;
}

ClosestShowroom.defaultProps = {
    latitude: 35.8383,
    longitude: -78.6786,
};
