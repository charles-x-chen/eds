import SignIn from '~/MyHub/SignIn';
import render from '~/render';

export default function decorate(block) {
    block.innerHTML = '';
    render(block, SignIn);
}
