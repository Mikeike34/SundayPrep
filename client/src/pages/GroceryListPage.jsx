import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import {useSearch} from '../context/SearchContext';
import Navbar from '../components/Navbar.jsx';

export default function GroceryListPage() {
    const navigate = useNavigate();
    const {groceryList, removeFromGroceryList, clearGroceryList} = useSearch();
    const [checked, setChecked] = useState({});

    const toggleChecked = (ingredient) => {
        setChecked(prev => ({...prev, [ingredient]: !prev[ingredient] }));
    };

    return (
    <div className="page-enter min-h-screen w-full" style={{ backgroundColor: '#FFEFC0' }}>
      <Navbar />

      <main className="w-full px-4 sm:px-6 lg:px-10 pt-24 pb-16">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 mb-6 text-sm font-semibold transition-colors group"
            style={{ color: '#B97836' }}
            onMouseEnter={e => e.currentTarget.style.color = '#1e1208'}
            onMouseLeave={e => e.currentTarget.style.color = '#B97836'}
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Back
          </button>

          <div className="flex items-start justify-between mb-8 gap-4">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight" style={{ color: '#1e1208' }}>
                🛒 Grocery List
              </h1>
              <p className="mt-2 text-sm" style={{ color: '#B97836' }}>
                {groceryList.length > 0
                  ? `${groceryList.length} item${groceryList.length !== 1 ? 's' : ''} to pick up`
                  : 'Your list is empty'}
              </p>
            </div>
            {groceryList.length > 0 && (
              <button
                onClick={clearGroceryList}
                className="px-4 py-2 rounded-xl text-sm font-semibold border transition-colors flex-shrink-0"
                style={{ borderColor: '#d4c4b0', color: '#8a6a4a' }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#B97836';
                  e.currentTarget.style.color = '#B97836';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#d4c4b0';
                  e.currentTarget.style.color = '#8a6a4a';
                }}
              >
                Clear all
              </button>
            )}
          </div>

          {/* Empty state */}
          {groceryList.length === 0 && (
            <div className="text-center py-20 rounded-2xl border"
              style={{ backgroundColor: '#fff8f0', borderColor: '#e8d5bf' }}>
              <p className="text-6xl mb-4">🧾</p>
              <p className="text-xl font-semibold mb-2" style={{ color: '#1e1208' }}>
                No ingredients yet
              </p>
              <p className="text-sm mb-6" style={{ color: '#B97836' }}>
                Add ingredients from a recipe page to build your list.
              </p>
              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 rounded-xl font-bold transition-colors shadow-md transition-all duration-100 ease-in-out transform active:translate-y-px"
                style={{ backgroundColor: '#FFE6C2', color: '#1e1208' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F0BE77'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FFE6C2'}
              >
                Find a Recipe
              </button>
            </div>
          )}

          {/* Grocery list */}
          {groceryList.length > 0 && (
            <div className="rounded-2xl overflow-hidden border shadow-sm"
              style={{ backgroundColor: '#fff8f0', borderColor: '#e8d5bf' }}>

              {/* List header */}
              <div className="px-6 py-4 border-b flex items-center gap-3"
                style={{ borderColor: '#e8d5bf', backgroundColor: '#fdf3e7' }}>
                <div className="flex-1">
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#B97836' }}>
                    Ingredient
                  </span>
                </div>
                <div className="w-40 hidden sm:block">
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#B97836' }}>
                    Amount
                  </span>
                </div>
                <div className="w-6" />
              </div>

              {/* Items */}
              {groceryList.map(({ ingredient, measures }, i) => (
                <div
                  key={ingredient}
                  className="px-6 py-4 flex items-start gap-3 border-b last:border-b-0 transition-colors"
                  style={{
                    borderColor: '#e8d5bf',
                    backgroundColor: checked[ingredient] ? '#f5ede0' : 'transparent',
                  }}
                >
                  {/* Checkbox */}
                  <button
                    onClick={() => toggleChecked(ingredient)}
                    className="flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 transition-colors"
                    style={{
                      borderColor: checked[ingredient] ? '#B97836' : '#d4c4b0',
                      backgroundColor: checked[ingredient] ? '#B97836' : 'transparent',
                    }}
                  >
                    {checked[ingredient] && (
                      <span className="text-xs font-bold" style={{ color: '#EFDDCD' }}>✓</span>
                    )}
                  </button>

                  {/* Ingredient image + name */}
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <img
                      src={`https://www.themealdb.com/images/ingredients/${ingredient}-Small.png`}
                      alt={ingredient}
                      className="w-10 h-10 object-contain flex-shrink-0"
                      onError={e => { e.target.style.display = 'none' }}
                    />
                    <div className="min-w-0">
                      <p
                        className="font-semibold text-sm transition-colors"
                        style={{
                          color: checked[ingredient] ? '#a89070' : '#1e1208',
                          textDecoration: checked[ingredient] ? 'line-through' : 'none',
                        }}
                      >
                        {ingredient}
                      </p>
                      {/* Recipe source — visible on mobile below name */}
                      <p className="text-xs sm:hidden mt-0.5" style={{ color: '#B97836' }}>
                        {measures.map(m => m.measure).filter(Boolean).join(', ') || 'As needed'}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: '#c4a882' }}>
                        {measures.map(m => m.recipeName).join(', ')}
                      </p>
                    </div>
                  </div>

                  {/* Amount — hidden on mobile, shown inline instead */}
                  <div className="w-40 hidden sm:block flex-shrink-0">
                    <p className="text-sm" style={{ color: '#1e1208' }}>
                      {measures.map(m => m.measure).filter(Boolean).join(' + ') || 'As needed'}
                    </p>
                  </div>

                  {/* Remove button */}
                  <button
                    onClick={() => removeFromGroceryList(ingredient)}
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs transition-colors"
                    style={{ color: '#c4a882' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#B97836'}
                    onMouseLeave={e => e.currentTarget.style.color = '#c4a882'}
                  >
                    ✕
                  </button>
                </div>
              ))}

              {/* Footer summary */}
              <div className="px-6 py-4 border-t flex items-center justify-between"
                style={{ borderColor: '#e8d5bf', backgroundColor: '#fdf3e7' }}>
                <p className="text-xs" style={{ color: '#B97836' }}>
                  {Object.values(checked).filter(Boolean).length} of {groceryList.length} items checked off
                </p>
                {Object.values(checked).some(Boolean) && (
                  <button
                    onClick={() => setChecked({})}
                    className="text-xs font-semibold transition-colors"
                    style={{ color: '#B97836' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#1e1208'}
                    onMouseLeave={e => e.currentTarget.style.color = '#B97836'}
                  >
                    Uncheck all
                  </button>
                )}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}