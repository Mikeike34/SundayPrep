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
          className="px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
          style={searchMode === 'name'
            ? { backgroundColor: '#E6B370', color: '#1e1208' }
            : { backgroundColor: '#2e1f0f', color: '#FFCBB2' }}
        >
          By Dish Name
        </button>
        <button
          onClick={() => setSearchMode('ingredient')}
          className="px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
          style={searchMode === 'ingredient'
            ? { backgroundColor: '#E6B370', color: '#1e1208' }
            : { backgroundColor: '#2e1f0f', color: '#FFCBB2' }}
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
            backgroundColor: '#2e1f0f',
            border: '1px solid #B97836',
            color: '#EFDDCD',
            '--tw-ring-color': '#E6B370',
          }}
        />
        <button
          type="submit"
          className="px-6 py-3 font-bold rounded-xl transition-colors whitespace-nowrap"
          style={{ backgroundColor: '#E6B370', color: '#1e1208' }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#FFCBB2'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#E6B370'}
        >
          Search
        </button>
      </form>
    </div>
  );
}