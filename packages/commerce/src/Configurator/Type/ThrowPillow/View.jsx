/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { useEffect, useState } from 'preact/hooks';
import { Player, PlayerLoader } from '../../View/Player';
import { useConfiguratorContext } from '../../Context/Configurator';
import { Dropdown } from '../../View/Dropdown';
import { Dimensions } from '../../View/Dimensions';
import { ShippingInfo } from '../../View/ShippingInfo';
import { SidebarHeader } from '../../View/SidebarHeader';
import { PieceDescription } from '../../View/PieceDescription';
import { ThrowKitSidebar } from './ThrowKitSidebar';
import styles from './style.module.css';
import RichText from '~/View/RichText';

export const View = () => {
    const {
        throwpillowMarketingBlock,
        config: { benefitsBlock },
    } = useConfiguratorContext();
    const [benefitsContent, setBenefitsContent] = useState('');

    useEffect(() => {
        const fetchBenefitsContent = async () => {
            /* eslint no-console: off */
            try {
                const response = await fetch(benefitsBlock);
                if (response.ok) {
                    const content = await response.text();
                    const parser = new DOMParser();
                    const parsedContent = parser.parseFromString(content, 'text/html');
                    const wrapper = parsedContent.querySelector('.columns > div');
                    wrapper.classList.add(styles.benefitsBlockWrapper);
                    setBenefitsContent(parsedContent.documentElement.outerHTML);
                } else {
                    console.error('Failed to fetch benefits content:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching benefits content:', error);
            }
        };

        fetchBenefitsContent();
    }, [benefitsBlock]);

    return (
        <div>
            <div className={styles.stepWrapper}>
                <PlayerLoader />
                <SidebarHeader helperClass={styles.sidebarHeader} />
                <div className={styles.playerWrapper}>
                    <Player show="desktop" />
                    <div className={styles.stepAccordionWrapper}>
                        <PieceDescription />
                        <Dropdown title={t`Benefits`} content={benefitsContent} helperClass={styles.benefitsBlock} />
                        <Dimensions helperClass={styles.dimensions} />
                        <ShippingInfo helperClass={styles.shipping} />
                    </div>
                </div>
                <ThrowKitSidebar />
            </div>
            <RichText className="throwpillow-marketing__wrapper" content={throwpillowMarketingBlock} />
        </div>
    );
};
