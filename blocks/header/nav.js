import { events } from '@dropins/tools/event-bus';
import styles from './header.module.css';
import MY_ACCOUNT from './gql/myAccount.gql';
import graphqlRequest from '~/Api/GraphQL';

// media query match that indicates mobile/tablet width
const isDesktop = window.matchMedia('(min-width: 900px)');
const isMobile = window.matchMedia('(max-width: 768)');

function closeOnEscape(e) {
    if (e.code === 'Escape') {
        const nav = document.getElementById('nav');
        const navSections = nav.querySelector(`.${styles.sections}`);
        const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
        if (navSectionExpanded && isDesktop.matches) {
            toggleAllNavSections(navSections);
            navSectionExpanded.focus();
        } else if (!isDesktop.matches) {
            toggleMenu(nav, navSections);
            nav.querySelector('button').focus();
        }
    }
}

function openOnKeydown(e) {
    const focused = document.activeElement;
    const isNavDrop = focused.className === styles.drop;
    if (isNavDrop && (e.code === 'Enter' || e.code === 'Space')) {
        const dropExpanded = focused.getAttribute('aria-expanded') === 'true';

        toggleAllNavSections(focused.closest(`.${styles.sections}`));
        focused.setAttribute('aria-expanded', dropExpanded ? 'false' : 'true');
    }
}

function focusNavSection() {
    document.activeElement.addEventListener('keydown', openOnKeydown);
}

/**
 * Toggles all nav sections
 * @param {Element} sections The container element
 * @param {Boolean} expanded Whether the element should be expanded or collapsed
 */
function toggleAllNavSections(sections, expanded = false) {
    const subsections = Array.from(sections.querySelectorAll(`.${styles.sections} .${styles.content} > ul > li`));
    for (const section of subsections) {
        section.setAttribute('aria-expanded', expanded);
    }
}

/**
 * Toggles the entire nav
 * @param {Element} nav The container element
 * @param {Element} navSections The nav sections within the container element
 * @param {*} forceExpanded Optional param to force nav expand behavior when not null
 */
function toggleMenu(nav, navSections, forceExpanded = null) {
    const expanded = forceExpanded !== null ? !forceExpanded : nav.getAttribute('aria-expanded') === 'true';
    const button = nav.querySelector(`.${styles.hamburger} button`);
    document.body.style.overflowY = expanded || isDesktop.matches ? '' : 'hidden';
    nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    toggleAllNavSections(navSections, expanded || isDesktop.matches ? 'false' : 'true');
    button.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
    // enable nav dropdown keyboard accessibility
    const navDrops = Array.from(navSections.querySelectorAll(`.${styles.drop}`));
    if (isDesktop.matches) {
        for (const drop of navDrops) {
            if (!drop.hasAttribute('tabindex')) {
                drop.setAttribute('role', 'button');
                drop.setAttribute('tabindex', 0);
                drop.addEventListener('focus', focusNavSection);
            }
        }
    } else {
        for (const drop of navDrops) {
            drop.removeAttribute('role');
            drop.removeAttribute('tabindex');
            drop.removeEventListener('focus', focusNavSection);
        }
    }
    // enable menu collapse on escape keypress
    if (!expanded || isDesktop.matches) {
        // collapse menu on escape press
        window.addEventListener('keydown', closeOnEscape);
    } else {
        window.removeEventListener('keydown', closeOnEscape);
    }
}

export default function getNav(fragment) {
    // decorate nav DOM
    const nav = document.createElement('nav');
    nav.id = 'nav';
    while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

    const classes = [styles.topNav, styles.brand, styles.sections, styles.tools];
    for (const [index, className] of classes.entries()) {
        const section = nav.children[index];
        if (section) {
            section.classList.add(className);
        }
    }

    const navBrand = nav.querySelector(`.${styles.brand}`);
    const brandLogos = Array.from(navBrand.querySelectorAll('picture'));
    if (brandLogos.length) {
        for (const brandLogo of brandLogos) {
            const link = document.createElement('a');
            link.href = '/';
            brandLogo.parentElement.appendChild(link);
            link.appendChild(brandLogo);
            brandLogo.querySelector('img').loading = 'eager';
        }
    }

    const navSections = nav.querySelector(`.${styles.sections}`);
    if (navSections) {
        for (const contentWrapper of navSections.querySelectorAll('.default-content-wrapper')) {
            contentWrapper.classList.add(styles.content);
        }
        const subsections = Array.from(navSections.querySelectorAll(`:scope .${styles.content} > ul > li`));
        for (const navSection of subsections) {
            if (navSection.querySelector('ul')) {
                navSection.classList.add(styles.drop);
            }
            navSection.addEventListener('click', () => {
                if (isDesktop.matches) {
                    fragment.querySelector(`.${styles.searchInput}`).classList.remove(`${styles.hidden}`);
                    const expanded = navSection.getAttribute('aria-expanded') === 'true';
                    toggleAllNavSections(navSections);
                    navSection.setAttribute('aria-expanded', expanded ? 'false' : 'true');
                }
            });
        }
    }

    const navTools = nav.querySelector(`.${styles.tools}`);

    //Account
    const accountWrapper = navTools.querySelector('.default-content-wrapper');
    accountWrapper.classList.add(styles.accountWrapper);
    const accountTrigger = accountWrapper.querySelector(' p');
    const accountLinksWrappers = navTools.querySelectorAll('ul');

    for (const accountLinksWrapper of accountLinksWrappers) {
        accountLinksWrapper.classList.remove('active-links');
        accountLinksWrapper.classList.add(styles.accountLinksWrapper);
    }

    // Make a POST request to the GraphQL endpoint
    (async () => {
        try {
            const responseData = await getCustomerCartData();
            const mobileNavigationWrapper = document.querySelector('.navbar-menu-item-container');
            if (responseData?.data?.customer) {
                const customerData = responseData.data.customer;
                const initials = customerData.firstname.charAt(0) + customerData.lastname.charAt(0);
                const greeting = document.createRange().createContextualFragment(`<li class=${styles.customerGreeting}'>
                    <span>Welcome, ${customerData.firstname} ${customerData.lastname}!</span>
                </li>`);
                const mobileAccountsWrapper = document.createRange()
                    .createContextualFragment(`<div class='mobile-accounts-wrapper'>
                    <span><span class='${styles.customerInitials}'>${initials}</span> Hi, ${customerData.firstname}!</span>
                    <a class='mobile-account-link' href='customer/account'>My Accounts</a>
                </div>`);
                accountTrigger.innerHTML = `<span class='${styles.customerInitials}'>${initials}</span>`;
                accountLinksWrappers[1].classList.add('active-links');
                accountLinksWrappers[1].prepend(greeting);
                mobileNavigationWrapper.append(mobileAccountsWrapper);
            }
        } catch (error) {
            const mobileNavigationWrapper = document.querySelector('.navbar-menu-item-container');
            const mobileAccountsWrapper = document.createRange()
                .createContextualFragment(`<div class='mobile-accounts-wrapper'>
                    <a class='mobile-account-link' href='customer/account'>Sign In / Create an Account</a>
                </div>`);
            accountLinksWrappers[0].classList.add('active-links');
            mobileNavigationWrapper.append(mobileAccountsWrapper);
        }
    })();

    accountTrigger.addEventListener('click', () => {
        accountWrapper.querySelector('.active-links').classList.toggle(styles.accountLinksWrapperActive);
        const searchDropdown = `.${styles.searchInput}`;
        const searchDropdownElement = document.querySelector(searchDropdown);
        if (!searchDropdownElement.classList.contains(styles.hidden)) {
            searchDropdownElement.classList.add(`${styles.hidden}`);
        }
    });

    // Minicart
    const minicartButton = document.createRange().createContextualFragment(`<div class='minicart-wrapper'>
    <button type='button' class='${styles.minicart}'>Cart (0)</button>
    <div></div>
  </div>`);
    navTools.append(minicartButton);

    events.on(
        'cart/data',
        (data) => {
            const cartWrapper = navTools.querySelector('.minicart-wrapper');
            if (data?.totalQuantity) {
                cartWrapper.classList.add(styles.cartActive);
            } else {
                cartWrapper.classList.remove(styles.cartActive);
            }
        },
        { eager: true },
    );

    // Search
    const searchInput = document
        .createRange()
        .createContextualFragment(`<div class='${styles.searchInput} ${styles.hidden}'></div>`);
    document.body.querySelector('header').append(searchInput);

    const searchButton = document
        .createRange()
        .createContextualFragment(`<button type='button' class='${styles.searchButton}'>Search</button>`);
    navTools.append(searchButton);
    navTools.querySelector(`.${styles.searchButton}`).addEventListener('click', async () => {
        const searchInputDiv = document.querySelector(`.${styles.searchInput}`);

        const otherDropdowns = `.${styles.accountLinksWrapper}`;
        const otherDropdownElement = document.querySelector(otherDropdowns);
        const activeClasses = otherDropdownElement.classList.contains(styles.accountLinksWrapperActive);
        if (activeClasses) {
            otherDropdownElement.classList.remove(`${styles.accountLinksWrapperActive}`);
        }

        searchInputDiv.classList.toggle(styles.hidden);
        if (!searchInputDiv.classList.contains(styles.hidden) && !searchInputDiv.querySelector('form')) {
            const [{ default: render }, { default: LiveSearch }] = await Promise.all([
                import('~/render'),
                import('~/Catalog/LiveSearch'),
            ]);
            render(searchInputDiv, LiveSearch);
        }
    });

    // StoreLocator
    const storeLocatorLink = document
        .createRange()
        .createContextualFragment(
            `<div  class='${styles.storeLocator}'> <a href='/storelocator'>Store Locator</a></div>`,
        );
    if (isMobile) {
        navTools.append(storeLocatorLink);
    }

    // hamburger for mobile
    const hamburger = document.createElement('div');
    hamburger.classList.add(styles.hamburger);
    hamburger.innerHTML = `<button type='button' aria-controls='nav' aria-label='Open navigation'>
      <span class='${styles.hamburgerIcon}'></span>
    </button>`;
    hamburger.addEventListener('click', () => toggleMenu(nav, navSections));
    nav.prepend(hamburger);
    nav.setAttribute('aria-expanded', 'false');
    // prevent mobile nav behavior on window resize
    toggleMenu(nav, navSections, isDesktop.matches);
    isDesktop.addEventListener('change', () => toggleMenu(nav, navSections, isDesktop.matches));

    const navWrapper = document.createElement('div');
    navWrapper.className = styles.wrapper;
    navWrapper.append(nav);

    const topNav = nav.querySelector(`.${styles.topNav}`);

    const result = [];
    if (topNav) {
        topNav.querySelector('.columns > div').classList.add(styles.topNavColumns);
        const accessibility = topNav.querySelector('a[href*="#accessibility"]');
        if (accessibility) {
            accessibility.classList.add('UsableNetAssistive');
        }
        result.push(topNav);
    }
    result.push(navWrapper);
    return result;
}

async function getCustomerCartData() {
    return await graphqlRequest({ query: MY_ACCOUNT });
}
