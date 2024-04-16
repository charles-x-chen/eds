/**
 * @package     BlueAcorn/StoreLocator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */

import { useState, useEffect } from 'preact/hooks';

const defaultState = {
    data: null,
    loading: true,
    error: null,
};

export default function useLocation() {
    const [state, setState] = useState(defaultState);
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (location) => {
                setState({ ...defaultState, loading: false, data: location.coords });
            },
            (error) => {
                setState({ ...defaultState, loading: false, error });
            },
        );
    }, []);
    return state;
}
