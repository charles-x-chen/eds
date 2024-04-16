import styles from './columns.module.css';

const variants = {
    benefits: {
        className: styles.benefits,
        decorator: decorateGrid,
    },
    default: {
        className: styles.columns,
        decorator: decorateDefault,
    },
};

export default function decorate(block) {
    const variant = variants[block.classList[1]] || variants.default;
    block.classList.add(variant.className);
    variant.decorator(block);
}

function decorateGrid(block) {
    const cols = [...block.firstElementChild.children];
    block.classList.add(`columns-${cols.length}-cols`);
    const cells = [];
    for (const row of [...block.children]) {
        for (const col of [...row.children]) {
            cells.push(col);
        }
    }
    block.replaceChildren(...cells);
}

function decorateDefault(block) {
    const cols = [...block.firstElementChild.children];
    block.classList.add(`columns-${cols.length}-cols`);

    // setup image columns
    for (const row of [...block.children]) {
        for (const col of [...row.children]) {
            const pic = col.querySelector('picture');
            if (pic) {
                const picWrapper = pic.closest('div');
                if (picWrapper && picWrapper.children.length === 1) {
                    // picture is only content in column
                    picWrapper.classList.add('columns-img-col');
                }
            }
        }
    }
}
