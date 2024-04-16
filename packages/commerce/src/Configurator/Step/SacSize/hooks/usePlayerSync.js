/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useEffect } from 'preact/hooks';
import { usePlayerProductId } from './usePlayerProductId';

export const usePlayerSync = ({ api }) => {
    const productId = usePlayerProductId();
    useEffect(() => {
        api.setProduct(productId);
    }, [api, productId]);
};
