import { decorateBlock, loadBlock } from '../aem';

const tabElementMap = {};

function calculateTabSectionCoordinate(main, lastTabBeginningIndex, targetTabSourceSection) {
    if (!tabElementMap[lastTabBeginningIndex]) {
        tabElementMap[lastTabBeginningIndex] = [];
    }
    tabElementMap[lastTabBeginningIndex].push(targetTabSourceSection);
}

function calculateTabSectionCoordinates(main) {
    let lastTabIndex = -1;
    let foldedTabsCounter = 0;
    const mainSections = [...main.childNodes];
    for (const section of main.querySelectorAll('div.section[data-tab-title]')) {
        const currentSectionIndex = mainSections.indexOf(section);

        if (lastTabIndex < 0 || currentSectionIndex - foldedTabsCounter !== lastTabIndex) {
            // we construct a new tabs component, at the currentSectionIndex
            lastTabIndex = currentSectionIndex;
            foldedTabsCounter = 0;
        }

        foldedTabsCounter += 2;
        calculateTabSectionCoordinate(main, lastTabIndex, section);
    }
}

async function autoBlockTabComponent(main, targetIndex, tabSections) {
    // the display none will prevent a major CLS penalty.
    // franklin will remove this once the blocks are loaded.
    const section = document.createElement('div');
    section.setAttribute('class', 'section');
    section.setAttribute('style', 'display:none');
    section.dataset.sectionStatus = 'loading';
    const tabsBlock = document.createElement('div');
    tabsBlock.setAttribute('class', 'tabs');

    const tabContentsWrapper = document.createElement('div');
    tabContentsWrapper.setAttribute('class', 'contents-wrapper');

    tabsBlock.appendChild(tabContentsWrapper);

    for (const tabSection of tabSections) {
        tabSection.classList.remove('section');
        tabSection.classList.add('contents');
        // remove display: none
        tabContentsWrapper.appendChild(tabSection);
        tabSection.style.display = null;
    }
    main.insertBefore(section, main.childNodes[targetIndex]);
    section.append(tabsBlock);
    decorateBlock(tabsBlock);
    await loadBlock(tabsBlock);

    // unset display none manually. somehow in some race conditions it won't be picked up by lib-franklin.
    // CLS is not affected
    section.style.display = null;
}

export default function decorateTabs(main) {
    calculateTabSectionCoordinates(main);

    // when we aggregate tab sections into a tab autoblock, the index get's lower.
    // say we have 3 tabs starting at index 10, 12 and 14. and then 3 tabs at 18, 20 and 22.
    // when we fold the first 3 into 1, those will start at index 10. But the other 3 should now
    // start at 6 instead of 18 because 'removed' 2 sections.
    let sectionIndexDelta = 0;
    Object.keys(tabElementMap).map(async (tabComponentIndex) => {
        const tabSections = tabElementMap[tabComponentIndex];
        await autoBlockTabComponent(main, tabComponentIndex - sectionIndexDelta, tabSections);
        sectionIndexDelta = tabSections.length - 1;
    });
}
