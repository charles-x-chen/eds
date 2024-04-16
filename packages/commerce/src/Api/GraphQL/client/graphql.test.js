/**
 * @package     BlueAcorn/Api
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import graphqlClient from '.';

describe('GraphQL API', () => {
    beforeEach(() => {
        global.fetch = vi.fn();
    });

    it('should send a POST request with correct body when preferGetMethod is false', async () => {
        global.fetch.mockResolvedValueOnce({
            json: () => Promise.resolve({ data: 'mockData' }),
        });

        const url = '/testGraphql';
        const query = '{ testQuery { id } }';
        const variables = { id: 123 };

        await graphqlClient({ url, query, variables, preferGetMethod: false });

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables }),
        });
    });

    it('should send a GET request with correct query parameters when preferGetMethod is true', async () => {
        global.fetch.mockResolvedValueOnce({
            json: () => Promise.resolve({ data: 'mockData' }),
        });

        const url = '/testGraphql';
        const query = '{ testQuery { id } }';
        const variables = { id: 123 };

        await graphqlClient({ url, query, variables, preferGetMethod: true });

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(
            expect.stringContaining(`${new URLSearchParams({ query })}`),
            expect.objectContaining({
                method: 'GET',
            }),
        );
    });

    it('should throw an exception on a network error', async () => {
        global.fetch.mockRejectedValueOnce(new Error('Network error'));

        const url = '/testGraphql';
        const query = '{ testQuery { id } }';
        const variables = { id: 123 };

        await expect(graphqlClient({ url, query, variables })).rejects.toThrow('Network error');
    });

    it('should throw an exception on a GraphQL error', async () => {
        global.fetch.mockResolvedValueOnce({
            json: () => Promise.resolve({ errors: [{ message: 'GraphQL error' }] }),
        });

        const url = '/testGraphql';
        const query = '{ testQuery { id } }';
        const variables = { id: 123 };

        await expect(graphqlClient({ url, query, variables })).rejects.toThrow('GraphQL error');
    });
});
