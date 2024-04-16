import { events } from '@dropins/tools/event-bus';
import { setEndpoint, fetchGraphQl } from '@dropins/tools/fetch-graphql';
import { initializers } from '@dropins/tools/initializer';
import { initialize } from '@dropins/storefront-cart/api';
import { getCommerceUrl } from '~/Api/Url';

export default async function initializeDropins() {
    // Set Fetch Endpoint (Global)
    setEndpoint(getCommerceUrl('graphql'));

    await initCartIdFromSession();

    // Initializers (Global)
    initializers.register(initialize, {});

    // Cache cartId in session storage
    events.on('cart/initialized', (data) => {
        if (data?.id) {
            sessionStorage.setItem('DROPINS_CART_ID', data.id);
        } else {
            sessionStorage.removeItem('DROPINS_CART_ID');
        }
    });

    // Cache cartId in session storage
    events.on('cart/data', (data) => {
        if (data?.id) {
            sessionStorage.setItem('DROPINS_CART_ID', data.id);
        } else {
            sessionStorage.removeItem('DROPINS_CART_ID');
        }
    });

    // Mount all registered drop-ins
    if (document.readyState === 'complete') {
        initializers.mount();
    } else {
        window.addEventListener('load', initializers.mount);
    }

    events.enableLogger(true);
}

async function initCartIdFromSession() {
    if (!sessionStorage.getItem('DROPINS_CART_ID')) {
        try {
            const cartId = (await fetchGraphQl('query{passportCart{id}}'))?.data?.passportCart?.id;
            if (cartId) {
                const date = new Date();
                date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
                sessionStorage.setItem('DROPINS_CART_ID', cartId);
                document.cookie = `DROPIN__CART__CART-ID=${cartId}; expires=${date.toUTCString()}; path=/`;
            }
        } catch (e) {
            /* eslint no-console: off */
            console.error(e);
        }
    }
}
