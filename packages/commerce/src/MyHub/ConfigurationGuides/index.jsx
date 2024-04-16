/**
 * @package     BlueAcorn/MyHub
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */

import { t } from 'ttag';
import { useMemo } from 'preact/hooks';
import styles from './style.module.css';
import Gallery from '~/View/Gallery';
import { getCommerceUrl } from '~/Api/Url';

export default function ConfigurationGuides({ configurators, responsive }) {
    const guides = configurators[0];
    return (
        guides.length > 0 && (
            <div className={styles.wrapper}>
                <h3 className={styles.title}>
                    {t`Configuration Guides for Your Setup`}
                    <a href={getCommerceUrl('sactionals-configuration-guides')} data-action={'link'}>{t`View All`}</a>
                </h3>
                {guides.map((guide, index) => (
                    <ConfigurationGuideGallery guideData={guide} responsive={responsive} key={index} />
                ))}
            </div>
        )
    );
}

const ConfigurationGuideGallery = ({ guideData, responsive }) => {
    const guides = useMemo(() => {
        const parser = new DOMParser();
        const guideNode = parser.parseFromString(guideData.guide, 'text/html');
        return Array.from(guideNode.querySelectorAll('.element-item a')).map((node) => ({
            url: node.href,
            title: extractUrlKey(node.href),
            imageUrl: extractBackgroundImage(node.querySelector('.preview-frame').outerHTML),
        }));
    }, [guideData]);

    return (
        guides.length > 0 && (
            <div className={styles.gallery}>
                <Gallery variant="classic" responsive={responsive}>
                    {guides.map((guide, index) => (
                        <a href={guide.url} key={index} data-action={'link'} target={'_blank'} rel="noreferrer">
                            <img src={guide.imageUrl} alt={guide.title} height={302} width={302} />
                            <span>{guide.title}</span>
                        </a>
                    ))}
                </Gallery>
            </div>
        )
    );
};

const extractUrlKey = (url) => {
    const match = url.match(/\/([^/]+)\.pdf$/);
    if (match) {
        const rawKey = decodeURIComponent(match[1].replace(/\+/g, ' '));
        const cleanedKey = rawKey.replace(/[^a-zA-Z\s]/g, ' ').trim();
        return cleanedKey.length > 0 ? cleanedKey : null;
    }
    return null;
};

const extractBackgroundImage = (html) => {
    const match = html.match(/background-image:url\(['"](.+?)['"]\)/);
    return match ? match[1] : null;
};
