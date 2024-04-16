/**
 * @package     BlueAcorn/Api
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('userAgent API', () => {
    beforeEach(() => {
        vi.resetModules();
    });

    it('should return Android for Android user agents', async () => {
        vi.stubGlobal('navigator', { userAgent: 'Mozilla/5.0 (Linux; Android 10)' });
        const userAgent = (await import('./')).default;
        expect(userAgent.value).toBe('Android');
    });

    it('should return iOS for iPhone user agents', async () => {
        vi.stubGlobal('navigator', { userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X)' });
        const userAgent = (await import('./')).default;
        expect(userAgent.value).toBe('iOS');
    });

    it('should return iOS for iPad user agents', async () => {
        vi.stubGlobal('navigator', { userAgent: 'Mozilla/5.0 (iPad; CPU OS 8_4 like Mac OS X)' });
        const userAgent = (await import('./')).default;
        expect(userAgent.value).toBe('iOS');
    });

    it('should return Desktop for Windows user agents', async () => {
        vi.stubGlobal('navigator', { userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' });
        const userAgent = (await import('./')).default;
        expect(userAgent.value).toBe('Desktop');
    });

    it('should return Desktop for Macintosh user agents', async () => {
        vi.stubGlobal('navigator', { userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' });
        const userAgent = (await import('./')).default;
        expect(userAgent.value).toBe('Desktop');
    });

    it('should return Desktop for Linux user agents', async () => {
        vi.stubGlobal('navigator', { userAgent: 'Mozilla/5.0 (X11; Linux x86_64)' });
        const userAgent = (await import('./')).default;
        expect(userAgent.value).toBe('Desktop');
    });

    it('should return unknown for unidentifiable user agents', async () => {
        vi.stubGlobal('navigator', { userAgent: 'Some Unknown Device' });
        const userAgent = (await import('./')).default;
        expect(userAgent.value).toBe('unknown');
    });
});
