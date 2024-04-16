/**
 * @package     BlueAcorn/Headless
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useEffect, useRef, useState } from 'preact/hooks';

export default function useInView() {
    const ref = useRef(null);
    const [inView, setInview] = useState(false);
    useEffect(() => {
        const element = ref.current;
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setInview(true);
                        observer.unobserve(element);
                    }
                }
            },
            { threshold: 0.1 },
        );

        observer.observe(element);
        return () => {
            observer.unobserve(element);
        };
    }, []);
    return [ref, inView];
}
