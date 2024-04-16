/**
 * @package     BlueAcorn/View
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { toChildArray } from 'preact';
import { useMemo } from 'preact/hooks';
import usePageSize from './usePageSize';

export default function useGroups(children, responsive) {
    const pageSize = usePageSize(responsive);
    const items = toChildArray(children);
    return useMemo(() => {
        const groups = [];
        const floorSize = Math.floor(pageSize);
        for (let i = 0; i < items.length; i += floorSize) {
            groups.push(items.slice(i, i + floorSize));
        }
        while (groups[groups.length - 1].length !== floorSize) {
            groups[groups.length - 1].push(null);
        }
        return [pageSize, groups];
    }, [pageSize, items]);
}
