/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { useCallback, useMemo } from 'preact/hooks';
import { useConfiguratorContext } from '../../Context/Configurator';
import { Price } from '../../View/Price';
import { useStateContext } from '../../Context/State';
import { useStateInputCallback } from '../../hooks/useStateInputCallback';
import { Player } from '../../View/Player';
import { ModalContextProvider, useModalContext } from '../../View/Modal';
import { useHookCallback } from '../../hooks/useHookCallback';
import { useTotals } from '../../hooks/useTotals';
import ModalTypes from './Modal';
import { SET_PIECE } from './constants';
import styles from './style.module.css';

export const StepComponent = () => {
    return (
        <ModalContextProvider types={ModalTypes}>
            <Player show="mobile" />
            <SacOptions />
        </ModalContextProvider>
    );
};

export const SacOptions = () => {
    const {
        sacSizes,
        steps: { sacSize },
    } = useConfiguratorContext();

    return useMemo(
        () => (
            <div className={styles.sidebarWrapper}>
                <div>
                    <div className={styles.introduction}>
                        <h3>{sacSize.title}</h3>
                        <div>{sacSize.subtitle}</div>
                    </div>
                    <div className={styles.sidebarItems}>
                        {sacSizes.map((size) => (
                            <SacOption key={size.code} code={size.code} size={size} />
                        ))}
                    </div>
                </div>
            </div>
        ),
        [sacSizes, sacSize],
    );
};

const SacOption = ({ code: type, size }) => {
    const { state } = useStateContext();
    const index = useConfiguratorContext();
    const updateStateCallback = useHookCallback(index.type, 'updateState');
    const { image, seatingAmount } = size;
    const code = `${type}_sac`;
    const piece = index.pieces[code];
    const { name } = piece;

    const newState = useMemo(() => {
        const newState = { ...state };
        updateStateCallback(newState, index, {
            type: SET_PIECE,
            value: code,
        });
        return newState;
    }, [code, index, state, updateStateCallback]);
    const totals = useTotals(JSON.parse(JSON.stringify(newState)), false);

    const disabledPiece = useMemo(() => {
        const { fabricId = null, fabricLeadTime = null } = state;
        const { key, type } = piece;
        const coverObject = index.fabricOptions?.[fabricLeadTime]?.[fabricId]?.pieces?.[`${key}_${type}`];
        return !coverObject;
    }, [index, state, piece]);

    return useMemo(() => {
        const defaultPrice = totals.total;
        const originalPrice = totals.totalWithoutDiscount;
        const showDiscount = defaultPrice !== originalPrice;
        piece.image = image;

        return (
            <label className={`${styles.sidebarItem} ${disabledPiece ? styles.disabledPiece : ''}`} htmlFor={code}>
                <span className={styles.sidebarImage}>
                    <img className="sidebar-item-src" src={image} alt={name} />
                </span>
                <span className={styles.title}>
                    <div className={styles.name}>
                        {name}
                        <SacInfoButton piece={piece} />
                    </div>
                    <div className={styles.radio}>
                        <SacOptionInput code={code} disabledPiece={disabledPiece} />
                        <div className={styles.checkbox} />
                    </div>
                </span>
                <span className={styles.priceWrapper}>
                    {showDiscount && (
                        <s>
                            <Price value={originalPrice} />
                        </s>
                    )}{' '}
                    <Price value={defaultPrice} />
                </span>
                <span className={styles.sidebarSeats}>{seatingAmount}</span>
            </label>
        );
    }, [code, image, name, piece, seatingAmount, totals.totalWithoutDiscount, totals.total, disabledPiece]);
};

const SacOptionInput = ({ code, disabledPiece }) => {
    const {
        state: { piece },
    } = useStateContext();

    const handleChange = useStateInputCallback();

    return useMemo(
        () => (
            <input
                type="radio"
                id={code}
                className={styles.sidebarInput}
                name={SET_PIECE}
                checked={piece === code}
                onChange={handleChange}
                value={code}
                disabled={disabledPiece}
            />
        ),
        [handleChange, piece, code, disabledPiece],
    );
};

const SacInfoButton = ({ piece }) => {
    const { name } = piece;

    const { setModal } = useModalContext();
    const showMoreInfo = useCallback(
        (event) => {
            event.preventDefault();
            setModal({
                type: 'info',
                title: name,
                data: piece,
            });
        },
        [setModal, name, piece],
    );

    return (
        <button className={styles.detailsLink} data-item-code={piece.type} onClick={showMoreInfo}>
            {t`Details`}
        </button>
    );
};
