/**
 * @package     BlueAcorn/Api
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { describe, vi, it, expect } from 'vitest';
import { set, get, remove } from '.';

describe('IndexedDB Storage', () => {
    it('should store and retrieve a value', async () => {
        const key = 'testKey';
        const value = 'testValue';
        const value2 = 'testValue2';
        const value3 = 'testValue3';

        await set(key, value, 60);
        await set(key, value2, 60);
        await set(key, value3, 60);
        const retrievedValue = await get(key);
        expect(retrievedValue).toBe(value3);
    });

    it('should use 1h duration by default', async () => {
        const key1 = 'testKey1';
        const value1 = 'testValue1';

        await set(key1, value1);

        vi.useFakeTimers();
        vi.advanceTimersByTime(3500000);

        const res1 = await get(key1);
        expect(res1).toBe(value1);

        vi.advanceTimersByTime(200000);

        const res2 = await get(key1);
        expect(res2).toBeNull();

        vi.useRealTimers();
    });

    it('should remove a value', async () => {
        const key = 'testKey';
        const value = 'testValue';

        await set(key, value, 60);
        await remove(key);
        const retrievedValue = await get(key);
        expect(retrievedValue).toBeNull();
    });

    it('should not retrieve a value after its TTL has expired', async () => {
        const key = 'testKey';
        const value = 'testValue';

        vi.useFakeTimers();

        await set(key, value, 10);
        vi.advanceTimersByTime(11000);

        const retrievedValue = await get(key);

        expect(retrievedValue).toBeNull();

        vi.useRealTimers();
    });

    it('should clean up expired values when the database is loaded', async () => {
        const key1 = 'testKey1';
        const value1 = 'testValue1';
        const key2 = 'testKey2';
        const value2 = 'testValue2';
        const key3 = 'testKey3';
        const value3 = 'testValue3';

        vi.useFakeTimers();

        const promiseSet1 = set(key1, value1, 1);
        const promiseSet2 = set(key2, value2, 300);
        const promiseSet3 = set(key3, value3, 300);

        await Promise.all([promiseSet1, promiseSet2, promiseSet3]);
        vi.advanceTimersByTime(2000);

        const promiseGet1 = get(key1);
        const promiseGet2 = get(key2);
        const promiseGet3 = get(key3);
        const [result1, result2, result3] = await Promise.all([promiseGet1, promiseGet2, promiseGet3]);
        expect(result1).toBeNull();
        expect(result2).toBe(value2);
        expect(result3).toBe(value3);

        vi.useRealTimers();
    });
});
