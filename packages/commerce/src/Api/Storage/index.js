/**
 * @package     BlueAcorn/Api
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
const DB_NAME = 'storage';
const DB_VERSION = 1;
const STORE_NAME = 'store';

export async function set(key, value, duration) {
    const objectStore = await getStore('readwrite');
    const expiration = new Date().getTime() + (duration || 3600) * 1000;
    const request = objectStore.put({ key, value, expiration });
    return await new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(true);
        request.onerror = (event) => reject(event.target.error);
    });
}

export async function get(key) {
    const objectStore = await getStore('readonly');
    const request = objectStore.get(key);
    const data = await new Promise((resolve) => {
        request.onsuccess = (event) => resolve(event.target.result);
        request.onerror = () => resolve(null);
    });

    if (data) {
        const now = new Date().getTime();
        if (data.expiration < now) {
            await remove(key);
            return null;
        }
        return data.value;
    }
    return null;
}

export async function remove(key) {
    const objectStore = await getStore('readwrite');
    return await objectStore.delete(key);
}

async function getStore(mode) {
    const db = await getDb();
    const transaction = db.transaction([STORE_NAME], mode);
    return transaction.objectStore(STORE_NAME);
}

let dbPromise = null;

function getDb() {
    if (!dbPromise) {
        dbPromise = initDb();
    }
    return dbPromise;
}

function initDb() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                const objectStore = db.createObjectStore(STORE_NAME, { keyPath: 'key' });
                objectStore.createIndex('expiration', 'expiration', { unique: false });
            }
        };

        request.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction([STORE_NAME], 'readwrite');
            const objectStore = transaction.objectStore(STORE_NAME);
            const expirationIndex = objectStore.index('expiration');
            const range = IDBKeyRange.upperBound(new Date().getTime());
            expirationIndex.openCursor(range).onsuccess = (event) => {
                const cursor = event.target.result;
                if (cursor) {
                    objectStore.delete(cursor.primaryKey);
                    cursor.continue();
                } else {
                    resolve(db);
                }
            };
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
}
