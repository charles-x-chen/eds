/**
 * @package     BlueAcorn/Catalog
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import styles from './style.module.css';
import RichText from '~/View/RichText';

export default function ProductDescription({ product }) {
    return (
        <dl className={styles.description}>
            <Description product={product} />
            <MoreInformation product={product} />
        </dl>
    );
}

function Description({ product: { description } }) {
    if (!description) {
        return null;
    }

    return (
        <>
            <dt>{t`Description`}</dt>
            <dd>
                <RichText content={description} />
            </dd>
        </>
    );
}

function MoreInformation({ product: { attributes } }) {
    const attrs = attributes.filter(({ name }) => ['fabric_type', 'item_contents', 'features'].includes(name));

    if (!attrs.length) {
        return null;
    }

    return (
        <>
            <dt>{t`More Informationn`}</dt>
            <dd>
                <ul>
                    {attrs.map((attr) => (
                        <li key={attr.name}>
                            <strong>{attr.label}</strong>
                            <RichText content={attr.value} />
                        </li>
                    ))}
                </ul>
            </dd>
        </>
    );
}
