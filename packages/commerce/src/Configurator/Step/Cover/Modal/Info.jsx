/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { useMemo, useCallback } from 'preact/hooks';
import { Fragment } from 'preact';
import { BsXLg } from 'react-icons/bs';
import { useConfiguratorContext } from '../../../Context/Configurator';
import { useStateButtonCallback } from '../../../hooks/useStateButtonCallback';
import { SET_FABRIC } from '../constants';
import { Price } from '../../../View/Price';
import { calculateTotalPrice } from '../../../calculator';
import { useTotalsContext } from '../../../Context/Totals';
import { Modal, useModalContext } from '../../../View/Modal';
import { useStateContext } from '../../../Context/State';
import { isCoverAvailable } from '../hooks/isCoverAvailable';
import styles from './style.module.css';
import RichText from '~/View/RichText';

export const Info = () => {
    const {
        modal: { fabricId = null, fabricLeadTimeTab = null, previousModalType = null, modalClass = null },
    } = useModalContext();

    const { fabricOptions } = useConfiguratorContext();

    return useMemo(() => {
        const fabric = fabricOptions?.[fabricLeadTimeTab]?.[fabricId];

        if (!fabric) {
            return;
        }

        return (
            <Modal title={fabric.name} closeTitle={t`Back to Cover`} modalClass={modalClass}>
                <InfoBackButton previousModalType={previousModalType} fabricId={fabricId} />
                <InfoContent fabric={fabric} fabricLeadTime={fabricLeadTimeTab} />
            </Modal>
        );
    }, [fabricOptions, fabricLeadTimeTab, fabricId, previousModalType, modalClass]);
};

const InfoContent = ({ fabric: { id, name, image, color, composition, fabricLeadTime, features, featuresText } }) => {
    return (
        <Fragment>
            <div className={styles.itemDetails}>
                <div className={styles.descriptionWrapper}>
                    <img className="item-image" src={image} alt={name} />
                    <div className={styles.list}>
                        <div>
                            <h4>Fabric Composition</h4>
                            <p>{composition}</p>
                        </div>
                        <div>
                            <h4>Color</h4>
                            <p>{color}</p>
                        </div>
                        <InfoPrice fabricLeadTime={fabricLeadTime} fabricId={id} />
                    </div>
                </div>
                {features.length ? (
                    <FabricFeatureDetails features={features} featuresText={featuresText} fabricImage={image} />
                ) : null}
            </div>
            <div className={styles.actionsWrapper}>
                <AddToSamplesButton fabricId={id} />
                <AddThisFabricButton fabricId={id} />
            </div>
        </Fragment>
    );
};

const InfoPrice = ({ fabricLeadTime, fabricId }) => {
    const index = useConfiguratorContext();
    const {
        modules: {
            cover: { options, total },
        },
    } = useTotalsContext();

    return useMemo(() => {
        const newOptions = { ...options, fabricLeadTime, fabricId };
        const coverPrice = calculateTotalPrice(index, newOptions).total - total;

        return (
            <div>
                <h4>{`${t`Pricing`}`}</h4>
                <p>
                    {coverPrice >= 0 ? `+ ` : `- `}
                    <Price value={Math.abs(coverPrice)} />
                </p>
            </div>
        );
    }, [index, fabricLeadTime, fabricId, options, total]);
};

const AddToSamplesButton = ({ fabricId }) => {
    const { setModal } = useModalContext();
    const buttonCallback = useCallback(
        (event) => {
            event.preventDefault();
            setModal({
                type: 'sample',
                fabricId,
            });

            return true;
        },
        [fabricId, setModal],
    );
    const { state } = useStateContext();
    const index = useConfiguratorContext();
    const newState = {
        ...state,
        fabricId,
        fabricLeadTime: state.fabricLeadTimeTab,
    };
    const disabledFabric = !isCoverAvailable(index, newState);

    return (
        <button
            className={styles.secondary}
            onClick={buttonCallback}
            disabled={disabledFabric}
        >{t`Add to My Fabric Swatches`}</button>
    );
};

const AddThisFabricButton = ({ fabricId }) => {
    const { setModal } = useModalContext();
    const setFabricCallback = useStateButtonCallback();
    const setFabricCallbackAndClose = useCallback(
        (event) => {
            setFabricCallback(event);
            setModal(null);
        },
        [setFabricCallback, setModal],
    );
    const { state } = useStateContext();
    const index = useConfiguratorContext();
    const newState = {
        ...state,
        fabricId,
        fabricLeadTime: state.fabricLeadTimeTab,
    };
    const disabledFabric = !isCoverAvailable(index, newState);

    return (
        <button
            className={styles.primary}
            name={SET_FABRIC}
            value={fabricId}
            onClick={setFabricCallbackAndClose}
            disabled={disabledFabric}
        >{`${t`Apply this Fabric`}`}</button>
    );
};

const InfoBackButton = ({ previousModalType, fabricId }) => {
    const { setModal } = useModalContext();
    const closeCallback = useCallback(
        (event) => {
            event.preventDefault();
            if (previousModalType) {
                setModal({
                    type: previousModalType,
                    fabricId,
                    fetchItems: true,
                });
                return true;
            }

            setModal(null);
        },
        [setModal, previousModalType, fabricId],
    );

    return (
        <button className={styles.mobileClose} onClick={closeCallback}>
            <span>{`${t`Back to ${previousModalType}`}`}</span>
            <BsXLg />
        </button>
    );
};

const FabricFeatureDetails = ({ features, featuresText = null, fabricImage }) => {
    return (
        <div className="fabric-features__wrapper">
            <h4 className={styles.featuresTitle}>{'Features'}</h4>
            <div className={styles.featuresItems}>
                {features.map(({ name, image = null }) => (
                    <div className={styles.featuresItem} key={name}>
                        <img src={image.length ? image : fabricImage} alt={name} />
                        <span>{name}</span>
                    </div>
                ))}
            </div>
            {featuresText ?? <RichText className="fabric-features__text" content={featuresText} />}
        </div>
    );
};
