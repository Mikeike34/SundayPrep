import { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const[searchMode, setSearchMode] = useState('name'); //'name' or 'ingredient'
    const[hasSearched, setHasSearched] = useState(false);
    const [groceryList, setGroceryList] = useState([]);

    const clearSearch = () => {
        setSearchQuery('');
        setSearchResults([]);
        setHasSearched(false);
        setSearchMode('name');
    };

    const addToGroceryList = (ingredients, recipeName) => {
        setGroceryList(prev => {
            const updated = [...prev];
            ingredients.forEach(({ ingredient, measure }) => {
                const existing = updated.find(
                    item => item.ingredient.toLowerCase() === ingredient.toLowerCase()
                );
                if (existing) {
                    existing.measures.push({ measure, recipeName });
                } else {
                    updated.push({ ingredient, measures: [{ measure, recipeName }] });
                }
            });
            return updated;
        });
    };

    const removeFromGroceryList = (ingredientName) => {
        setGroceryList(prev =>
            prev.filter(item => item.ingredient.toLowerCase() !== ingredientName.toLowerCase())
        );
    };

    const clearGroceryList = () => setGroceryList([]);

    return(
        <SearchContext.Provider value={{
            searchQuery, setSearchQuery,
            searchResults, setSearchResults,
            searchMode, setSearchMode,
            hasSearched, setHasSearched,
            clearSearch,
            groceryList,
            addToGroceryList,
            removeFromGroceryList,
            clearGroceryList,
        }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => useContext(SearchContext);