/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */

import { useEffect, useMemo, useCallback } from 'preact/hooks';
import { useStateContext } from '../../Context/State';
import { useConfiguratorContext } from '../../Context/Configurator';
import { useStateInputCallback } from '../../hooks/useStateInputCallback';
import { useCameraView } from '../../hooks/useCameraView';
import { ModalContextProvider, useModalContext } from '../../View/Modal';
import { Price } from '../../View/Price';
import { SET_SELECTED_PIECE, TYPE_CUSTOM } from './constants';
import ModalTypes from './Modal';
import { useCustomItemPrice } from './hooks/useCustomItemPrice';
import styles from './style.module.css';

export const TabCustom = () => {
    const {
        createYourOwn,
        messages: { customTabSubtitle },
    } = useConfiguratorContext();

    const {
        state: { configurationType, showInstructionalModal, pieces: statePieces },
    } = useStateContext();

    const { setModal } = useModalContext();

    useEffect(() => {
        if (configurationType === TYPE_CUSTOM && showInstructionalModal) {
            setModal({
                type: 'introductionalModal',
            });
        }
    }, [setModal, configurationType, showInstructionalModal]);

    const createYourOwnGroups = useMemo(
        () =>
            createYourOwn.reduce((acc, piece) => {
                acc[piece.type] = acc[piece.type] || [];
                acc[piece.type].push(piece);
                return acc;
            }, {}),
        [createYourOwn],
    );

    return useMemo(
        () => (
            <ModalContextProvider types={ModalTypes}>
                <div className={styles.subtitle}>{customTabSubtitle}</div>
                <div className={styles.custom}>
                    {Object.entries(createYourOwnGroups).map(([type, pieces]) => (
                        <div key={type}>
                            <span className={styles.title}>
                                {type.replace(/([A-Z][a-z])/g, ' $1').trim()} ({pieces.length})
                            </span>
                            <CustomItems pieces={pieces} statePieces={statePieces} />
                        </div>
                    ))}
                </div>
            </ModalContextProvider>
        ),
        [customTabSubtitle, statePieces, createYourOwnGroups],
    );
};

const CustomItems = ({ pieces, statePieces }) => {
    const pieceItems = useMemo(() => {
        const pieceIndex = Object.fromEntries(pieces.map((piece) => [`${piece.key}_${piece.type}`, piece]));
        const pieceCodes = Object.keys(pieceIndex);
        const pieceQtys = Object.fromEntries(pieceCodes.map((code) => [code, getPieceQty(code, statePieces)]));
        pieceCodes.sort((a, b) => pieceQtys[b] - pieceQtys[a]);
        return pieceCodes.map((code) => [code, pieceIndex[code]]);
        // empty array to keep the order of the pieces locked while users are on the build step. (LVSR-1985)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={styles.items}>
            {pieceItems.map(([code, piece]) => (
                <CustomItem key={code} code={code} piece={piece} />
            ))}
        </div>
    );
};

const CustomItem = ({ code, piece }) => {
    const { name, image, key, type } = piece;
    const { setModal } = useModalContext();
    const {
        state: { fabricId },
    } = useStateContext();
    const price = useCustomItemPrice(code);
    const showMoreInfo = useCallback(
        (event) => {
            event.preventDefault();
            const modalData = { pieces: [`${key}_${type}`], fabric: fabricId };
            setModal({
                type: 'info',
                title: name,
                data: modalData,
                subtitle: getModalSubtitle(price),
                additionalModalClass: styles.cyoModal,
                hideHeader: true,
            });
        },
        [setModal, name, price, fabricId, key, type],
    );
    return (
        <label className={styles.item}>
            <CustomItemQty code={code} />
            <CustomItemInput code={code} />
            <img src={image} alt={name} />
            <span className={styles.sidebarItemTitle}>
                {name}
                <button className={styles.sidebarItemTitleAction} type="button" onClick={showMoreInfo}>
                    <span>{`View more information about ${name}`}</span>
                </button>
            </span>
            <span>
                <Price value={price} />
                {`/each`}
            </span>
        </label>
    );
};

const CustomItemQty = ({ code }) => {
    const {
        state: { pieces },
    } = useStateContext();
    const qty = getPieceQty(code, pieces);

    return useMemo(() => (qty > 0 ? <span className={styles.qty}>{qty}</span> : null), [qty]);
};

const CustomItemInput = ({ code }) => {
    const {
        state: { selectedPiece },
    } = useStateContext();

    const handleChange = useStateInputCallback();
    const setCameraView = useCameraView();

    const buttonCallbackHandle = useCallback(async () => {
        await setCameraView('orthographic');
    }, [setCameraView]);

    return useMemo(
        () => (
            <input
                type="radio"
                className={`${styles.sidebarItemInput}`}
                name={SET_SELECTED_PIECE}
                checked={selectedPiece === code}
                onChange={handleChange}
                onClick={buttonCallbackHandle}
                value={code}
            />
        ),
        [selectedPiece, code, handleChange, buttonCallbackHandle],
    );
};

const getPieceQty = (code, pieces) => {
    let qty = pieces[code];

    if (code === 'standard_seat' && pieces['deep_seat'] > 0) {
        qty += pieces['deep_seat'];
    }

    if (code === 'standard_outdoor_seat' && pieces['deep_outdoor_seat'] > 0) {
        qty += pieces['deep_outdoor_seat'];
    }

    return qty;
};

const getModalSubtitle = (price) => {
    return (
        <span>
            <Price value={price} />
            {`/each`}
        </span>
    );
};
