import { render as provider } from '@dropins/storefront-cart/render';
import Cart from '@dropins/storefront-cart/containers/Cart';

export default async function decorate(block) {
    return provider.render(Cart, {
        routeEmptyCartCTA: () => '/',
        routeProduct: (product) => `/products/${product.url.urlKey}/${product.sku}`,
        routeCheckout: () => '/checkout',
    })(block);
}
