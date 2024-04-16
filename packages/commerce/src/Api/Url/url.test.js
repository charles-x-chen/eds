/**
 * @package     BlueAcorn/Api
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { describe, it, expect, vi, beforeEach, beforeAll, afterAll } from 'vitest';

describe('URL API', () => {
    let nativeLocation = null;

    beforeAll(() => {
        nativeLocation = window.location;
        window.location = new URL('https://www.website.com/');
    });

    afterAll(() => {
        if (nativeLocation) {
            window.location = nativeLocation;
        }
    });

    beforeEach(() => {
        vi.resetModules();
    });

    it('should correctly return base URLs', async () => {
        process.env.EDGE_URL = 'https://edge.test.com/';
        process.env.COMMERCE_URL = 'https://commerce.test.com/';
        const { getCommerceUrl, getEdgeUrl } = await import('./');

        expect(getCommerceUrl('')).toBe('https://commerce.test.com/');
        expect(getCommerceUrl('/')).toBe('https://commerce.test.com/');
        expect(getEdgeUrl('')).toBe('https://edge.test.com/');
        expect(getEdgeUrl('/')).toBe('https://edge.test.com/');
    });

    it('should correctly return base URLs if relative', async () => {
        process.env.EDGE_URL = '/';
        process.env.COMMERCE_URL = '/';
        const { getCommerceUrl, getEdgeUrl } = await import('./');

        expect(getCommerceUrl('')).toBe('https://www.website.com/');
        expect(getCommerceUrl('/')).toBe('https://www.website.com/');
        expect(getEdgeUrl('')).toBe('https://www.website.com/');
        expect(getEdgeUrl('/')).toBe('https://www.website.com/');
    });
});
