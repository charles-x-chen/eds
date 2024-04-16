/**
 * @package     BlueAcorn/View
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { BsChevronRight } from 'react-icons/bs';
import style from './style.module.css';

export default function Breadcrumbs({ items }) {
    return (
        <>
            <Items items={items || []} />
            <Schema items={items || []} />
        </>
    );
}

function Items({ items }) {
    const elements = [
        {
            name: t`Home`,
            url: location.origin,
        },
        ...items,
    ];

    return (
        <ul class={style.items}>
            {elements.map((item, index) => (
                <Item key={index} item={item} last={index + 1 === elements.length} />
            ))}
        </ul>
    );
}

function Item({ item: { name, url }, last }) {
    return (
        <li>
            {url && !last ? <a href={url}>{name}</a> : <strong>{name}</strong>}

            {!last ? <BsChevronRight /> : null}
        </li>
    );
}

function Schema({ items }) {
    const content = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map(({ url, name }, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
                '@id': url.startsWith('http') ? url : `${location.origin}${url}`,
                name,
            },
        })),
    };
    return <script type="application/ld+json">{JSON.stringify(content)}</script>;
}
