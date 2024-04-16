import './alert.css';

export default function decorate(block) {
    const propsDiv = block.firstElementChild;
    const contentDiv = block.lastElementChild;

    if (!propsDiv.textContent || !contentDiv) {
        return;
    }
    const hideContent = propsDiv.textContent.trim() === 'hide';
    propsDiv.classList.add('hidden');

    if (hideContent) {
        contentDiv.classList.add('hidden');
    } else {
        contentDiv.classList.remove('hidden');
    }
}
