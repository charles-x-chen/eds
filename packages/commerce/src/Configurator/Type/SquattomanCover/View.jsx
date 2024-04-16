/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { useEffect, useRef, useState } from 'preact/hooks';
import { Player, PlayerLoader } from '../../View/Player';
import { Dropdown } from '../../View/Dropdown';
import { useConfiguratorContext } from '../../Context/Configurator';
import { SidebarHeader } from '../../View/SidebarHeader';
import { ShippingInfo } from '../../View/ShippingInfo';
import { useTogglePlayerHeaderEffect } from '../../View/Player/TogglePlayerHeader';
import { SquattomanCoverSidebar } from './SquattomanCoverSidebar';
import styles from './style.module.css';
import RichText from '~/View/RichText';

export const View = () => {
    const {
        squattomanCoverMarketingBlock,
        config: { descriptionBlock, benefitsBlock },
    } = useConfiguratorContext();

    const squattomanCoverMarketingWrapper = useRef(null);
    const [benefitsContent, setBenefitsContent] = useState('');
    const [description, setDescription] = useState('');
    useEffect(() => {
        const fetchAndSetContent = async (url, setStateFunction, classToAdd) => {
            const content = await fetchAndModifyContent(url, classToAdd);
            if (content) {
                setStateFunction(content);
            }
        };

        fetchAndSetContent(benefitsBlock, setBenefitsContent, styles.benefitsBlockWrapper);
        fetchAndSetContent(descriptionBlock, setDescription, styles.descriptionBlockWrapper);
    }, [benefitsBlock, descriptionBlock]);
    useTogglePlayerHeaderEffect(squattomanCoverMarketingWrapper);

    return (
        <div>
            <div className={styles.stepWrapper}>
                <PlayerLoader />
                <SidebarHeader helperClass={styles.sidebarHeader} />
                <div className={styles.playerWrapper}>
                    <Player show="desktop" />
                    <div className={styles.stepAccordionWrapper}>
                        <Dropdown title={t`Description`} content={description} />
                        <Dropdown title={t`Benefits`} content={benefitsContent} helperClass={styles.benefitsBlock} />
                        <ShippingInfo helperClass={styles.shipping} />
                    </div>
                </div>
                <SquattomanCoverSidebar />
            </div>
            <RichText
                ref={squattomanCoverMarketingWrapper}
                className="squattoman-marketing__wrapper"
                content={squattomanCoverMarketingBlock}
            />
        </div>
    );
};

const fetchAndModifyContent = async (url, classToAdd) => {
    /* eslint no-console: off */
    try {
        const response = await fetch(url);
        if (response.ok) {
            const content = await response.text();
            const parser = new DOMParser();
            const parsedContent = parser.parseFromString(content, 'text/html');
            const wrapper = parsedContent.querySelector('.columns') ?? parsedContent.querySelector('h2').parentNode;
            wrapper.classList.add(classToAdd);
            return parsedContent.documentElement.outerHTML;
        }
        console.error('Failed to fetch content:', response.statusText);
    } catch (error) {
        console.error('Error fetching content:', error);
    }
};
