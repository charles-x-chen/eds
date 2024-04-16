/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { useCallback, useMemo } from 'preact/hooks';
import { useStateInputCallback } from '../../hooks/useStateInputCallback';
import { useStateContext } from '../../Context/State';
import { useConfiguratorContext } from '../../Context/Configurator';
import { Price } from '../../View/Price';
import { useTotals } from '../../hooks/useTotals';
import { useHookCallback } from '../../hooks/useHookCallback';
import { useModalContext } from '../../View/Modal';
import { SET_CONFIGURATION, SET_CONFIGURATION_TYPE, TYPE_CUSTOM } from './constants';
import styles from './style.module.css';

export const TabPreBuilt = () => {
    const {
        preBuiltGroups,
        messages: { prebuiltTabSubtitle },
    } = useConfiguratorContext();

    return (
        <div className={styles.preBuilt}>
            <span className={styles.subtitle}>{prebuiltTabSubtitle}</span>
            {preBuiltGroups.map((groupData, groupCode) => (
                <PreBuiltGroup key={groupCode} {...groupData} />
            ))}
        </div>
    );
};

const PreBuiltGroup = ({ name, items }) => {
    return (
        <div>
            <span className={styles.title}>{`${name} (${items.length})`}</span>
            <div className={styles.items}>
                {items.map((item) => (
                    <PreBuiltItem item={item} key={item.code} />
                ))}
            </div>
        </div>
    );
};

const PreBuiltItem = ({ item: { code, image, name } }) => {
    const { setModal } = useModalContext();
    const { state } = useStateContext();
    const { fabricId } = state;
    const index = useConfiguratorContext();
    const updateStateCallback = useHookCallback(index.type, 'updateState');

    const newState = useMemo(() => {
        const newState = { ...state };
        updateStateCallback(newState, index, {
            type: SET_CONFIGURATION,
            value: code,
        });
        return newState;
    }, [code, index, state, updateStateCallback]);
    const {
        total,
        totalWithoutDiscount,
        modules: {
            configure: {
                options: { pieces },
            },
        },
    } = useTotals(newState, false);

    const showMoreInfo = useCallback(
        (event) => {
            event.preventDefault();
            const infoPiecesToShow = Object.entries(pieces)
                .filter(([code, qty]) => {
                    return qty > 0 && !code.toLowerCase().includes('storage') && !code.includes('backPillow');
                })
                .map(([code]) => code);

            const modalData = { pieces: infoPiecesToShow, fabric: fabricId };
            setModal({
                type: 'info',
                title: name,
                data: modalData,
                additionalModalClass: 'prebuilt-modal',
                subtitle: 'swipe for individual piece info',
                hidePrice: true,
            });
        },
        [setModal, name, fabricId, pieces],
    );

    return (
        <label className={styles.item}>
            <PreBuiltItemInput code={code} />
            <PreBuiltItemEdit />
            <img src={image} alt={name} />
            <span className={styles.sidebarItemTitle}>
                {name}
                <button className={styles.sidebarItemTitleAction} type="button" onClick={showMoreInfo}>
                    <span>{`View more information about ${name}`}</span>
                </button>
            </span>
            <PreBuiltItemPrice total={total} totalWithoutDiscount={totalWithoutDiscount} />
        </label>
    );
};

const PreBuiltItemEdit = () => {
    const { dispatch } = useStateContext();
    const editConfiguration = useCallback(
        (event) => {
            event.preventDefault();
            dispatch({
                type: SET_CONFIGURATION_TYPE,
                value: TYPE_CUSTOM,
            });
        },
        [dispatch],
    );

    return useMemo(
        () => (
            <div className={styles.edit}>
                <button onClick={editConfiguration}>{t`Edit`}</button>
            </div>
        ),
        [editConfiguration],
    );
};

const PreBuiltItemPrice = ({ total, totalWithoutDiscount }) => {
    return (
        <span>
            {totalWithoutDiscount > total && (
                <s>
                    <Price value={totalWithoutDiscount} />
                </s>
            )}{' '}
            <Price value={total} />
        </span>
    );
};

const PreBuiltItemInput = ({ code }) => {
    const {
        state: { configuration },
    } = useStateContext();

    const handleChange = useStateInputCallback();

    return useMemo(
        () => (
            <input
                type="radio"
                className={styles.sidebarItemInput}
                name={SET_CONFIGURATION}
                checked={code === configuration}
                onChange={handleChange}
                value={code}
            />
        ),
        [handleChange, code, configuration],
    );
};
