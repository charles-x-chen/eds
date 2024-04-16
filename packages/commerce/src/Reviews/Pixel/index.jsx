/**
 * @package     BlueAcorn/Reviews
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useTrackActions, useTrackReviews } from '../hooks/usePixelTrack';

export default function Pixel() {
    useTrackActions();
    useTrackReviews();
    return null;
}
