import { useState } from 'react';
import { useSearch } from '../context/SearchContext';
import { searchRecipesByName, searchRecipesByIngredient } from '../services/api';

export default function SearchBar({ onResults, onLoading }) {
  const { searchQuery, setSearchQuery, searchMode, setSearchMode, setSearchResults, setHasSearched } = useSearch();
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!localQuery.trim()) return;

    onLoading(true);
    setSearchQuery(localQuery);
    setHasSearched(true);

    try {
      const results = searchMode === 'name'
        ? await searchRecipesByName(localQuery)
        : await searchRecipesByIngredient(localQuery);
      setSearchResults(results);
      onResults(results);
    } catch (err) {
      console.error(err);
      setSearchResults([]);
      onResults([]);
    } finally {
      onLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => setSearchMode('name')}
          className="px-4 py-1.5 rounded-full text-sm font-medium transition-colors shadow-md"
          style={searchMode === 'name'
            ? { backgroundColor: '#F0BE77', color: '#1e1208' }
            : { backgroundColor: '#FFE6C2', color: '#1e1208' }}
        >
          By Dish Name
        </button>
        <button
          onClick={() => setSearchMode('ingredient')}
          className="px-4 py-1.5 rounded-full text-sm font-medium transition-colors shadow-md"
          style={searchMode === 'ingredient'
            ? { backgroundColor: '#F0BE77', color: '#1e1208' }
            : { backgroundColor: '#FFE6C2', color: '#1e1208' }}
        >
          By Ingredient
        </button>
      </div>

      <form onSubmit={handleSearch} className="flex gap-3">
        <input
          type="text"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          placeholder={searchMode === 'name' ? 'Search for a dish... e.g. "pasta"' : 'Search by ingredient... e.g. "chicken"'}
          className="flex-1 px-5 py-3 rounded-xl focus:outline-none focus:ring-2 transition-colors"
          style={{
            backgroundColor: '#FFFFFF',
            border: 'none',
            color: '#333333',
            '--tw-ring-color': '#FFD5CF',
          }}
        />
        <button
          type="submit"
          className="px-6 py-3 font-bold rounded-xl transition-colors whitespace-nowrap shadow-md transition-all duration-100 ease-in-out transform active:translate-y-px"
          style={{ backgroundColor: '#F0BE77', color: '#FFFFFF' }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#FFE6C2'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#F0BE77'}
        >
          Search
        </button>
      </form>
    </div>
  );
}