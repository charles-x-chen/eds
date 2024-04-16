/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useCallback, useState } from 'preact/hooks';
import { t } from 'ttag';

const defaultState = { error: null, data: null, loading: false };
const defaultError = t`Something went wrong`;

export const useAjaxRequest = () => {
    const [state, setState] = useState(defaultState);

    const callback = useCallback(async (params) => {
        setState({ ...defaultState, loading: true });
        let newState;

        const fetchParams = await getFetchParams(params);
        try {
            const response = await fetch(params.url, fetchParams);

            if (response.ok) {
                const data = await response.json();
                if (data.error) {
                    newState = { ...defaultState, data, error: data.error };
                } else {
                    newState = { ...defaultState, data };
                }

                triggerOnAjaxComplete(response.url, fetchParams, data);
            } else {
                newState = { ...defaultState, error: defaultError };
            }
        } catch (e) {
            newState = { ...defaultState, error: defaultError };
        }

        setState(newState);
        return newState;
    }, []);

    return [state, callback];
};

const getFetchParams = async ({
    data = null,
    dataCallback = null,
    method = 'GET',
    dataType = 'json',
    addFormKey = false,
}) => {
    const params = {
        method,
        headers: {
            accept: 'application/json',
            'x-requested-with': 'XMLHttpRequest',
        },
        credentials: 'include',
    };

    if (dataCallback) {
        data = await dataCallback();
    }

    if (addFormKey) {
        data['form_key'] = getFormKey();
    }

    if (data) {
        switch (dataType) {
            case 'json':
                params.headers['Content-Type'] = 'application/json';
                params.body = JSON.stringify(data);
                break;
            case 'urlencoded':
                params.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                params.body = new URLSearchParams(data);
                break;
        }
    }
    return params;
};

const getFormKey = () => {
    return document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=');
        return parts[0] === 'form_key' ? decodeURIComponent(parts[1]) : r;
    }, '');
};

// reload customer data
const triggerOnAjaxComplete = (url, fetchParams, data) => {
    try {
        const $ = window.jQuery;
        if ($) {
            const xhr = {
                responseJSON: data,
            };
            const settings = {
                url: url.replace(/\/+$/, ''),
                type: fetchParams.method,
            };
            $(document).trigger('ajaxComplete', [xhr, settings]);
        }
    } catch (e) {}
};
