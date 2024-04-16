/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { useEffect, useState } from 'preact/hooks';
import { Player, PlayerLoader } from '../../View/Player';
import { Dropdown } from '../../View/Dropdown';
import { Dimensions } from '../../View/Dimensions';
import { ShippingInfo } from '../../View/ShippingInfo';
import { SidebarHeader } from '../../View/SidebarHeader';
import { useConfiguratorContext } from '../../Context/Configurator';
import { SquattomanSidebar } from './SquattomanSidebar';
import styles from './style.module.css';
import RichText from '~/View/RichText';

export const View = () => {
    const {
        squattomanMarketingBlock,
        config: { descriptionBlock, benefitsBlock },
    } = useConfiguratorContext();
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
                        <Dimensions helperClass={styles.dimensions} />
                        <ShippingInfo helperClass={styles.shipping} />
                    </div>
                </div>
                <SquattomanSidebar />
            </div>
            <RichText className="squattoman-marketing__wrapper" content={squattomanMarketingBlock} />
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
