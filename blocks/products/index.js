import { readBlockConfig } from '../../scripts/aem';
import Products from '~/Catalog/Products';
import render from '~/render';
import './products.css';

export default async function decorate(block) {
    const config = readBlockConfig(block);
    block.innerHTML = '';
    render(block, Products, config);
}
