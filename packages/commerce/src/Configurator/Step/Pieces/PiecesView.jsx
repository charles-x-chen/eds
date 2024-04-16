/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */

import { useMemo, useCallback } from 'preact/hooks';
import { t } from 'ttag';
import { BsDash, BsPlus } from 'react-icons/bs';
import { useStateContext } from '../../Context/State';
import { useConfiguratorContext } from '../../Context/Configurator';
import { SET_PIECES } from './constants';
import styles from './style.module.css';

export const PiecesView = () => {
    const {
        piecesGroups,
        steps: { pieces },
    } = useConfiguratorContext();
    const { seatCushion, ...allowedPieces } = piecesGroups;
    return useMemo(
        () => (
            <div className={styles.wrapper}>
                <span className={styles.subtitle}>{pieces.title}</span>
                {Object.entries(allowedPieces).map(([pieceKey, pieceDetail]) => (
                    <div key={pieceKey}>
                        <span className={styles.title}>
                            {pieceKey.replace(/([A-Z][a-z])/g, ' $1').trim()} ({pieceDetail.length})
                        </span>
                        <Items indexPieces={pieceDetail} />
                    </div>
                ))}
            </div>
        ),
        [allowedPieces, pieces],
    );
};

const CustomItem = ({ piece }) => {
    const { name, image, key, type } = piece;
    const code = `${key}_${type}`;
    return (
        <label className={styles.item}>
            <img src={image} alt={name} />
            <span className={styles.sidebarItemTitle}>{`${key.replace(/([a-z])([A-Z])/g, '$1 $2')} ${type}`}</span>
            <IncrementDecrement code={code} />
        </label>
    );
};

const IncrementDecrement = ({ code }) => {
    const {
        state: { pieces },
        dispatch,
    } = useStateContext();

    const increment = useCallback(() => {
        pieces[`${code}`] = pieces[`${code}`] + 1;
        dispatch({ type: SET_PIECES, value: pieces });
    }, [code, dispatch, pieces]);

    const decrement = useCallback(() => {
        pieces[`${code}`] = pieces[`${code}`] - 1;
        dispatch({ type: SET_PIECES, value: pieces });
    }, [code, dispatch, pieces]);

    const handleChange = useCallback(
        (event) => {
            const { name, value } = event.target;
            pieces[`${name}`] = value;
            dispatch({ type: SET_PIECES, value: pieces });
        },
        [dispatch, pieces],
    );

    return useMemo(
        () => (
            <div className={styles.qtyWrapper}>
                <div className={styles.actionsWrapper}>
                    <button
                        className="sidebar-item-actions-decrement"
                        onClick={decrement}
                        disabled={pieces[`${code}`] < 1}
                    >
                        <span>{t`decrement`}</span>
                        <BsDash />
                    </button>
                    <input
                        type="number"
                        className="sidebar-item__qty"
                        min="1"
                        name={code}
                        onChange={handleChange}
                        value={pieces[`${code}`] || 0}
                    />
                    <button className="sidebar-item-actions-increment" onClick={increment}>
                        <span>{t`increment`}</span>
                        <BsPlus />
                    </button>
                </div>
            </div>
        ),
        [increment, decrement, handleChange, code, pieces],
    );
};

const Items = ({ indexPieces }) => {
    return (
        <div className={styles.items}>
            {indexPieces.map((piece) => (
                <CustomItem key={piece.key} piece={piece} />
            ))}
        </div>
    );
};
