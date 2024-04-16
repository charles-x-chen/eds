/**
 * @package     BlueAcorn/AddToCart
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { useEffect } from 'preact/hooks';
import CART_ID from './gql/cartId.gql';
import ADD_TO_CART from './gql/addToCart.gql';
import styles from './style.module.css';
import useQuery from '~/hooks/useQuery';
import useMutation from '~/hooks/useMutation';
import { getCommerceUrl } from '~/Api/Url';

export default function AddToCart({ sku, qty, btnLabel, redirect }) {
    const [{ fetching: loading1, data: data1 }, getCartId] = useQuery({ query: CART_ID, pause: true });
    const [{ fetching: loading2, data: data2 }, submitAddToCart] = useMutation(ADD_TO_CART);
    const cartId = data1?.passportCart?.id || null;

    useEffect(() => {
        if (!loading1 && cartId) {
            submitAddToCart({
                cartId,
                sku,
                qty,
            });
        }
    }, [loading1, cartId, submitAddToCart, sku, qty]);

    useEffect(() => {
        if (!loading2 && redirect && data2?.addProductsToCart?.cart?.items?.length > 0) {
            window.location.href = getCommerceUrl('checkout/cart');
        }
    }, [loading2, data2, redirect]);

    return (
        <button className={styles.atcButton} onClick={getCartId} disabled={loading1 || loading2}>
            {btnLabel}
        </button>
    );
}

AddToCart.defaultProps = {
    qty: 1,
    btnLabel: t`Add To Cart`,
    redirect: true,
};
