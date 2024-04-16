import { addProductsToCart } from '@dropins/storefront-cart/api';
import { readBlockConfig } from '../../scripts/aem';
import LiveSearchPLP from './search';
import { getCommerceUrl, getProductUrl } from '~/Api/Url';
import './product-list.css';

export default async function decorate(block) {
    const { urlpath, category, type } = readBlockConfig(block);
    block.textContent = '';

    const storeDetails = {
        apiUrl: getCommerceUrl('graphql'),
        config: {
            pageSize: 12,
            perPageConfig: {
                pageSizeOptions: '12,24,36',
                defaultPageSizeOption: '24',
            },
            minQueryLength: '2',
            currencySymbol: '$',
            currencyRate: '1',
            displayOutOfStock: true,
            displaySearchBox: type === 'search',
            allowAllProducts: false,
            priceSlider: true,
            imageCarousel: false,
            optimizeImages: true,
            imageBaseWidth: 200,
            listview: false,
            displayMode: '', // "" for plp || "PAGE" for category/catalog
            addToCart: async (sku, options, quantity) =>
                await addProductsToCart([
                    {
                        sku,
                        selected_options: options,
                        quantity,
                    },
                ]),
        },
        route: getProductUrl,
    };

    if (type !== 'search') {
        storeDetails.config.categoryName = document.querySelector('.default-content-wrapper > h1')?.innerText;
        storeDetails.config.currentCategoryUrlPath = urlpath;

        // Enable enrichment
        block.dataset.category = category;
    }

    LiveSearchPLP({ storeDetails, root: block });
}
