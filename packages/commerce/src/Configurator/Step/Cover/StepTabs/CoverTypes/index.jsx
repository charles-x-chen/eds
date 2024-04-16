/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { useMemo, useCallback } from 'preact/hooks';
import { useStateContext } from '../../../../Context/State';
import { useStateInputCallback } from '../../../../hooks/useStateInputCallback';
import { SET_FABRIC } from '../../constants';
import { useModalContext } from '../../../../View/Modal';
import { isCoverAvailable } from '../../hooks/isCoverAvailable';
import { useConfiguratorContext } from '../../../../Context/Configurator';
import styles from './style.module.css';

export const CoverTypes = ({ groups }) => {
    return (
        <div className={styles.coverTypes}>
            {groups.map((group) => (
                <FabricTypeFiltered group={group} key={group.name} />
            ))}
        </div>
    );
};

const FabricTypeFiltered = ({ group }) => {
    const {
        state: { fabricFilter },
    } = useStateContext();

    const items = useMemo(() => {
        if (fabricFilter.length > 0) {
            const filters = Object.entries(
                fabricFilter.reduce((acc, filterItem) => {
                    const [filterCode, code] = filterItem.split(':');
                    if (!acc[filterCode]) {
                        acc[filterCode] = {};
                    }
                    acc[filterCode][code] = 1;
                    return acc;
                }, {}),
            ).map(([code, values]) => ({
                code,
                values: Object.keys(values),
            }));

            return group.items.filter((fabric) => {
                return filters.every(({ code, values }) => {
                    if (code === 'features') {
                        return values.every((value) => fabric.features.find((feature) => feature.name === value));
                    }
                    return values.includes(fabric[code]);
                });
            });
        }

        return group.items;
    }, [fabricFilter, group]);

    return items.length > 0 ? <FabricType group={group} items={items} /> : null;
};

const FabricType = ({ group, items }) => {
    return (
        <div className={styles.coverTypeWrapper}>
            <div className={styles.coverTypeTitleWrapper}>
                <div className={styles.coverTypeTitle}>{`${group.name} (${items.length})`}</div>
            </div>
            <div className={styles.covers}>
                {items.map((fabric) => (
                    <FabricOption fabric={fabric} key={fabric.id} />
                ))}
            </div>
        </div>
    );
};

const FabricOption = ({ fabric }) => {
    const {
        state: { pieces, fabricLeadTimeTab },
    } = useStateContext();
    const index = useConfiguratorContext();
    const disabled = useMemo(() => {
        const options = {
            pieces,
            fabricId: fabric.id,
            fabricLeadTime: fabricLeadTimeTab,
        };
        return !isCoverAvailable(index, options);
    }, [pieces, fabricLeadTimeTab, index, fabric]);

    return <FabricOptionVisible fabric={fabric} disabled={disabled} />;
};

const FabricOptionVisible = ({ fabric: { image, name, id }, disabled }) => {
    return (
        image && (
            <label className={`${styles.cover} ${disabled ? styles.disabled : ''}`}>
                <FabricOptionInput fabricId={id} disabled={disabled} />
                <img src={image} alt={name} title={name} width="50" height="50" />
                <span className={styles.coverName}>{name}</span>
                <ShowMoreInfoButton fabricId={id} fabricName={name} />
            </label>
        )
    );
};

const FabricOptionInput = ({ fabricId, disabled }) => {
    const {
        state: { fabricId: stateFabricId },
    } = useStateContext();

    const selectCover = useStateInputCallback();

    return useMemo(
        () => (
            <input
                type="radio"
                name={SET_FABRIC}
                onClick={selectCover}
                className={styles.coverInput}
                checked={parseInt(stateFabricId, 10) === fabricId}
                value={fabricId}
                disabled={disabled}
            />
        ),
        [selectCover, stateFabricId, fabricId, disabled],
    );
};

const ShowMoreInfoButton = ({ fabricId, fabricName }) => {
    const { setModal } = useModalContext();
    const {
        state: { fabricLeadTimeTab },
    } = useStateContext();

    const showMoreInfo = useCallback(
        (event) => {
            event.preventDefault();
            setModal({
                modalClass: styles.coverInfoModal,
                type: 'info',
                fabricId,
                fabricLeadTimeTab,
            });
        },
        [setModal, fabricId, fabricLeadTimeTab],
    );

    return <ShowMoreInfoButtonVisible showMoreInfo={showMoreInfo} fabricName={fabricName} />;
};

const ShowMoreInfoButtonVisible = ({ showMoreInfo, fabricName }) => {
    return (
        <button className={styles.moreInfo} type="button" onClick={showMoreInfo}>
            <span>{t`View more information about ${fabricName}`}</span>
            <span>{`${t`View more information about`} ${fabricName}`}</span>
        </button>
    );
};
