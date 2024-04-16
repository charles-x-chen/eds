/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useCallback, useEffect, useState } from 'preact/hooks';
import { t } from 'ttag';
import { useConfiguratorContext } from '../../Context/Configurator';
import { ActionBarPrice } from '../Action';
import { useSaveConfigurationRequest } from '../../hooks/useSaveConfigurationRequest';
import { useDataLayerContext } from '../../Context/DataLayer';
import { QtyIncrementor } from '../QtyIncrementor';
import { usePlayerContext } from '../../Context/Player';
import ADD_TO_CART_MUTATION from '../../gql/addToCart.gql';
import UPDATE_CART_MUTATION from '../../gql/updateCart.gql';
import styles from './style.module.css';
import useMutation from '~/hooks/useMutation';
import { getCommerceUrl } from '~/Api/Url';

export const ActionAddToCart = ({ showQtySelector = false, helperClass = null }) => {
    const { isConfigureMode, saved } = useConfiguratorContext();
    const {
        state: { api },
    } = usePlayerContext();

    const [{ data: saveData, error: saveError }, saveButtonCallback] = useSaveConfigurationRequest();
    const [{ data: addCartData, error: addCartError }, cartMutation] = useMutation(
        isConfigureMode ? UPDATE_CART_MUTATION : ADD_TO_CART_MUTATION,
    );
    const [loading, setLoading] = useState(false);
    const push = useDataLayerContext();
    const addToCartCallback = useCallback(
        async (event) => {
            event.preventDefault();
            setLoading(true);
            await saveButtonCallback();
        },
        [saveButtonCallback],
    );

    useEffect(() => {
        const code = saveData?.configuration?.code;
        if (code) {
            push({
                event: 'addOrUpdateToCart',
                shareCode: code,
            });

            if (isConfigureMode) {
                cartMutation({
                    code,
                    originalCode: saved.code,
                });
            } else {
                cartMutation({
                    code,
                });
            }
        }
        if (saveError) {
            setLoading(false);
        }
    }, [cartMutation, isConfigureMode, saveData, saveError, saved, push]);

    useEffect(() => {
        if (addCartData?.result) {
            setTimeout(() => {
                location.href = getCommerceUrl('checkout/cart');
            }, 50);
        }
        if (addCartError) {
            setLoading(false);
        }
    }, [addCartData, addCartError]);

    return (
        <div className={`summary-actions ${showQtySelector ? 'summary-actions--throwpillow' : ''} ${helperClass}`}>
            {showQtySelector ? <QtyIncrementor show="both" label={t`Select Quantity to Add:`} /> : null}
            <div className={styles.wrapper}>
                <ActionBarPrice />
                <button className={styles.button} onClick={addToCartCallback} disabled={loading || !api}>
                    {isConfigureMode ? t`Update` : t`Add To Cart`}
                </button>
            </div>
        </div>
    );
};
