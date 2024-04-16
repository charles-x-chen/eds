/**
 * @package     BlueAcorn/Api
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('isMobile API', () => {
    beforeEach(() => {
        vi.resetModules();
    });

    it('should correctly identify mobile first', async () => {
        const emulate = emulateMatchMedia(true);
        const mobileSignal = (await import('./')).default;
        expect(mobileSignal.value).toBe(true);
        emulate(false);
        expect(mobileSignal.value).toBe(false);
        emulate(true);
        expect(mobileSignal.value).toBe(true);
    });
    it('should correctly identify desktop first', async () => {
        const emulate = emulateMatchMedia(false);
        const mobileSignal = (await import('./')).default;
        expect(mobileSignal.value).toBe(false);
        emulate(true);
        expect(mobileSignal.value).toBe(true);
    });
});

function emulateMatchMedia(defaultValue) {
    const media = {
        matches: defaultValue,
        onchange: () => {},
    };

    window.matchMedia = () => {
        return media;
    };
    return (matches) => {
        media.matches = matches;
        media.onchange({ matches });
    };
}
