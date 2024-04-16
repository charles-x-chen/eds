/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { useCallback, useMemo } from 'preact/hooks';
import { useStateContext } from '../../Context/State';
import { useConfiguratorContext } from '../../Context/Configurator';
import { useStateInputCallback } from '../../hooks/useStateInputCallback';
import { Player } from '../../View/Player';
import { Price } from '../../View/Price';
import { ModalContextProvider, useModalContext } from '../../View/Modal';
import { useTotalsContext } from '../../Context/Totals';
import { calculateTotalPrice } from '../../calculator';
import { Loader } from '../../View/Loader';
import { SET_STEALTHTECH, NO_STEALTHTECH_CODE } from './constants';
import ModalTypes from './Modal';
import { StealthTechNotAvaliableComponent } from './StealthTechNotAvaliableComponent';
import { Subwoofer } from './Subwoofer';
import styles from './style.module.css';
import { getCommerceUrl } from '~/Api/Url';

export const StepComponent = () => {
    const {
        steps: {
            stealthtech: { title, subtitle },
        },
    } = useConfiguratorContext();

    return (
        <ModalContextProvider types={ModalTypes}>
            <div className={styles.stepWrapper}>
                <Player show="mobile" helperClass={styles.stealthtechStep} />
                <StealthTechNotAvaliableComponent />
                <div className={styles.titleWrapper}>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.subtitle}>{subtitle}</div>
                </div>
                <Loader>
                    <StealthtechItems />
                    <ExperienceStealthtechBlock />
                </Loader>
            </div>
        </ModalContextProvider>
    );
};

const StealthtechItems = () => {
    const { stealthtechList } = useConfiguratorContext();

    return (
        <div className={styles.stItems}>
            {stealthtechList.map((item) => {
                return <StealthtechItem key={item.piece.key} item={item} />;
            })}
        </div>
    );
};

const StealthtechItem = ({ item }) => {
    const {
        state: { stealthTechEligible, stealthtech: stateStealthtech, pieces },
    } = useStateContext();
    const code = item.piece.key;

    const displayStealthTech = stealthTechEligible.includes(code) && pieces['rollArm_side'] === 0;

    return useMemo(() => {
        if (code === NO_STEALTHTECH_CODE || displayStealthTech) {
            return <StealthtechItemVisible code={code} item={item} selected={stateStealthtech === code} />;
        }
    }, [code, stateStealthtech, item, displayStealthTech]);
};

const StealthtechItemVisible = ({ code, item, selected }) => {
    const { name, description } = item;
    const additionalInfo = {
        features: description,
    };

    return (
        <label className={styles.stItem}>
            <StealthtechItemInput code={code} selected={selected} />
            <div className={styles.title}>{name}</div>
            <div className={styles.price}>
                <StealthtechItemPrice item={item} />
            </div>
            <ShowMoreInfoButton code={code} title={name} data={additionalInfo} />
            {code !== 'none' && selected ? <Subwoofer /> : null}
        </label>
    );
};

const StealthtechItemPrice = ({ item }) => {
    const index = useConfiguratorContext();
    const {
        modules: {
            stealthtech: {
                prevTotal: { options: prevOptions, total: prevTotal },
            },
        },
    } = useTotalsContext();

    const price = useMemo(() => {
        if (!item.options) {
            return 0;
        }
        const objects = prevOptions.objects ? [...prevOptions.objects] : [];
        const options = { ...prevOptions, objects };
        objects.push([item, 1]);

        const total = calculateTotalPrice(index, options).total;
        return total - prevTotal;
    }, [prevOptions, item, index, prevTotal]);

    return <Price value={price} />;
};

const StealthtechItemInput = ({ code, selected }) => {
    const callback = useStateInputCallback();

    return useMemo(
        () => (
            <div className={styles.selection}>
                <input type="radio" name={SET_STEALTHTECH} onClick={callback} value={code} checked={selected} />
                <span className={styles.icon} />
            </div>
        ),
        [selected, callback, code],
    );
};

const ExperienceStealthtechBlock = () => {
    const {
        messages: { stealthtechExperienceTitle, stealthtechExperienceText },
    } = useConfiguratorContext();

    return (
        <div className={styles.stExperience}>
            <h3>{stealthtechExperienceTitle}</h3>
            <div>{stealthtechExperienceText}</div>
            <div>
                <a target={'_blank'} href={getCommerceUrl('/showroomlocator')} rel="noreferrer">{t`Find a Showroom`}</a>
            </div>
        </div>
    );
};

const ShowMoreInfoButton = ({ code, title, data }) => {
    const { setModal } = useModalContext();
    const showMoreInfo = useCallback(
        (event) => {
            event.preventDefault();
            setModal({
                type: 'info',
                title,
                data,
            });
        },
        [setModal, title, data],
    );

    return useMemo(() => {
        if (code === NO_STEALTHTECH_CODE) {
            return (
                <div className={styles.link}>{t`You can add StealthTech to your Sactional anytime in the future`}</div>
            );
        }

        return (
            <button className={`${styles.link} ${styles.infoLink}`} data-item-code={code} onClick={showMoreInfo}>
                {t`What’s included?`}
            </button>
        );
    }, [showMoreInfo, code]);
};
