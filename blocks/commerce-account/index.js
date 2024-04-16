import MyAccount from '~/MyHub/MyAccount';
import render from '~/render';

export default function decorate(block) {
    block.innerHTML = '';
    render(block, MyAccount);
}
