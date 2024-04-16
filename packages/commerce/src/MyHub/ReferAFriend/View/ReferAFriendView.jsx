/**
 * @package     BlueAcorn/MyHub
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { useEffect, useRef } from 'preact/hooks';
import styles from './style.module.css';
import { extoleCreateCustomerZone } from '~/Api/Extole';

export default function ReferAFriendView({ customer }) {
    return (
        <div className={styles.referalBlockContent}>
            <ReferAFriendBlock customer={customer} />
        </div>
    );
}

function ReferAFriendBlock({ customer }) {
    const ref = useRef();

    useEffect(() => {
        extoleCreateCustomerZone(customer, ref.current);
    }, [customer]);

    return <div ref={ref} />;
}
