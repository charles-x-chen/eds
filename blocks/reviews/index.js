import { readBlockConfig } from '../../scripts/aem';
import Reviews from '~/Reviews';
import render from '~/render';
import './reviews.css';

export default async function decorate(block) {
    const config = readBlockConfig(block);
    block.innerHTML = '';
    render(block, Reviews, config);
}
