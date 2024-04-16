import styles from './footer.module.css';

/**
 * loads and decorates the footer
 * @param {Element} block The header block element
 * @param {Element} fragment data
 */
export default async function decorate(block, fragment) {
    if (!fragment) {
        return;
    }

    // decorate footer DOM
    const footer = document.createElement('div');
    while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

    block.append(footer);

    const footerDiv = document.querySelectorAll('.footer > div');
    for (const node of footerDiv) {
        node.classList.add(`${styles.footerDiv}`);
        const section = node.querySelectorAll('.section');
        for (const footerSection of section) {
            footerSection.classList.add(`${styles.section}`);
            const columns = footerSection.querySelectorAll('.columns-wrapper');
            for (const columnsWrapper of columns) {
                columnsWrapper.classList.add(`${styles.footerColumns}`);
                const column = columnsWrapper.children;
                for (const columnWrapper of column) {
                    const footerColumn = `${styles.footerColumn}`;
                    columnWrapper.classList.add(footerColumn);

                    const columnDiv = columnWrapper.querySelectorAll(':scope > div');
                    for (const eachColumn of columnDiv) {
                        const footerColumnDivStyle = `${styles.footerColumnDiv}`;
                        eachColumn.classList.add(footerColumnDivStyle);
                    }
                }
            }
        }
    }

    const footerUL = block.querySelectorAll('footer.footer-wrapper ul');
    for (const node of footerUL) {
        node.classList.add(`${styles.footerUL}`);
    }

    const footerDivStyles = `${styles.footerDiv}`;
    const footerDisclaimer = block.querySelectorAll(`.${footerDivStyles}`);
    for (const disclaimer of footerDisclaimer) {
        const footerDisclaimerChild = disclaimer.children;
        for (const footerDiscChild of footerDisclaimerChild) {
            footerDiscChild.classList.add(footerDivStyles);
        }
    }

    const footerSocialIcons = block.querySelectorAll('.button-container .icon');
    for (const icon of footerSocialIcons) {
        const parent = icon.parentElement;
        const ancestor = parent.parentElement;
        parent.classList.remove('button');
        ancestor.classList.add(`${styles.inlineIcon}`);
    }

    const footerColumnStyles = `.${styles.footerColumns}`;
    const footerColumLastChild = `${footerColumnStyles}:last-child`;
    const queryElement = block.querySelector(footerColumLastChild);
    const queryIcon = queryElement.querySelectorAll('.icon');
    for (const icon of queryIcon) {
        icon.parentElement.classList.add('footer-icon');
    }
}
