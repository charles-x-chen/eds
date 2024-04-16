import { generateSubmenuItemDOM } from '../navbar-submenu-item/index';
import './navbar-menu-item.css';

/**
 * Creates DOM for Menu Item
 * @param {Element} textProp Text property for menu item
 * @param {Element} urlProp Link property for menu item
 * @param subTitleProp
 * @param tagsProp
 */
function generateMenuItemDOM(textProp, urlProp, subTitleProp, tagsProp) {
    const menuContent = document.createElement('div');
    menuContent.classList.add('menu-content');
    menuContent.setAttribute('aria-expanded', 'false');
    menuContent.setAttribute('data-menu-title', textProp.innerText.trim().toLowerCase());
    const subTitle = document
        .createRange()
        .createContextualFragment(`<span class='menu-item-subtitle'>${subTitleProp.innerText.trim()}</span>`);
    const menuText = document
        .createRange()
        .createContextualFragment(
            `<div>${textProp.innerText.trim()} <span class='menu-item-tag'>${tagsProp.innerText.trim()}</span></div>`,
        );

    if (urlProp.innerText) {
        const link = document
            .createRange()
            .createContextualFragment(`<a href='${urlProp.innerText}'>${textProp.innerText.trim()}</a>`);
        menuContent.append(link);
        menuContent.setAttribute('role', 'button');
    } else {
        menuContent.append(menuText);
        menuContent.append(subTitle);
        menuContent.setAttribute('role', 'button');

        // If menu item link is not provided, open submenu items
        menuContent.addEventListener('click', (e) => {
            const expanded = menuContent.getAttribute('aria-expanded') === 'true';
            toggleAllNavSections(menuContent.closest('.section'));
            menuContent.setAttribute('aria-expanded', expanded ? 'false' : 'true');
            e.target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        });

        closeMenuOnClickOutside(menuContent);
    }
    return menuContent;
}

/**
 * Toggles all nav sections
 * @param {Element} sections The container element
 * @param {Boolean} expanded Whether the element should be expanded or collapsed
 */
function toggleAllNavSections(sections, expanded = false) {
    const subsections = Array.from(
        sections.querySelectorAll('.section .navbar-menu-item .menu-container .menu-content'),
    );
    for (const section of subsections) {
        section.setAttribute('aria-expanded', expanded);
    }
}

/**
 * Closes menu when clicked outside the active nav panel
 */
function closeMenuOnClickOutside(menuContent) {
    document.addEventListener('click', (event) => {
        const isClickedOutside = !menuContent.contains(event.target);
        if (isClickedOutside) {
            menuContent.setAttribute('aria-expanded', 'false');
        }
    });
}

export default function decorate(block) {
    const [prop1, prop2, prop3, prop4, ...submenuBlocks] = [...block.children];

    const menuContainer = document.createElement('div');
    menuContainer.classList.add('menu-container');

    const menuItemDOM = generateMenuItemDOM(prop1.children[0], prop2.children[0], prop3.children[0], prop4.children[0]);
    const submenuContainer = document.createElement('div');
    submenuContainer.classList.add('submenu-container');

    // loop through all submenu items
    for (const submenuBlock of submenuBlocks) {
        const submenuItemDOM = generateSubmenuItemDOM([...submenuBlock.children]);
        submenuBlock.textContent = '';
        submenuBlock.classList.add('navbar-submenu-item', 'block');
        submenuBlock.append(submenuItemDOM);
        submenuContainer.append(submenuBlock);

        const vertDivider = document.createElement('div');
        vertDivider.classList.add('vertical-divider');
        submenuContainer.append(vertDivider);
    }
    menuItemDOM.append(submenuContainer);

    // Prevent submenu close when submenu items is clicked
    submenuContainer.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // hamburger for mobile
    if (!block.closest('.navbar-menu-item-container')?.querySelector('.hamburger')) {
        const hamburger = document.createElement('div');
        hamburger.classList.add('hamburger');
        hamburger.innerHTML = `<div class="bar1"></div>
            <div class="bar2"></div>
            <div class="bar3"></div>`;
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('cross');
            toggleAllNavSections(menuContainer.closest('.section'));
            const closestMenuContainers = block
                .closest('.navbar-menu-item-container')
                ?.querySelectorAll('.menu-container');
            if (closestMenuContainers) {
                for (const container of closestMenuContainers) {
                    container.classList.toggle('show');
                }
            }
        });
        block.closest('.navbar-menu-item-container').prepend(hamburger);
    }

    menuContainer.append(menuItemDOM);
    block.textContent = '';
    block.append(menuContainer);
}
