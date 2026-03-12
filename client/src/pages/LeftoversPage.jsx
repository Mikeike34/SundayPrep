import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { searchRecipesByIngredient } from '../services/api';

export default function LeftoversPage() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState(null);

  const addIngredient = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    if (ingredients.map(i => i.toLowerCase()).includes(trimmed.toLowerCase())) return;
    setIngredients(prev => [...prev, trimmed]);
    setInputValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addIngredient();
    }
  };

  const removeIngredient = (index) => {
    setIngredients(prev => prev.filter((_, i) => i !== index));
  };

  const handleSearch = async () => {
    if (ingredients.length === 0) return;

    setLoading(true);
    setSearched(true);
    setError(null);

    try {
      // Fetch results for each ingredient separately
      const resultSets = await Promise.all(
        ingredients.map(ing => searchRecipesByIngredient(ing))
      );

      // Find recipes that appear in ALL result sets (intersection)
      const idSets = resultSets.map(set => new Set(set.map(r => r.idMeal)));
      const commonIds = [...idSets[0]].filter(id =>
        idSets.every(set => set.has(id))
      );

      // Build final list from the first result set (all sets have same meals for matching ids)
      const allMeals = resultSets.flat();
      const seen = new Set();
      const matched = commonIds
        .map(id => allMeals.find(r => r.idMeal === id))
        .filter(r => {
          if (!r || seen.has(r.idMeal)) return false;
          seen.add(r.idMeal);
          return true;
        });

      setResults(matched);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setIngredients([]);
    setResults([]);
    setSearched(false);
    setInputValue('');
    setError(null);
  };

  return (
    <div className="page-enter min-h-screen w-full" style={{ backgroundColor: '#FFEFC0' }}>
      <Navbar />

      <main className="w-full px-4 sm:px-6 lg:px-10 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 mb-6 text-sm font-semibold transition-colors group"
            style={{ color: '#B97836' }}
            onMouseEnter={e => e.currentTarget.style.color = '#1e1208'}
            onMouseLeave={e => e.currentTarget.style.color = '#B97836'}
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Back to search
          </button>

          <div className="mb-10">
            <h1 className="text-4xl sm:text-5xl font-bold mb-3 leading-tight"
              style={{ color: '#1e1208' }}>
              🧺 What's in your fridge?
            </h1>
            <p className="text-lg" style={{ color: '#B97836' }}>
              Enter the ingredients you already have and we'll find recipes that use all of them.
            </p>
          </div>

          {/* Input area */}
          <div className="rounded-2xl p-6 mb-8 shadow-md"
            style={{ backgroundColor: '#fff8f0' }}>

            <label className="block text-sm font-semibold uppercase tracking-wider mb-3"
              style={{ color: '#B97836' }}>
              Add an ingredient
            </label>

            <div className="flex gap-3 mb-4">
              <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder='e.g. "chicken", "garlic", "tomato"'
                className="flex-1 px-5 py-3 rounded-xl focus:outline-none focus:ring-2 transition-colors"
                style={{
                  backgroundColor: '#FFE6C2',
                  border: '1px solid #d4c4b0',
                  color: '#1e1208',
                }}
              />
              <button
                onClick={addIngredient}
                className="px-6 py-3 rounded-xl font-bold transition-colors whitespace-nowrap shadow-md transition-all duration-100 ease-in-out transform active:translate-y-px"
                style={{ backgroundColor: '#E6B370', color: '#1e1208' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#FFE6C2'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#E6B370'}
              >
                + Add
              </button>
            </div>

            {/* Ingredient tags */}
            {ingredients.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                    style={{ backgroundColor: '#E6B370', color: '#1e1208' }}
                  >
                    {ing}
                    <button
                      onClick={() => removeIngredient(i)}
                      className="w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold transition-colors hover:opacity-70"
                      style={{ color: '#1e1208' }}
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleSearch}
                disabled={ingredients.length === 0 || loading}
                className="flex-1 py-3 rounded-xl shadow-md font-bold transition-colors disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-100 ease-in-out transform active:translate-y-px"
                style={{ backgroundColor: '#E6B370', color: '#000000' }}
                onMouseEnter={e => { if (ingredients.length > 0) e.currentTarget.style.backgroundColor = '#FFE6C2' }}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#E6B370'}
              >
                {loading ? 'Searching...' : `Find Recipes with ${ingredients.length > 0 ? `these ${ingredients.length} ingredient${ingredients.length !== 1 ? 's' : ''}` : 'my ingredients'}`}
              </button>
              {(ingredients.length > 0 || searched) && (
                <button
                  onClick={handleClear}
                  className="px-5 py-3 rounded-xl font-semibold text-sm transition-colors border transition-all duration-100 ease-in-out transform active:translate-y-px"
                  style={{ borderColor: '#d4c4b0', color: '#8a6a4a' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#B97836'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#d4c4b0'}
                >
                  Clear all
                </button>
              )}
            </div>
          </div>

          {/* Results */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse rounded-xl overflow-hidden">
                  <div className="aspect-square" style={{ backgroundColor: '#d4c4b0' }} />
                  <div className="h-4 mt-2 rounded w-3/4" style={{ backgroundColor: '#d4c4b0' }} />
                </div>
              ))}
            </div>
          )}

          {!loading && searched && results.length === 0 && (
            <div className="text-center py-16 rounded-2xl border"
              style={{ backgroundColor: '#fff8f0', borderColor: '#e8d5bf' }}>
              <p className="text-5xl mb-4">🤷</p>
              <p className="text-xl font-semibold mb-2" style={{ color: '#1e1208' }}>
                No matches found
              </p>
              <p className="text-sm" style={{ color: '#B97836' }}>
                Try removing an ingredient or using more common items.
              </p>
            </div>
          )}

          {!loading && results.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-6" style={{ color: '#1e1208' }}>
                {results.length} recipe{results.length !== 1 ? 's' : ''} found with all your ingredients
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {results.map(recipe => (
                  <button
                    key={recipe.idMeal}
                    onClick={() => navigate(`/recipe/${recipe.idMeal}`)}
                    className="group text-left flex flex-col w-full transition-all duration-100 ease-in-out transform active:translate-y-px"
                  >
                    <div className="relative overflow-hidden rounded-xl w-full mb-2"
                      style={{ backgroundColor: '#d4c4b0', aspectRatio: '1 / 1' }}>
                      <img
                        src={recipe.strMealThumb}
                        alt={recipe.strMeal}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <p className="text-sm font-semibold leading-snug w-full break-words transition-colors"
                      style={{ color: '#1e1208' }}
                      onMouseEnter={e => e.target.style.color = '#B97836'}
                      onMouseLeave={e => e.target.style.color = '#1e1208'}
                    >
                      {recipe.strMeal}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="text-center py-8 rounded-2xl border"
              style={{ backgroundColor: '#fff8f0', borderColor: '#EFA686' }}>
              <p className="font-semibold" style={{ color: '#1e1208' }}>{error}</p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}