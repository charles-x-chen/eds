/**
 * @package     BlueAcorn/Catalog
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useCallback, useState } from 'preact/hooks';
import CART_QUERY from '../gql/cart.gql';
import ADD_TO_CART from '../gql/addToCartMutation.gql';
import useQuery from '~/hooks/useQuery';
import useMutation from '~/hooks/useMutation';

export default function useAddToCart() {
    const [fetching, setFetching] = useState(false);

    const [, getCart] = useQuery({
        query: CART_QUERY,
        pause: true,
    });

    const [result, addToCart] = useMutation(ADD_TO_CART);

    const callback = useCallback(
        async (data) => {
            setFetching(true);
            const cartData = await getCart();
            const cartId = cartData?.data?.cart?.id;
            let result = null;
            if (cartId) {
                result = await addToCart({
                    cartId,
                    cartItems: [data],
                });
            }
            setFetching(false);
            return result;
        },
        [getCart, addToCart],
    );

    return [{ ...result, fetching }, callback];
}
