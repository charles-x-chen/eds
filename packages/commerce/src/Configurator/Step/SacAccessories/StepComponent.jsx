/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useMemo, useState, useCallback } from 'preact/hooks';
import { t } from 'ttag';
import { useConfiguratorContext } from '../../Context/Configurator';
import { useStateContext } from '../../Context/State';
import { Price } from '../../View/Price';
import { TYPE_SQUATTOMAN } from '../Accessories/constants';
import { AccessoryImageGallery, AccessoryVariants, AccessoryQty } from '../Accessories/StepComponent';
import { calculateTotalPrice } from '../../calculator';
import { useTotalsContext } from '../../Context/Totals';
import styles from './style.module.css';
import RichText from '~/View/RichText';
import { getCommerceUrl } from '~/Api/Url';

export const StepComponent = () => {
    return <Accessories />;
};

const Accessories = () => {
    const { accessories, steps } = useConfiguratorContext();
    const {
        accessories: { title, subtitle },
    } = steps;

    return (
        <div className={styles.contentWrapper}>
            <div className={styles.titleWrapper}>
                <div className={styles.title}>{title}</div>
            </div>
            <div className={styles.subtitleWrapper}>
                <div className={styles.subtitle}>{subtitle}</div>
            </div>
            <div className={styles.accessoryContentWrapper}>
                {Object.entries(accessories).map(([type, accessories]) => {
                    return <Accessory key={type} type={type} accessories={accessories} />;
                })}
            </div>
        </div>
    );
};

const Accessory = ({ accessories, type }) => {
    const {
        state: { accessories: stateAccessories },
    } = useStateContext();
    const { key } = stateAccessories[type];
    const accessory = accessories[key];

    return useMemo(() => {
        if (type === TYPE_SQUATTOMAN) {
            return <AccessorySquattoman key={type} type={type} accessories={accessories} accessory={accessory} />;
        }

        return <DefaultSacAccessory key={type} type={type} accessories={accessories} accessory={accessory} />;
    }, [type, accessories, accessory]);
};

const DefaultSacAccessory = ({ accessories, accessory, type }) => {
    const index = useConfiguratorContext();
    const {
        modules: {
            accessories: {
                prevTotal: { options: prevOptions, total: prevTotal },
            },
        },
    } = useTotalsContext();

    const price = useMemo(() => {
        const objects = prevOptions.objects ? [...prevOptions.objects] : [];
        const options = { ...prevOptions, objects };
        objects.push([accessory, 1]);
        const total = calculateTotalPrice(index, options).total;
        return total - prevTotal;
    }, [accessory, index, prevOptions, prevTotal]);

    return <AccessorySac key={type} type={type} accessories={accessories} accessory={accessory} price={price} />;
};

const AccessorySquattoman = ({ accessories, accessory, type }) => {
    const {
        state: { fabricId, fabricLeadTime },
    } = useStateContext();
    const index = useConfiguratorContext();

    const {
        modules: {
            accessories: {
                prevTotal: { options: prevOptions, total: prevTotal },
            },
        },
    } = useTotalsContext();

    const fabricObject = useMemo(() => {
        const {
            piece: { type, key },
        } = accessory;
        return index.squattoman?.fabricOptions?.[fabricLeadTime]?.[fabricId]?.pieces?.[`${key}_${type}`] || null;
    }, [index, fabricId, fabricLeadTime, accessory]);

    const squattomanAccessory = useMemo(() => {
        if (accessory) {
            const parts = ['media', 'threekit', 'Squattoman', fabricId, `feed.webp`];
            const imageSrc = getCommerceUrl(parts.join('/'));
            return {
                ...accessory,
                images: [imageSrc],
            };
        }
    }, [accessory, fabricId]);

    const price = useMemo(() => {
        if (fabricObject) {
            const objects = prevOptions.objects ? [...prevOptions.objects] : [];
            const options = { ...prevOptions, objects };
            objects.push([squattomanAccessory.piece, 1]);
            objects.push([fabricObject, 1]);
            const total = calculateTotalPrice(index, options).total;
            return total - prevTotal;
        }
        return null;
    }, [index, prevOptions, squattomanAccessory, fabricObject, prevTotal]);

    return price && !isNaN(price) ? (
        <AccessorySac key={type} type={type} accessories={accessories} accessory={squattomanAccessory} price={price} />
    ) : null;
};

const AccessorySac = ({ accessories, accessory, type, price = null }) => {
    return useMemo(() => {
        return (
            <div className={`${styles.accessory}`}>
                <div className={styles.image}>
                    <AccessoryImageGallery accessory={accessory} />
                </div>
                <div className={styles.content}>
                    <div className={styles.variants}>
                        <AccessoryVariants accessories={accessories} type={type} />
                    </div>

                    <div className={styles.contentColumns}>
                        <div className={styles.contentCol1}>
                            <div className={styles.accessoryTitle}>
                                <span className={styles.accessoryDetailsLink}>{accessory.name}</span>
                            </div>
                            <div className={styles.price}>
                                <span>+</span>
                                {!price ? <Price value={accessory.piece?.price} /> : <Price value={price} />}
                            </div>
                        </div>
                        <div className={styles.contentCol1}>
                            <div className={styles.actions}>
                                <AccessoryQty type={type} />
                            </div>
                        </div>
                    </div>
                    <AccessoryDetails accessory={accessory} />
                </div>
            </div>
        );
    }, [accessory, accessories, type, price]);
};

const AccessoryDetails = ({ accessory }) => {
    const [showDetails, setShowDetails] = useState(false);
    const toggle = useCallback(() => setShowDetails((showDetails) => !showDetails), []);

    if (accessory.details) {
        return (
            <div className={`details-row ${showDetails ? 'expanded' : ''}`}>
                <button onClick={toggle}>{t`Details`}</button>
                {showDetails ? <AccessoryDetailsContent accessory={accessory} /> : null}
            </div>
        );
    }

    return '';
};

const AccessoryDetailsContent = ({ accessory }) => {
    return <RichText content={accessory.details} />;
};
