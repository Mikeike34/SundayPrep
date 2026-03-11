import { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const[searchMode, setSearchMode] = useState('name'); //'name' or 'ingredient'
    const[hasSearched, setHasSearched] = useState(false);

    const clearSearch = () => {
        setSearchQuery('');
        setSearchResults([]);
        setHasSearched(false);
        setSearchMode('name');
    };

    return(
        <SearchContext.Provider value={{
            searchQuery, setSearchQuery,
            searchResults, setSearchResults,
            searchMode, setSearchMode,
            hasSearched, setHasSearched,
            clearSearch,
        }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => useContext(SearchContext);