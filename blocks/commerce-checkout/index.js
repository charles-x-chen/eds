import { initializers } from '@dropins/tools/initializer';
import { events } from '@dropins/tools/event-bus';
import { initialize } from '@dropins/storefront-checkout/api';
import { render as provider } from '@dropins/storefront-checkout/render';
import Checkout from '@dropins/storefront-checkout/containers/Checkout';

export default async function decorate(block) {
    const cartId = sessionStorage.getItem('DROPINS_CART_ID') || '';
    initializers.register(initialize, {});
    events.on('checkout/order', (data) => {
        window.location.replace(`/order-confirmation?orderRef=${data.masked_order_id}`);
    });

    return provider.render(Checkout, {
        cartId,
        routeHome: () => '/',
        routeCart: () => '/cart',
        slots: {
            PaymentMethods: async (context) => {
                context.addPaymentMethodHandler('checkmo', {
                    render: (ctx, element) => {
                        if (element) {
                            // clear the element first
                            element.innerHTML = '';
                        }
                    },
                });
            },
        },
    })(block);
}
