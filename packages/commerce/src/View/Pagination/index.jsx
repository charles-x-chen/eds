/**
 * @package     BlueAcorn/View
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useCallback, useMemo } from 'preact/hooks';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { t } from 'ttag';
import styles from './style.module.css';

export default function Pagination({ page, first, last, siblings, dots, onChange }) {
    const onClick = useCallback(
        (event) => {
            const { target } = event;
            const button = target.tagName === 'BUTTON' ? target : target.closest('button');
            if (button && !button.disabled) {
                event.preventDefault();
                const newPage = parseInt(button.value, 10);
                if (!isNaN(newPage) && newPage >= first && newPage <= last) {
                    onChange(newPage);
                }
            }
        },
        [onChange, first, last],
    );
    if (first >= last) {
        return null;
    }
    return (
        <fieldset className={styles.pagination} aria-label={`Pagination`}>
            <button
                value={page - 1}
                disabled={page <= first}
                key="prev"
                onClick={onClick}
                aria-label={t`Previous Page`}
            >
                <BsChevronLeft />
            </button>
            <PageRange page={page} first={first} last={last} siblings={siblings} dots={dots} onClick={onClick} />
            <button value={page + 1} disabled={page >= last} key="next" onClick={onClick} aria-label={t`Next Page`}>
                <BsChevronRight />
            </button>
        </fieldset>
    );
}

Pagination.defaultProps = {
    page: 1,
    first: 1,
    last: 1,
    siblings: 2,
    dots: '...',
    onChange: () => {},
};

function PageRange({ page, first, last, siblings, dots, onClick }) {
    const pagination = useMemo(() => {
        const usePage = Math.max(Math.min(page, last - siblings), first + siblings);
        const leftSibling = Math.max(usePage - siblings, first);
        const rightSibling = Math.min(usePage + siblings, last);
        const start = Math.max(first + 1, leftSibling);
        const end = Math.min(last - 1, rightSibling);
        const length = end - start + 1;

        return [
            first,
            ...(leftSibling - first >= 2 ? [dots] : []),
            ...Array.from({ length }, (_, idx) => idx + start),
            ...(last - rightSibling >= 2 ? [dots] : []),
            last,
        ];
    }, [page, first, last, siblings, dots]);

    return pagination.map((pageNumber, index) =>
        pageNumber === dots ? (
            <span key={index}>{pageNumber}</span>
        ) : (
            <button
                key={index}
                className={page === pageNumber ? styles.active : ''}
                value={pageNumber}
                onClick={onClick}
                aria-label={t`Page ${pageNumber}`}
                aria-current={page === pageNumber}
            >
                {pageNumber}
            </button>
        ),
    );
}
