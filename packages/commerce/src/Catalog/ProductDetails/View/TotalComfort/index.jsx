/**
 * @package     BlueAcorn/Catalog
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';

export default function TotalComfort() {
    return (
        <div>
            {t`Total Comfort Guaranteed`}:{' '}
            <a href="/terms-and-conditions#ReturnsHomeTrial">{t`Risk-Free 60-Day Home Trial`}</a>
        </div>
    );
}
