/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { useConfiguratorContext } from '../../Context/Configurator';
import { useTotalsContext } from '../../Context/Totals';
import { useStateContext } from '../../Context/State';
import { isCoverStealthtechEligible } from './isCoverStealthtechEligible';
import styles from './style.module.css';
import ICON_FABRIC from './icons/fabric.svg';
import ICON_SEAT_STANDARD from './icons/seat-standard.svg';
import ICON_SIDE_ROLLARM from './icons/side-rollarm.svg';
import ICON_SIDE_ANGLED from './icons/side-angled.jpg';

export const StealthTechNotAvaliableComponent = () => {
    const isRollArm = useIsRollArm();
    const isLeather = useIsLeather();
    const isDifferentArm = useIsDifferentArm();
    const isStandardSeatIneligible = useIsStandardSeatIneligible();
    const index = useConfiguratorContext();

    if (!isRollArm && !isLeather && !isStandardSeatIneligible && !isDifferentArm) {
        return null;
    }

    return (
        <div className={styles.notAvailable}>
            <div className={styles.title}>{t`StealthTech not available with current configuration`}</div>
            <div className={styles.boxes}>
                {isRollArm ? (
                    <div className={styles.notAvailableBox}>
                        <div className={styles.title}>
                            <img src={ICON_SIDE_ROLLARM} alt={t`Standard Sides`} />
                            {t`Standard Sides`}
                        </div>
                        <div className={styles.text}>{index.messages.stealthtechEligibilityStandardSidesMsg}</div>
                    </div>
                ) : null}
                {isStandardSeatIneligible ? (
                    <div className={styles.notAvailableBox}>
                        <div className={styles.title}>
                            <img src={ICON_SEAT_STANDARD} alt={t`Standard Sides`} />
                            {t`Standard Seat`}
                        </div>
                        <div className={styles.text}>{index.messages.stealthtechEligibilityStandardSeatsMsg}</div>
                    </div>
                ) : null}
                {isLeather ? (
                    <div className={styles.notAvailableBox}>
                        <div className={styles.title}>
                            <img src={ICON_FABRIC} alt={t`Leather`} />
                            {t`Leather`}
                        </div>
                        <div className={styles.text}>{index.messages.stealthtechEligibilityLeatherMsg}</div>
                    </div>
                ) : null}
                {isDifferentArm ? (
                    <div className={styles.notAvailableBox}>
                        <div className={styles.title}>
                            <img src={ICON_SIDE_ANGLED} alt={t`Different Arm Styles`} />
                            {t`Different Arm Styles`}
                        </div>
                        <div className={styles.text}>{index.messages.stealthtechEligibilityDifferentArmStylesMsg}</div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

const useIsRollArm = () => {
    const {
        last: {
            options: { pieces },
        },
    } = useTotalsContext();
    return pieces.rollArm_side > 0;
};

const useIsLeather = () => {
    const {
        last: { options },
    } = useTotalsContext();
    const index = useConfiguratorContext();
    return !isCoverStealthtechEligible(index, options);
};

const useIsStandardSeatIneligible = () => {
    const {
        last: {
            options: { pieces },
        },
    } = useTotalsContext();

    const {
        state: { stealthTechEligible },
    } = useStateContext();

    return !pieces.standard_seat && !stealthTechEligible.length;
};

const useIsDifferentArm = () => {
    const {
        state: { stealthTechEligible, sideStyles = null },
    } = useStateContext();

    const hasSameArms = !sideStyles?.ArmStyles || sideStyles.ArmStyles.every((val, i, arms) => val === arms[0]);

    return !hasSameArms && !stealthTechEligible.length;
};
