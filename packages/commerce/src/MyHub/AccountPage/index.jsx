/**
 * @package     BlueAcorn/MyHub
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { cloneElement } from 'preact';
import { t } from 'ttag';
import styles from './style.module.css';
import AccountSidebar from './Sidebar';
import useQuery from '~/hooks/useQuery';
import Loading from '~/View/Loading';
import ErrorBox from '~/View/ErrorBox';
import mobileSignal from '~/Api/Mobile';

export default function AccountPage({ type, queryArgs, title, dynamic, children }) {
    return (
        <div className={styles.container}>
            {mobileSignal.value || type !== 'dashboard' ? (
                <div className={styles.sidebar} role="complementary">
                    <ErrorBox silent={true}>
                        <AccountSidebar type={type} />
                    </ErrorBox>
                </div>
            ) : null}
            <div className={styles.mainContent}>
                {title ? <h1 className={styles.title}>{title}</h1> : null}
                <ErrorBox>
                    {queryArgs ? (
                        <AccountView queryArgs={queryArgs} dynamic={dynamic}>
                            {children}
                        </AccountView>
                    ) : (
                        children
                    )}
                </ErrorBox>
            </div>
        </div>
    );
}

AccountPage.defaultProps = {
    type: null,
    queryArgs: null,
    title: null,
    dynamic: false,
};

const defaultData = {
    customer: {
        email: null,
        firstname: null,
        lastname: null,
        refer: null,
        orders: {
            items: [],
        },
    },
};

function AccountView({ queryArgs, dynamic, children }) {
    const [{ data, fetching, stale, error }] = useQuery(queryArgs);
    if (fetching) {
        if (dynamic) {
            return children ? cloneElement(children, { data: data || defaultData, fetching: fetching || stale }) : null;
        }
        return <Loading />;
    }
    if (data?.customer) {
        return children ? cloneElement(children, { data, fetching: fetching || stale }) : null;
    }
    return error?.message || t`An error occured`;
}
