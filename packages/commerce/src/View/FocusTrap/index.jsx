/**
 * @package     BlueAcorn/View
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useRef, useEffect } from 'preact/hooks';

export default function FocusTrap({ className, onEscape, children, initialIndex, role }) {
    const ref = useRef(null);
    const escRef = useRef(onEscape);
    escRef.current = onEscape;

    useEffect(() => {
        const handleKeyPress = createKeyPressEventHandler(ref, escRef, initialIndex);
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [initialIndex]);

    return (
        <div className={className} ref={ref} role={role}>
            {children}
        </div>
    );
}

function createKeyPressEventHandler(ref, closeRef, initialIndex) {
    return (event) => {
        const { key, shiftKey } = event;
        if (key === 'Tab') {
            const focused = document.activeElement;
            const parent = ref.current;
            const focusable = getFocusableElements(parent);
            if (focusable.length) {
                const first = focusable[0];
                const second = focusable[initialIndex] || first;
                const last = focusable[focusable.length - 1];
                if (!parent.contains(focused)) {
                    event.preventDefault();
                    second.focus();
                } else if (!shiftKey && focused === last) {
                    event.preventDefault();
                    first.focus();
                } else if (shiftKey && focused === first) {
                    event.preventDefault();
                    last.focus();
                }
            }
        } else if (key === 'Escape') {
            closeRef.current(event);
        }
    };
}

const focusableSelector =
    'a[href],area[href],input:not([disabled]):not([type="hidden"]),select:not([disabled]),textarea:not([disabled]),button:not([disabled]),iframe,object,embed,[contenteditable],[tabindex]:not([tabindex^="-"])';

function getFocusableElements(parent) {
    return Array.from(parent.querySelectorAll(focusableSelector)).filter(
        (elem) => elem.offsetWidth > 0 && elem.offsetHeight > 0,
    );
}

FocusTrap.defaultProps = {
    className: '',
    onEscape: () => {},
    initialIndex: 0,
    role: 'dialog',
};
