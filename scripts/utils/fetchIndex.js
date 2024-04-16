export default async function fetchIndex(indexFile, pageSize = 500) {
    const handleIndex = async (offset) => {
        const resp = await fetch(`/${indexFile}.json?limit=${pageSize}&offset=${offset}`);
        const json = await resp.json();

        return {
            complete: json.limit + json.offset === json.total,
            offset: json.offset + pageSize,
            promise: null,
            data: [...window.index[indexFile].data, ...json.data],
        };
    };

    window.index = window.index || {};
    window.index[indexFile] = window.index[indexFile] || {
        data: [],
        offset: 0,
        complete: false,
        promise: null,
    };

    // Return index if already loaded
    if (window.index[indexFile].complete) {
        return window.index[indexFile];
    }

    // Return promise if index is currently loading
    if (window.index[indexFile].promise) {
        return window.index[indexFile].promise;
    }

    window.index[indexFile].promise = handleIndex(window.index[indexFile].offset);
    const newIndex = await window.index[indexFile].promise;
    window.index[indexFile] = newIndex;

    return newIndex;
}
