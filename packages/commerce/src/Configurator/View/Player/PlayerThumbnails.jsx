/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { useEffect, useMemo, useState, useCallback } from 'preact/hooks';
import { usePlayerContext } from '../../Context/Player';
import { useStateContext } from '../../Context/State';
import { ThumbnailCarousel } from '../ThumbnailCarousel';
import styles from './style.module.css';
import mobileSignal from '~/Api/Mobile';

export const PlayerThumbnails = ({ angles = [], getImageSrc, code = '', currentConfiguration = '', currentFabric }) => {
    const [currentIndex, setCurrentIndex] = useState('0');

    const {
        state: { api },
    } = usePlayerContext();

    const {
        state: { configuration = null, armStyle = null, piece = null },
    } = useStateContext();
    useEffect(() => {
        setCurrentIndex('0');
    }, [setCurrentIndex, configuration, armStyle, piece]);

    return useMemo(() => {
        if (!api) {
            return null;
        }
        return (
            <div>
                <PlayerThumbnailSync currentIndex={currentIndex} />
                <DragToRotateText currentIndex={currentIndex} code={code} />
                <PlayerThumbnailButtons
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                    code={code}
                    getImageSrc={getImageSrc}
                    angles={angles}
                    currentConfiguration={currentConfiguration}
                    currentFabric={currentFabric}
                />
            </div>
        );
    }, [api, currentIndex, setCurrentIndex, code, getImageSrc, angles, currentConfiguration, currentFabric]);
};

const PlayerThumbnailSync = ({ currentIndex }) => {
    const {
        state: { api },
    } = usePlayerContext();
    useEffect(() => {
        if (api.setCameraTool) {
            api.setCameraTool({
                key: 'rotate',
                enabled: currentIndex !== 'zoom',
            });
        }
        if (api.rotateCamera && currentIndex !== '360') {
            api.rotateCamera(currentIndex);
        }
    }, [api, currentIndex]);
};

const DragToRotateText = ({ currentIndex, code }) => {
    const dragToRotateTextVisible = useMemo(() => {
        return (
            [
                'sactional',
                'sac',
                'throwPillow',
                'outdoorSactional',
                'sacCover',
                'throwPillowCover',
                'sactionalPiece',
            ].includes(code) && currentIndex !== 'zoom'
        );
    }, [currentIndex, code]);

    return useMemo(
        () => (
            <div className="drag-to-rotate">
                <span
                    className={dragToRotateTextVisible ? styles.dragVisible : 'drag-invisible'}
                >{t`Drag to rotate`}</span>
            </div>
        ),
        [dragToRotateTextVisible],
    );
};

const PlayerThumbnailButtons = (props) => {
    const isMobile = mobileSignal.value;

    return useMemo(() => {
        if (props.code === 'sactionalPiece' || isMobile) {
            return null;
        }
        return <PlayerThumbnailButtonsVisible {...props} />;
    }, [isMobile, props]);
};

const PlayerThumbnailButtonsVisible = ({
    angles,
    getImageSrc,
    currentIndex,
    setCurrentIndex,
    currentConfiguration,
    currentFabric,
}) => {
    const items = useMemo(() => {
        const items = [];
        for (const angle of angles) {
            items.push({
                code: angle.toString(),
                className: 'camera-rotate',
                title: 'Rotate',
                imageSrc: getImageSrc(angle),
            });
        }
        items.push({
            code: 'zoom',
            className: 'camera-zoom',
            title: 'Zoom',
            imageSrc: getImageSrc('zoom'),
        });
        return items;
    }, [getImageSrc, angles]);

    return useMemo(() => {
        return (
            <div className={`${styles.playerThumbnailsWrapper}`}>
                {items.map((item) => (
                    <PlayerThumbnailButton
                        item={item}
                        setCurrentIndex={setCurrentIndex}
                        selected={currentIndex === item.code}
                        key={item.code}
                    />
                ))}
                <ThumbnailCarousel currentConfiguration={currentConfiguration} currentFabric={currentFabric} />
            </div>
        );
    }, [currentIndex, items, setCurrentIndex, currentConfiguration, currentFabric]);
};

const PlayerThumbnailButton = ({ item: { className, title, imageSrc, code }, setCurrentIndex, selected }) => {
    const callback = useCallback(() => setCurrentIndex(code), [code, setCurrentIndex]);
    if (!imageSrc) {
        return;
    }
    return (
        <button
            className={`${styles.playerThumbnail} ${className} ${selected ? styles.playerThumbnailActive : ''}`}
            onClick={callback}
            name={title}
        >
            <img src={imageSrc} alt={title} />
            <span>{title}</span>
        </button>
    );
};
