/**
 * @package     BlueAcorn/View
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useMemo } from 'preact/hooks';
import Gallery from '~/View/Gallery';

export default function ContentSlider({ children, showDots, showArrows, slideCount, mobileSlideCount }) {
    const responsive = useMemo(
        () => ({
            0: { items: mobileSlideCount ?? 1 },
            1024: { items: slideCount ?? 1 },
        }),
        [mobileSlideCount, slideCount],
    );
    return (
        <Gallery
            children={children}
            responsive={responsive}
            variant="classic"
            showDots={showDots}
            showArrows={showArrows}
        />
    );
}
