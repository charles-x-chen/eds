/**
 * @package     BlueAcorn/View
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useState, useEffect } from 'preact/hooks';

export default function usePageSize(responsive) {
    const [pageSize, setPageSize] = useState(() => {
        return responsive ? getResponsivePageSize(responsive) : 1;
    });

    useEffect(() => {
        const setResponsivePageSize = () => {
            const pageSize = getResponsivePageSize(responsive);
            setPageSize(pageSize);
        };
        if (responsive) {
            window.addEventListener('resize', setResponsivePageSize);
        }
        return () => {
            if (responsive) {
                window.removeEventListener('resize', setResponsivePageSize);
            }
        };
    }, [responsive]);

    return pageSize;
}

function getResponsivePageSize(responsive) {
    let pageSize = 1;
    for (const [width, { items }] of Object.entries(responsive)) {
        if (window.innerWidth > width) {
            pageSize = items;
        }
    }
    return Math.max(pageSize, 1);
}
