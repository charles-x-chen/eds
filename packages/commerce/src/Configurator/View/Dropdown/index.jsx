/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */

import { useRef, useState, useCallback } from 'preact/hooks';
import { t } from 'ttag';
import { BsChevronDown } from 'react-icons/bs';
import styles from './style.module.css';
import RichText from '~/View/RichText';

const defaultStyle = { maxHeight: `0px` };
export const Dropdown = ({ title, content, helperClass = null }) => {
    const [setActive, setActiveState] = useState('');
    const [style, setStyle] = useState(defaultStyle);
    const mainContent = useRef(null);

    const toggleAccordion = useCallback(() => {
        setActiveState(setActive === '' ? styles.active : '');
        const height = setActive === 'active' ? '0px' : `100%`;
        setStyle({ maxHeight: height });
    }, [setActive]);

    return (
        <div className={`${styles.wrapper} ${helperClass}`}>
            <button className={`${styles.trigger} ${setActive}`} onClick={toggleAccordion}>
                <span>{title}</span>
                <BsChevronDown />
            </button>
            <div ref={mainContent} style={style} className={styles.content}>
                <RichText className={styles.text} content={content} />
            </div>
        </div>
    );
};

export const DropdownComponent = ({ title, content, helperClass = null }) => {
    const [setActive, setActiveState] = useState('');
    const [style, setStyle] = useState(defaultStyle);
    const mainContent = useRef(null);

    const toggleAccordion = useCallback(() => {
        setActiveState(setActive === '' ? styles.active : '');
        const height = setActive === 'active' ? '0px' : `100%`;
        setStyle({ maxHeight: height });
    }, [setActive]);

    return (
        <div className={`${styles.wrapper} ${helperClass}`}>
            <button className={`${styles.trigger} ${setActive}`} onClick={toggleAccordion}>
                <span className="dropdown__title">{title}</span>
                <BsChevronDown />
            </button>
            <div ref={mainContent} style={style} className={styles.content}>
                <div className={styles.text}>
                    <div className={styles.bannerWrapper}>
                        <div className={styles.bannerShipping}>
                            <span className={styles.bannerTitle} data-item={`title`}>{t`${content.title}`}</span>
                            <span className={styles.bannerDesc}>{t`${content.desc}`}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
