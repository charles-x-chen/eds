import OrderHistory from '~/MyHub/OrderHistory';
import render from '~/render';

export default function decorate(block) {
    block.innerHTML = '';
    render(block, OrderHistory);
}
