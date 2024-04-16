/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { useMemo } from 'preact/hooks';
import { useConfiguratorContext } from '../Context/Configurator';
import { useStateContext } from '../Context/State';
import { DropdownComponent } from './Dropdown';

export const Dimensions = ({ helperClass = null }) => {
    const { pieces } = useConfiguratorContext();
    const {
        state: { piece },
    } = useStateContext();
    const { dimensions } = pieces[piece];
    const content = useMemo(() => {
        return {
            title: 'Dimensions',
            desc: dimensions,
        };
    }, [dimensions]);

    return dimensions ? <DropdownComponent title={t`Dimensions`} content={content} helperClass={helperClass} /> : null;
};
