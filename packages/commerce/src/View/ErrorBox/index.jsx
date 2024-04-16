/**
 * @package     BlueAcorn/View
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useErrorBoundary } from 'preact/hooks';
import { t } from 'ttag';
import { toChildArray } from 'preact';
import style from './style.module.css';

export default function ErrorBox({ children, silent }) {
    /* eslint no-console: off */
    const [error, tryAgain] = useErrorBoundary(console.error);
    if (error) {
        if (silent) {
            return null;
        }
        return (
            <div className={style.error}>
                {t`An error occured`}
                <button onClick={tryAgain}>Try Again</button>
            </div>
        );
    }
    return children;
}

ErrorBox.defaultProps = {
    silent: false,
};

export function ErrorBoxList({ children, silent }) {
    return toChildArray(children).map((child, index) => (
        <ErrorBox silent={silent} key={index}>
            {child}
        </ErrorBox>
    ));
}

ErrorBoxList.defaultProps = {
    silent: false,
};
