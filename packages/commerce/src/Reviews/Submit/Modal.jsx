/**
 * @package     BlueAcorn/Reviews
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { SubmitDataProvider, SubmitStateProvider, useSubmitStateContext } from './Context';
import { Form } from './Form';
import { Category } from './Category';

const modalTypes = {
    form: <Form />,
    category: <Category />,
};

export default function SubmitModal({ children }) {
    return (
        <SubmitStateProvider>
            <SubmitDataProvider>
                <ModalView />
                {children}
            </SubmitDataProvider>
        </SubmitStateProvider>
    );
}

const ModalView = () => {
    const { visible } = useSubmitStateContext();
    return visible ? modalTypes[visible] : null;
};
