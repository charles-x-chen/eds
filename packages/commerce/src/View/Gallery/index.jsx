/**
 * @package     BlueAcorn/View
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { BsArrowLeftShort, BsArrowRightShort, BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { useState, useCallback, useRef, useEffect } from 'preact/hooks';
import { t } from 'ttag';
import style from './style.module.css';
import useGroups from './hooks/useGroups';

const variants = {
    standard: {
        rootClass: style.standard,
        prevButtonIcon: <BsChevronLeft />,
        nextButtonIcon: <BsChevronRight />,
    },
    classic: {
        rootClass: style.classic,
        prevButtonIcon: <BsArrowLeftShort />,
        nextButtonIcon: <BsArrowRightShort />,
    },
};

export default function Gallery({
    children,
    activeIndex,
    responsive,
    variant,
    showDots,
    showArrows,
    keyboardNavigation,
    swipeable,
}) {
    const [index, setIndex] = useState(activeIndex);
    const [pageSize, groups] = useGroups(children, responsive);

    const ref = useRef(null);
    const slideQty = groups.length;

    const prevSlide = useCallback(() => {
        setIndex((index) => Math.max(index - 1, 0));
    }, []);

    const nextSlide = useCallback(() => {
        setIndex((index) => Math.min(index + 1, slideQty - 1));
    }, [slideQty]);

    const keyDown = useCallback(
        (event) => {
            if (keyboardNavigation) {
                if (event.key === 'ArrowRight') {
                    nextSlide();
                    ref.current.focus();
                } else if (event.key === 'ArrowLeft') {
                    prevSlide();
                    ref.current.focus();
                }
            }
        },
        [keyboardNavigation, nextSlide, prevSlide],
    );

    const dotClick = useCallback((event) => {
        event.preventDefault();
        const newIndex = parseInt(event.target.value, 10);
        setIndex(newIndex);
    }, []);

    const { rootClass, prevButtonIcon, nextButtonIcon } = variants[variant] || variants[Gallery.defaultProps.variant];

    /* eslint jsx-a11y/no-static-element-interactions: off */
    return (
        <div className={`${style.gallery} ${rootClass}`} tabIndex={-1} ref={ref} onKeyDown={keyDown}>
            <Slides index={index} setIndex={setIndex} groups={groups} pageSize={pageSize} swipeable={swipeable} />
            <div className={style.actions}>
                {showArrows && slideQty > 1 ? (
                    <PrevButton callback={prevSlide} disabled={index < 1} prevButtonIcon={prevButtonIcon} />
                ) : null}
                {showDots && slideQty > 1 ? <Dots index={index} callback={dotClick} groups={groups} /> : null}
                {showArrows && slideQty > 1 ? (
                    <NextButton callback={nextSlide} disabled={index > slideQty - 2} nextButtonIcon={nextButtonIcon} />
                ) : null}
            </div>
        </div>
    );
}

function Slides({ index: parentIndex, pageSize, setIndex: parentSetIndex, groups, swipeable }) {
    const indexRef = useRef(null);
    const containerRef = useRef(null);
    const touchRef = useRef(null);
    const slideQty = groups.length;

    const updateStyle = useCallback(
        (dragDiff) => {
            const { style } = containerRef.current;
            if (dragDiff === null) {
                style.transition = 'transform 0.5s ease';
                style.transform = `translateX(${-indexRef.current * 100}%)`;
            } else {
                style.transition = 'none';
                style.transform = `translateX(calc(${dragDiff}px + ${-indexRef.current * 100}%))`;
            }
            style.maxWidth = `${(Math.floor(pageSize) / pageSize) * 100}%`;
        },
        [pageSize],
    );

    const setIndex = useCallback(
        (index) => {
            indexRef.current = Math.max(Math.min(index, slideQty - 1), 0);
            updateStyle(null);
            parentSetIndex(indexRef.current);
        },
        [slideQty, updateStyle, parentSetIndex],
    );

    const touchStart = useCallback(
        (event) => {
            if (swipeable && event.touches?.length) {
                touchRef.current = {
                    start: event.touches[0].clientX,
                    end: null,
                };
            }
        },
        [swipeable],
    );

    const touchMove = useCallback(
        (event) => {
            if (swipeable && event.touches?.length) {
                touchRef.current.end = event.touches[0].clientX;
                const { start, end } = touchRef.current;
                updateStyle(end - start);
            }
        },
        [swipeable, updateStyle],
    );

    const touchEnd = useCallback(() => {
        if (swipeable && touchRef.current?.end !== null) {
            const { start, end } = touchRef.current;
            if (start - end > 75) {
                setIndex(indexRef.current + 1);
            } else if (end - start > 75) {
                setIndex(indexRef.current - 1);
            } else {
                setIndex(indexRef.current);
            }
        }
    }, [swipeable, setIndex]);

    useEffect(() => {
        if (parentIndex !== indexRef.current) {
            indexRef.current = parentIndex;
            updateStyle(null);
        }
    }, [parentIndex, updateStyle]);

    return (
        <div
            className={style.slides}
            ref={containerRef}
            onTouchStart={touchStart}
            onTouchMove={touchMove}
            onTouchEnd={touchEnd}
        >
            <SlideItems groups={groups} />
        </div>
    );
}

function SlideItems({ groups }) {
    return groups.map((group, index) => (
        <div key={index} className={style.slide}>
            {group.map((item, index2) => (
                <div key={index2} className={style.item}>
                    {item}
                </div>
            ))}
        </div>
    ));
}

function PrevButton({ disabled, callback, prevButtonIcon }) {
    return (
        <button
            onClick={callback}
            className={style.prevButton}
            disabled={disabled}
            aria-label={t`Previous Slide`}
            data-action={'prev'}
        >
            {prevButtonIcon}
        </button>
    );
}

function NextButton({ disabled, callback, nextButtonIcon }) {
    return (
        <button
            onClick={callback}
            className={style.nextButton}
            disabled={disabled}
            aria-label={t`Next Slide`}
            data-action={'next'}
        >
            {nextButtonIcon}
        </button>
    );
}

function Dots({ groups, index, callback }) {
    return (
        <div className={style.dots}>
            {groups.map((_, idx) => (
                <button
                    key={idx}
                    className={style.dot}
                    disabled={index === idx}
                    value={idx}
                    onClick={callback}
                    aria-label={t`Show Slide ${idx + 1}`}
                />
            ))}
        </div>
    );
}

Gallery.defaultProps = {
    variant: 'standard',
    activeIndex: 0,
    responsive: null,
    showDots: true,
    showArrows: true,
    keyboardNavigation: true,
    swipeable: true,
    children: [],
};
