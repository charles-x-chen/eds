/**
 * @package     BlueAcorn/MyHub
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { useCallback, useState } from 'preact/hooks';
import miniSwatchProduct from './gql/miniSwatchProduct.gql';
import MiniSwatchesModalView from './View/MiniSwatchesModalView';
import useQuery from '~/hooks/useQuery';

export default function MiniSwatchesModal({ sku, children, dataproductid }) {
    const [{ data, fetching, error }] = useQuery({ query: miniSwatchProduct, variables: { sku } });
    const [showModal, setShowModal] = useState(false);
    const openModal = useCallback(
        (event) => {
            event.preventDefault();
            document.body.classList.add('swatch-modal-active');
            document.querySelector(`[data-sku="${sku}"]`)?.classList.add('active');
            setShowModal(true);
        },
        [setShowModal, sku],
    );

    if (fetching) {
        return 'Loading';
    }
    if (data?.products?.items.length > 0) {
        return (
            <div>
                <div
                    onClick={openModal}
                    tabIndex="0"
                    onKeyPress={(e) => e.key === 'Enter' && openModal(e)}
                    role={'button'}
                >
                    {children}
                </div>
                <MiniSwatchesModalView
                    item={data.products.items[0]}
                    showModal={showModal}
                    sku={sku}
                    dataProductId={dataproductid}
                    setShowModal={setShowModal}
                />
            </div>
        );
    }
    return error?.graphQLErrors?.[0]?.message || t`An error occured`;
}
