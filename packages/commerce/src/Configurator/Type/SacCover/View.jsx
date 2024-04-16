/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { useEffect, useRef, useState } from 'preact/hooks';
import { Player, PlayerLoader } from '../../View/Player';
import { Dropdown } from '../../View/Dropdown';
import { ShippingInfo } from '../../View/ShippingInfo';
import { useConfiguratorContext } from '../../Context/Configurator';
import { PieceDescription } from '../../View/PieceDescription';
import { SidebarHeader } from '../../View/SidebarHeader';
import { useTogglePlayerHeaderEffect } from '../../View/Player/TogglePlayerHeader';
import { SacCoverSidebar } from './SacCoverSidebar';
import styles from './style.module.css';
import RichText from '~/View/RichText';

export const View = () => {
    const {
        saccoverMarketingBlock,
        config: { benefitsBlock },
    } = useConfiguratorContext();
    const [benefitsContent, setBenefitsContent] = useState('');
    const sacCoverMarketingWrapper = useRef(null);

    useTogglePlayerHeaderEffect(sacCoverMarketingWrapper);

    useEffect(() => {
        const fetchBenefitsContent = async () => {
            /* eslint no-console: off */
            try {
                const response = await fetch(benefitsBlock);
                if (response.ok) {
                    const content = await response.text();
                    const parser = new DOMParser();
                    const parsedContent = parser.parseFromString(content, 'text/html');
                    const wrapper = parsedContent.querySelector('.columns');
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
                        <ShippingInfo helperClass={styles.shipping} />
                    </div>
                </div>
                <SacCoverSidebar />
            </div>
            <RichText
                ref={sacCoverMarketingWrapper}
                className="squattoman-marketing__wrapper"
                content={saccoverMarketingBlock}
            />
        </div>
    );
};
