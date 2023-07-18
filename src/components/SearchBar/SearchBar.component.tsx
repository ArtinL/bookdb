import React, {useState, useRef} from 'react';

type SearchBarProps = {
    onSearch: (query: string, advancedParams: Record<string, string>) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({onSearch}) => {
    const [query, setQuery] = useState('');
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
    const [advancedParams, setAdvancedParams] = useState<Record<string, string>>({});
    const searchButtonRef = useRef<HTMLButtonElement>(null);

    const handleSearch = () => {
        onSearch(query, advancedParams);
    };

    const handleAdvancedParamChange = (paramKey: string, paramValue: string) => {
        setAdvancedParams((prevParams) => ({
            ...prevParams,
            [paramKey]: paramValue,
        }));
    };

    const handleToggleAdvancedSearch = () => {
        setShowAdvancedSearch((prevValue) => !prevValue);
    };

    const handleClearFilters = () => {
        setAdvancedParams({});
        onSearch(query, {});
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div>
            <input placeholder={query} type="text" value={query} onChange={(e) => setQuery(e.target.value)}
                   onKeyDown={handleKeyDown}/>
            <button onClick={handleToggleAdvancedSearch}>
                {showAdvancedSearch ? 'Hide Advanced' : 'Show Advanced'}
            </button>
            {showAdvancedSearch && (
                <div>
                    {/* Render advanced search fields here */}
                    <p>Category:</p>
                    <input
                        type="text"
                        value={advancedParams.category || ''}
                        onChange={(e) => handleAdvancedParamChange('category', e.target.value)}
                    />
                    {/* Add more advanced search fields as needed */}
                    <button onClick={handleClearFilters}>Clear Filters</button>
                </div>
            )}
            <button ref={searchButtonRef} onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchBar;
