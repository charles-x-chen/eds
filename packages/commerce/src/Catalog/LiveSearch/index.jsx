/**
 * @package     BlueAcorn/Catalog
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { useCallback, useState } from 'preact/hooks';
import LIVE_SEARCH from './gql/liveSearch.gql';
import { SEARCH_NAME, SEARCH_PATH } from './constants';
import Products from './View/Products';
import useQuery from '~/hooks/useQuery';
import useDebounce from '~/hooks/useDebounce';
import Loading from '~/View/Loading';

export default function LiveSearch() {
    const [inputValue, setInputValue] = useState('');
    const debouncedSearchTerm = useDebounce(inputValue, 500);

    const onInputChange = useCallback((event) => {
        setInputValue(event.target.value);
    }, []);

    return (
        <form action={SEARCH_PATH} method="GET">
            <div className={'field search'}>
                <input
                    type="search"
                    name={SEARCH_NAME}
                    placeholder={t`What are you looking for?`}
                    value={inputValue}
                    onInput={onInputChange}
                />
                <button type="submit" className="action search" aria-label="Search" disabled={!inputValue.length}>
                    <span>{t`Search`}</span>
                </button>
            </div>
            <LiveSearchResults phrase={debouncedSearchTerm} />
        </form>
    );
}

function LiveSearchResults({ phrase }) {
    const visible = phrase.length >= 2;

    const [{ data, fetching, stale, error }] = useQuery({
        query: LIVE_SEARCH,
        variables: { phrase },
        pause: !visible,
    });

    if (!visible) {
        return null;
    }

    if (fetching && !stale) {
        return <Loading />;
    }

    if (data) {
        const { items, suggestions } = data.products;
        return (
            <div>
                <h3>{t`Suggestions`}</h3>
                <ul>
                    {suggestions.map((suggestion, index) => (
                        <li key={index}>
                            <a href={getSearchUrl(suggestion)}>{suggestion}</a>
                        </li>
                    ))}
                </ul>
                <Products items={items} />
            </div>
        );
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return <p>{t`We're sorry, no results found for "${phrase}".`}</p>;
}

function getSearchUrl(phrase) {
    return `${SEARCH_PATH}?${SEARCH_NAME}=${encodeURIComponent(phrase)}`;
}
