import { initializers } from '@dropins/tools/initializer';
import { initialize, setEndpoint, setFetchGraphQlHeaders } from '@dropins/storefront-pdp/api';
import { addProductsToCart } from '@dropins/storefront-cart/api';
import { render as productRenderer } from '@dropins/storefront-pdp/render';
import ProductDetails from '@dropins/storefront-pdp/containers/ProductDetails';
import { getCommerceUrl } from '~/Api/Url';

export default async function decorate(block) {
    initializers.register(initialize, {});
    setEndpoint(getCommerceUrl('graphql'));
    setFetchGraphQlHeaders({});

    return productRenderer.render(ProductDetails, {
        sku: getSkuFromUrl(),
        carousel: {
            controls: 'thumbnailsRow',
            thumbnailsLoadingMode: 'lazy',
            mobile: true,
        },
        hideSku: true,
        hideQuantity: false,
        hideShortDescription: true,
        hideDescription: true,
        hideAttributes: true,
        hideURLParams: false,
        slots: {
            Breadcrumbs: (ctx) => {
                const link = document.createElement('a');
                link.textContent = 'Home';
                link.href = '/';
                ctx.appendChild(link);

                const span = document.createElement('span');
                span.textContent = ctx.data.name;
                ctx.appendChild(span);
            },
            Quantity: (ctx) => {
                const isBundle = ctx.data.options?.some(({ typename }) => typename === 'ProductViewOptionValueProduct');
                if (isBundle) {
                    const text = document.createElement('ul');
                    text.classList.add('add-to-cart');
                    text.replaceChildren(
                        ...ctx.data.options.map(({ label, items }) => {
                            const li = document.createElement('li');
                            li.textContent = `${label}: ${items[0]?.label}`;
                            return li;
                        }),
                    );
                    ctx.prependChild(text);
                }
            },
            Actions: (ctx) => {
                // Add to Cart Button
                ctx.appendButton((next, state) => {
                    const adding = state.get('adding');
                    return {
                        text: adding ? 'Adding to Cart' : 'Add to Cart',
                        icon: 'Cart',
                        variant: 'primary',
                        disabled: adding || !next.data.inStock,
                        onClick: async () => {
                            try {
                                state.set('adding', true);

                                if (
                                    !next.valid &&
                                    !next.data.options?.find(
                                        ({ typename }) => typename === 'ProductViewOptionValueProduct',
                                    )
                                ) {
                                    // eslint-disable-next-line no-console
                                    console.warn('Invalid product', next.values);
                                    return;
                                }

                                await addProductsToCart([{ ...next.values }]);
                            } catch (error) {
                                // eslint-disable-next-line no-console
                                console.warn('Error adding product to cart', error);
                            } finally {
                                state.set('adding', false);
                            }
                        },
                    };
                });

                ctx.appendButton(() => ({
                    icon: 'Heart',
                    variant: 'secondary',
                    text: 'Add to Wishlist',
                    onClick: () => console.debug('Add to Wishlist', ctx.data),
                }));

                ctx.appendButton(() => ({
                    icon: 'Delivery',
                    variant: 'secondary',
                    text: 'Share',
                    onClick: () => console.debug('Share', ctx.data),
                }));
            },
        },
    })(block);
}

function getSkuFromUrl() {
    const path = window.location.pathname;
    const result = path.match(/\/products\/[\w|-]+\/([\w|-]+)$/);
    return result?.[1];
}
