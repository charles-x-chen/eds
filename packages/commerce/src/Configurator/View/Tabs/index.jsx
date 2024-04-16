/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { toChildArray } from 'preact';
import { useMemo, useState, useCallback } from 'preact/hooks';
import { Loader } from '../Loader';
import styles from './style.module.css';

export const SimpleTabs = ({ children, helperClass }) => {
    const [tabIndex, setTabIndex] = useState('0');

    const tabClickCallback = useCallback((event) => {
        event.preventDefault();
        const { value } = event.target;
        setTabIndex(value);
    }, []);

    return (
        <Tabs activeTab={tabIndex} tabClickCallback={tabClickCallback} helperClass={helperClass}>
            {children}
        </Tabs>
    );
};

export const Tabs = ({ children, activeTab, tabClickCallback, buttonName, helperClass }) => {
    const tabs = useMemo(() => {
        const childArray = toChildArray(children);
        const tabs = {};
        for (let index = 0; index < childArray.length; index++) {
            const tab = childArray[index];
            const key = tab.props.code || index;
            tabs[key] = tab;
        }
        return tabs;
    }, [children]);

    return useMemo(() => {
        const customTabClass = activeTab === 'custom' ? styles.customTab : styles.prebuiltTab;
        return (
            <div className={`${styles.contentBar} ${helperClass}`}>
                <div className={styles.sidebarTabs}>
                    {Object.entries(tabs).map(([key, tab]) => (
                        <button
                            data-isAtive={activeTab === key}
                            className={`${styles.tab} ${activeTab === key ? styles.tabActive : ''}`}
                            onClick={tabClickCallback}
                            key={key}
                            value={key}
                            name={buttonName}
                        >
                            {tab.props.title}
                        </button>
                    ))}
                </div>
                <div className={`${styles.tabContent} tab-${activeTab} ${customTabClass}`}>
                    <Loader key={activeTab}>{tabs[activeTab]}</Loader>
                </div>
            </div>
        );
    }, [activeTab, tabClickCallback, tabs, buttonName, helperClass]);
};
