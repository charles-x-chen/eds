/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { useEffect, useMemo, useCallback } from 'preact/hooks';
import { useConfiguratorContext } from '../../Context/Configurator';
import { useSaveConfigurationRequest } from '../../hooks/useSaveConfigurationRequest';
import { useDataLayerContext } from '../../Context/DataLayer';
import styles from './style.module.css';
import { getCommerceUrl, getEdgeUrl } from '~/Api/Url';

export const ActionShare = () => {
    const {
        config: { basePath },
    } = useConfiguratorContext();
    const [{ data, loading }, saveConfiguration] = useSaveConfigurationRequest();
    const push = useDataLayerContext();

    const saveConfigurationAndGetUrl = useCallback(async () => {
        const { data } = await saveConfiguration();
        const code = data?.configuration?.code;
        if (code) {
            return getEdgeUrl(`${basePath}/id/${code}`);
        }
        return '';
    }, [saveConfiguration, basePath]);

    const saveButtonCallback = useCallback(
        async (event) => {
            event.preventDefault();
            if (window.ClipboardItem) {
                // Safari and other browsers
                const getUrlBlob = async () => {
                    const url = await saveConfigurationAndGetUrl();
                    return new Blob([url], { type: 'text/plain' });
                };
                const text = new window.ClipboardItem({ 'text/plain': getUrlBlob() });
                navigator.clipboard.write([text]);
            } else {
                // Firefox
                const url = await saveConfigurationAndGetUrl();
                await navigator.clipboard.writeText(url);
            }
        },
        [saveConfigurationAndGetUrl],
    );

    useEffect(() => {
        if (data) {
            push({
                event: 'share',
                shareCode: data?.configuration?.code,
            });
        }
    }, [data, push]);

    return useMemo(() => {
        return (
            <div className={styles.shareAction}>
                <button className={`${styles.shareButton} ${loading ? 'disable' : ''}`} onClick={saveButtonCallback}>
                    {loading ? t`Copying` : data ? t`Copied` : t`Copy link`}
                </button>
            </div>
        );
    }, [loading, data, saveButtonCallback]);
};

export const ActionShareMail = () => {
    const [{ data }, saveButtonCallback] = useSaveConfigurationRequest();
    const push = useDataLayerContext();

    useEffect(() => {
        if (data) {
            push({
                event: 'share',
                shareCode: data?.configuration?.code,
            });
            window.open(getCommerceUrl(`configurator/share/index?id=${data?.configuration?.code}`), `_blank`);
        }
    }, [data, push]);

    return <button onClick={saveButtonCallback} className={styles.mail} />;
};

export const ActionShareFacebook = () => {
    const {
        config: { shareUrl },
    } = useConfiguratorContext();
    const [{ data }, saveButtonCallback] = useSaveConfigurationRequest();
    const push = useDataLayerContext();

    useEffect(() => {
        if (data) {
            push({
                event: 'share',
                shareCode: data?.configuration?.code,
            });
            const encodedConfiguratorUrl = encodeURIComponent(shareUrl.replace('CODE', data?.configuration?.code));
            window.open(`https://www.facebook.com/sharer.php?u=${encodedConfiguratorUrl}`, `_blank`);
        }
    }, [shareUrl, data, push]);

    return <button onClick={saveButtonCallback} className={styles.facebook} />;
};

export const ActionShareTwitter = () => {
    const {
        config: { basePath },
        type,
    } = useConfiguratorContext();
    const [{ data }, saveButtonCallback] = useSaveConfigurationRequest();
    const push = useDataLayerContext();

    useEffect(() => {
        if (data) {
            const code = data?.configuration?.code;
            push({
                event: 'share',
                shareCode: code,
            });
            const encodedConfiguratorUrl = encodeURIComponent(getEdgeUrl(`${basePath}/id/${code}`));
            const encodedText = encodeURIComponent(type.title);
            window.open(
                `https://twitter.com/intent/tweet?url=${encodedConfiguratorUrl}&text=${encodedText}&hashtags=${encodedText}`,
                `_blank`,
            );
        }
    }, [basePath, data, type, push]);

    return <button onClick={saveButtonCallback} className={styles.twitter} />;
};

export const ActionSharePinterest = () => {
    const {
        config: { basePath },
        type,
    } = useConfiguratorContext();
    const [{ data }, saveButtonCallback] = useSaveConfigurationRequest();
    const push = useDataLayerContext();

    useEffect(() => {
        if (data) {
            const code = data?.configuration?.code;
            push({
                event: 'share',
                shareCode: code,
            });
            const encodedConfiguratorUrl = encodeURIComponent(getEdgeUrl(`${basePath}/id/${code}`));
            const encodedText = encodeURIComponent(type.title);
            const encodedImage = encodeURIComponent(data.configuration.screenShotUrl);
            window.open(
                `https://www.pinterest.com/pin/create/link/?url=${encodedConfiguratorUrl}&media=${encodedImage}&description=${encodedText}`,
                `_blank`,
            );
        }
    }, [basePath, data, type, push]);

    return <button onClick={saveButtonCallback} className={styles.pin} />;
};
