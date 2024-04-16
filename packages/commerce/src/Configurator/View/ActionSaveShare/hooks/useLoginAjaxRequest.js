/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useCallback, useMemo } from 'preact/hooks';
import { useAjaxRequest } from '../../../hooks/useAjaxRequest';

export const useLoginAjaxRequest = (bodyData) => {
    const [result, ajaxCallback] = useAjaxRequest();
    // TODO: Request to this URL just return "status" and "message".

    // TODO: In case of "success" response - it's necessary to "login" customer on FE and I don't know how
    // TODO: to make it from React side

    // TODO: So when the customer will be successfully logged-in - we can redirect it to the page with
    // TODO: the list of saved configurations
    const callback = useCallback(
        (event) => {
            event.preventDefault();
            ajaxCallback({
                method: 'POST',
                url: '/customer/ajax/login',
                data: bodyData,
            });
        },
        [bodyData, ajaxCallback],
    );

    return useMemo(() => {
        if (result?.data?.errors) {
            const newResult = { ...result, error: result?.data?.message };
            return [newResult, callback];
        }
        return [result, callback];
    }, [result, callback]);
};
