import React, {useState} from 'react';

type advSearchProps = {
    advParamChange: (paramkey: string, paramvalue: string, reset: boolean) => void;
    prevParams: string;
}

export default function AdvSearch({advParamChange, prevParams}: advSearchProps): React.ReactElement {

    const [showAdvancedSearch, setShowAdvancedSearch] = useState<boolean>(false);

    function handleToggleAdvancedSearch(): void {
        setShowAdvancedSearch((prevValue: boolean) => !prevValue);
    }

    function handleClearFilters(): void {
        advParamChange('', '', true);
    }

    return (
        <div>
            <button onClick={handleToggleAdvancedSearch}>
                {showAdvancedSearch ? 'Hide Advanced' : 'Show Advanced'}
            </button>
            {showAdvancedSearch && (
                <div>
                    <p>Category:</p>
                    <input
                        type="text"
                        value={prevParams}
                        placeholder={'Enter a category...'}
                        onChange={(e) => advParamChange('category', e.target.value, false)}
                    />
                    <button onClick={handleClearFilters}>Clear Filters</button>
                </div>
            )}
        </div>
    );
}

