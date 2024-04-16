/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { useEffect, useMemo } from 'preact/hooks';
import { useConfiguratorContext } from '../../Context/Configurator';
import { useSaveConfigurationRequest } from '../../hooks/useSaveConfigurationRequest';
import { useDataLayerContext } from '../../Context/DataLayer';
import { useLoginAjaxRequest } from './hooks/useLoginAjaxRequest';
import { useModalContext } from './Modal/ModalContext';

/* eslint no-console: off */
export const ActionSave = ({ username, password }) => {
    const { setModal } = useModalContext();
    const [{ data: loginData, error: loginError, loading: loginLoading }, buttonCallback] = useLoginAjaxRequest({
        username,
        password,
    });

    const {
        config: { saveUrl },
    } = useConfiguratorContext();
    const [{ data, error, loading }, saveButtonCallback] = useSaveConfigurationRequest(saveUrl);
    const push = useDataLayerContext();

    useEffect(() => {
        if (loginData) {
            if (loginData.message === 'Login successful.') {
                // Save current configuration
                setModal({
                    type: 'saveLoginAfter',
                });
                saveButtonCallback();
                push('save');
            }
        }
    }, [loginData, loginError, loginLoading, setModal, saveButtonCallback, push]);

    // TODO: This use effect do not want to be triggered by some reason, so when we find out how to
    // TODO: make it work - we need to move setModal(...) from Line 38 inside it
    useEffect(() => {
        console.log(data);
        console.log(error);
        console.log(loading);
    }, [data, error, loading]);

    return useMemo(() => {
        return (
            <div className="actions-wrapper">
                {loginError ? (
                    <div className="message-error error message actions-error">
                        <span className="mage-error">{loginError}</span>
                    </div>
                ) : null}
                <button
                    className="sign-in"
                    onClick={buttonCallback}
                    disabled={loginLoading === true}
                >{t`Sign In`}</button>
            </div>
        );
    }, [loginLoading, loginError, buttonCallback]);
};
