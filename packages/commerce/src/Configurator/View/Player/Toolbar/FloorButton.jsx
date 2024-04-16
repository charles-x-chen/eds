/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { useState, useCallback, useMemo } from 'preact/hooks';
import { usePlayerContext } from '../../../Context/Player';
import { SET_FLOOR } from '../constants';
import styles from '../style.module.css';
import mobileSignal from '~/Api/Mobile';
import { getCommerceUrl } from '~/Api/Url';

export const FloorButton = ({ title }) => {
    const [visible, setVisible] = useState();

    const dropdownToggle = useCallback(
        (event) => {
            event.preventDefault();
            setVisible(!visible);
            document.body.classList.toggle('icon-modal__active');
            if (document.body.classList.contains('icon-modal__active')) {
                document.getElementById('player-floor-button').classList.add(styles.active);
            } else {
                document.getElementById('player-floor-button').classList.remove(styles.active);
            }
        },
        [visible],
    );

    return (
        <div className="player-button-floor__wrapper">
            <button
                id="player-floor-button"
                className={`${styles.playerButton} ${styles.floor}`}
                onClick={dropdownToggle}
            >
                <span>{title}</span>
            </button>
            {visible ? <FloorItems setVisible={setVisible} dropdownToggle={dropdownToggle} /> : null}
        </div>
    );
};

const defaultFloor = { name: t`None`, image: null };

const flooringOptions = {
    whiteoak: {
        name: 'White Oak',
        threekitId: 'WhiteOak',
        image: 'media/wysiwyg/configurator/flooring/whiteoak.png',
    },
    coastalgrey: {
        name: 'Coastal Grey',
        threekitId: 'CoastalGrey',
        image: 'media/wysiwyg/configurator/flooring/coastalgrey.png',
    },
    saddlebrown: {
        name: 'Saddle Brown',
        threekitId: 'SaddleBrown',
        image: 'media/wysiwyg/configurator/flooring/saddlebrown.png',
    },
    chestnut: {
        name: 'Chestnut',
        threekitId: 'Chestnut',
        image: 'media/wysiwyg/configurator/flooring/chestnut.png',
    },
    espresso: {
        name: 'Espresso',
        threekitId: 'Espresso',
        image: 'media/wysiwyg/configurator/flooring/espresso.png',
    },
};

const FloorItems = ({ dropdownToggle, setVisible }) => {
    const [selectedFabric, setSelectedFabric] = useState('none');

    return (
        <div className={`${styles.floorOptionsWrapper}`}>
            <div className={`${styles.floorOptionsHeader}`}>
                <span>{t`Floor Texture`}</span>
                <button onClick={dropdownToggle}>
                    <span>{t`close`}</span>
                </button>
            </div>
            <div className={styles.floorOptionsList}>
                <FloorItem floor={defaultFloor} code="none" setSelectedFabric={setSelectedFabric} key="none" />
                {Object.entries(flooringOptions).map(([code, floorOption]) => {
                    return (
                        <FloorItem floor={floorOption} code={code} key={code} setSelectedFabric={setSelectedFabric} />
                    );
                })}
            </div>
            <ApplyFloorButton setVisible={setVisible} selectedFabric={selectedFabric} />
        </div>
    );
};

const FloorItem = ({ floor: { name, image }, code, setSelectedFabric }) => {
    const floorImage = image ? image : `media/wysiwyg/configurator/flooring/floor-none.png`;

    return (
        <label className={`${styles.floorLabels}`}>
            {floorImage ? <img src={getCommerceUrl(floorImage)} alt={name} /> : null}
            <span className={`${styles.floorName}`}>{name}</span>
            <FloorItemInput code={code} setSelectedFabric={setSelectedFabric} />
            <span className={`${styles.floorSelectIcon}`} />
        </label>
    );
};

const FloorItemInput = ({ code, setSelectedFabric }) => {
    const {
        state: { floor: stateFloor },
        dispatch,
    } = usePlayerContext();

    const isMobile = mobileSignal.value;

    const setFloorCallback = useCallback(
        (event) => {
            const { name, value } = event.target;

            if (isMobile) {
                return setSelectedFabric(value);
            }

            dispatch({
                type: name,
                value,
            });
        },
        [dispatch, isMobile, setSelectedFabric],
    );

    return useMemo(
        () => (
            <input
                type="radio"
                name={SET_FLOOR}
                className="floor-selection-input"
                onClick={setFloorCallback}
                value={code}
                checked={stateFloor === code}
            />
        ),
        [setFloorCallback, stateFloor, code],
    );
};

export const usePlayerFloorId = () => {
    const {
        state: { floor },
    } = usePlayerContext();

    return useMemo(() => {
        return flooringOptions[floor]?.threekitId || null;
    }, [floor]);
};

const ApplyFloorButton = ({ selectedFabric, setVisible }) => {
    const isMobile = mobileSignal.value;
    const { dispatch } = usePlayerContext();

    const setFloorCallback = useCallback(
        (event) => {
            const { name, value } = event.target;
            setVisible(false);
            document.body.classList.remove('icon-modal__active');
            dispatch({
                type: name,
                value,
            });
        },
        [dispatch, setVisible],
    );

    return useMemo(
        () =>
            isMobile && (
                <div className={styles.applyFloor}>
                    <button
                        className={styles.primary}
                        onClick={setFloorCallback}
                        name={SET_FLOOR}
                        value={selectedFabric}
                    >
                        {t`Apply Floor`}
                    </button>
                </div>
            ),
        [isMobile, setFloorCallback, selectedFabric],
    );
};
