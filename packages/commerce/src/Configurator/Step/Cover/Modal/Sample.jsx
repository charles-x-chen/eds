/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
/* eslint camelcase: off */

import { t } from 'ttag';
import { useCallback, useEffect } from 'preact/hooks';
import { BsCheck, BsX } from 'react-icons/bs';
import { useStateContext } from '../../../Context/State';
import { Modal, useModalContext } from '../../../View/Modal';
import SWATCH_ADD from '../../../gql/swatchAdd.gql';
import SWATCH_LIST from '../../../gql/swatchList.gql';
import SAMPLE_PLACEHOLDER from '../../../icons/sample-placeholder.jpg';
import styles from './style.module.css';
import RichText from '~/View/RichText';
import useQuery from '~/hooks/useQuery';
import useMutation from '~/hooks/useMutation';

export const Sample = () => {
    return (
        <Modal title={t`Fabric Swatches`} closeTitle={t`Back to Cover`} modalClass={styles.samplesModal}>
            <SampleContent />
        </Modal>
    );
};

export const SampleContent = () => {
    const {
        modal: { fabricId, type, fetchItems = false },
    } = useModalContext();

    const [{ fetching: loading1, data: data1, error: error1 }, buttonCallback1] = useQuery({
        query: SWATCH_LIST,
        pause: true,
    });
    const [{ fetching: loading2, data: data2, error: error2 }, buttonCallback2] = useMutation(SWATCH_ADD);
    const sampleData = fetchItems ? data1 : data2;
    const loading = fetchItems ? loading2 : loading1;
    const error = fetchItems ? error2 : error1;

    useEffect(() => {
        if (!fetchItems) {
            buttonCallback2({ fabricId: parseInt(fabricId, 10) });
        } else {
            buttonCallback1();
        }
    }, [fabricId, fetchItems, buttonCallback1, buttonCallback2]);

    return sampleData ? (
        <SampleMoreInfo data={fetchItems ? sampleData.swatchList : sampleData.swatchAdd} type={type} />
    ) : (
        <SampleDataLoading loading={loading} error={error} />
    );
};

export const OrderSamplesButton = ({ items }) => {
    const { setModal } = useModalContext();
    const callback = useCallback(
        (event) => {
            event.preventDefault();
            setModal({
                type: 'orderSample',
                items,
            });

            return true;
        },
        [items, setModal],
    );

    return (
        <button
            className={`${styles.primary} ${styles.samplePrimaryCta}`}
            onClick={callback}
        >{t`Order Swatches`}</button>
    );
};

export const SampleListItem = ({ item, type }) => {
    const { image, name, fabricId, showLabel = true } = item;
    const { setModal } = useModalContext();
    const {
        state: { fabricLeadTimeTab },
    } = useStateContext();

    const showMoreInfo = useCallback(
        (event) => {
            event.preventDefault();
            setModal({
                type: 'info',
                fabricId,
                fabricLeadTimeTab,
                previousModalType: type,
                modalClass: styles.samplesModal,
            });
        },
        [setModal, fabricId, fabricLeadTimeTab, type],
    );
    return (
        <div className={`${styles.listItem} ${styles.sampleListItem}`}>
            <div className={`${styles.sampleLabel} ${name}`}>
                <img src={image} alt={name} />
                {showLabel ? (
                    <span>
                        {name}
                        <button className={styles.samplesSidebarAction} type="button" onClick={showMoreInfo}>
                            <span>${`View more information about ${name}`}</span>
                        </button>
                    </span>
                ) : null}
            </div>
            {showLabel ? <RemoveSampleItemButton item={item} type={type} /> : null}
        </div>
    );
};

const RemoveSampleItemButton = ({ item, type }) => {
    const { setModal } = useModalContext();
    const removeSample = useCallback(
        (event) => {
            event.preventDefault();
            setModal({
                type: 'removeSample',
                item,
                previousModalType: type,
                modalClass: styles.samplesModal,
            });

            return true;
        },
        [item, setModal, type],
    );

    return (
        <button className={styles.sampleSecondaryAction} onClick={removeSample}>
            {t`Remove`}
        </button>
    );
};

export const SampleDataLoading = ({ loading, error }) => {
    return (
        <div className="more-info__details-wrapper">
            <div className={loading ? 'cmp-loader' : 'cmp-loader hide'} />
            <div className={error ? 'message-wrapper active' : 'message-wrapper'}>
                <div className="page messages">
                    <div className="message-error error message">{error}</div>
                </div>
            </div>
        </div>
    );
};

const SampleMessages = ({ message, success }) => {
    return (
        <div className={success ? `${styles.success} ${message}` : `${styles.error} ${message}`}>
            {success ? <BsCheck /> : <BsX />}
            <RichText content={message} />
        </div>
    );
};

const SampleMoreInfo = ({ data, type }) => {
    const { message, success, items } = data;
    const itemsData = () => {
        const data = Object.values(items);
        const itemLength = Object.values(items).length;
        for (let i = 0; i < 5 - itemLength; i++) {
            data.push({
                image: SAMPLE_PLACEHOLDER,
                name: 'placeholder',
                item_id: i,
                showLabel: false,
            });
        }
        return !success && itemLength === 0 ? [] : data;
    };

    return (
        <div className={`${styles.samplesDetailsWrapper}`}>
            <div className={`${styles.itemDetails} ${styles.samplesDetails}`}>
                <div className={`${styles.samplesDetailsTitle}`}>
                    <span className={`${styles.sampleTitle}`}>{t`Free Fabric Swatches`}</span>
                    <span
                        className={`${styles.sampleDesc}`}
                    >{t`Request up to 5 swatches at a time - all for free! Swatches are sent U.S. mail and will arrive in 2 - 3 weeks.`}</span>
                </div>
                <div className={styles.messages}>
                    {message ? <SampleMessages success={success} message={message} /> : ''}
                </div>
                <div className={`${styles.descriptionWrapper} ${styles.samplesDescriptionWrapper}`}>
                    {itemsData().map((item) => {
                        return <SampleListItem key={item.item_id} item={item} type={type} />;
                    })}
                </div>
            </div>
            <div className={`${styles.actionsWrapper} ${styles.samplesActionsWrapper}`}>
                {Object.values(items).length ? <OrderSamplesButton items={items} /> : null}
            </div>
        </div>
    );
};
