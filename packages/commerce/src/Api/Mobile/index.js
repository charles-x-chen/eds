/**
 * @package     BlueAcorn/Api
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { signal } from '@preact/signals';

const media = window.matchMedia('(max-width: 1023px)');

const mobileSignal = signal(media.matches);
media.onchange = (event) => (mobileSignal.value = event.matches);

export default mobileSignal;
