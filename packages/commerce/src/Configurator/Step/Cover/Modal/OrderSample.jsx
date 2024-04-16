/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */

import { t } from 'ttag';
import { useEffect } from 'preact/hooks';
import { Modal, useModalContext } from '../../../View/Modal';
import SWATCH_PLACE_QUOTE from '../../../gql/swatchPlaceQuote.gql';
import { SampleDataLoading } from './Sample';
import useMutation from '~/hooks/useMutation';

export const OrderSample = () => {
    return (
        <Modal title={t`Fabric Swatches`} closeTitle={t`Back to Cover`}>
            <OrderSampleContent />
        </Modal>
    );
};

const OrderSampleContent = () => {
    const {
        modal: { items },
    } = useModalContext();

    const [{ data = null, loading, error }, callback] = useMutation(SWATCH_PLACE_QUOTE);

    useEffect(() => {
        callback();
    }, [items, callback]);

    if (data) {
        if (data.swatchPlaceQuote) {
            location.href = '/cart';
        }
    } else {
        return <SampleDataLoading loading={loading} error={error} />;
    }
};
