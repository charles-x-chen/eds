/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
/* eslint camelcase: off */

import { t } from 'ttag';
import { useEffect } from 'preact/hooks';
import { BsCheck, BsX } from 'react-icons/bs';
import { Modal, useModalContext } from '../../../View/Modal';
import SWATCH_REMOVE from '../../../gql/swatchRemove.gql';
import SAMPLE_PLACEHOLDER from '../../../icons/sample-placeholder.jpg';
import { OrderSamplesButton, SampleDataLoading, SampleListItem } from './Sample';
import styles from './style.module.css';
import RichText from '~/View/RichText';
import useMutation from '~/hooks/useMutation';

export const RemoveSample = () => {
    return (
        <Modal title={t`Swatches`} closeTitle={t`Back to Cover`}>
            <SampleRemoveContent />
        </Modal>
    );
};

const defaultItems = [];

const SampleRemoveContent = () => {
    const {
        modal: {
            item: { itemId },
        },
    } = useModalContext();
    const [{ data = null, error = null, loading = false }, callback] = useMutation(SWATCH_REMOVE);
    useEffect(() => {
        callback({ id: itemId });
    }, [itemId, callback]);

    if (data) {
        const {
            swatchRemove: { message, success, items = defaultItems },
        } = data;
        const errorMessage = message ?? data?.error;

        const itemsData = () => {
            const data = Object.values(items);
            for (let i = 0; i < 5 - Object.values(items).length; i++) {
                data.push({
                    image: SAMPLE_PLACEHOLDER,
                    name: 'placeholder',
                    item_id: i,
                    showLabel: false,
                });
            }
            return data;
        };

        return (
            <div className={`${styles.samplesDetailsWrapper}`}>
                <div className={`${styles.itemDetails} ${styles.samplesDetails}`}>
                    <div className={`${styles.samplesDetailsTitle}`}>
                        <span className={`${styles.sampleTitle}`}>{t`Free Fabric Swatches`}</span>
                        <span className={`${styles.sampleDesc}`}>
                            {t`Request up to 5 swatches at a time - all for free! Swatches are sent U.S. mail and will arrive in 2 - 3 weeks.`}
                        </span>
                    </div>
                    <div className={styles.messages}>
                        <div className={success ? `${styles.success} ${message}` : `${styles.error} ${message}`}>
                            {success ? <BsCheck /> : <BsX />}
                            <RichText content={success ? message : errorMessage} />
                        </div>
                    </div>
                    <div className={`${styles.descriptionWrapper} ${styles.samplesDescriptionWrapper}`}>
                        {itemsData().map((item) => {
                            return <SampleListItem key={item.item_id} item={item} type={'sample'} />;
                        })}
                    </div>
                    <div className={`${styles.actionsWrapper} ${styles.samplesActionsWrapper}`}>
                        {Object.values(items).length ? <OrderSamplesButton items={items} /> : null}
                    </div>
                </div>
            </div>
        );
    }
    return <SampleDataLoading loading={loading} error={error} />;
};
