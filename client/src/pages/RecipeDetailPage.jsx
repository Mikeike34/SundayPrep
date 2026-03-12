import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchRecipeById } from '../services/api';
import Navbar from '../components/Navbar';

export default function RecipeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('ingredients');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchRecipeById(id);
        setRecipe(data);
      } catch (err) {
        setError('Failed to load recipe.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const getIngredients = (recipe) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push({
          ingredient: ingredient.trim(),
          measure: measure ? measure.trim() : '',
        });
      }
    }
    return ingredients;
  };

  const getYouTubeId = (url) => {
    if (!url) return null;
    const match = url.match(/(?:v=|youtu\.be\/)([^&]+)/);
    return match ? match[1] : null;
  };

  const formatInstructions = (text) => {
    if (!text) return [];
    // Split on numbered steps if present, otherwise split on double newlines
    const numbered = text.split(/\r\n|\r|\n/).filter(line => line.trim());
    return numbered;
  };

  if (loading) {
    return (
      <div className="page-enter min-h-screen w-full" style={{ backgroundColor: '#FFEFC0' }}>
        <Navbar />
        <div className="w-full px-4 sm:px-6 lg:px-10 pt-24 pb-16">
          <div className="animate-pulse space-y-6 max-w-5xl mx-auto">
            <div className="h-8 w-48 rounded-lg" style={{ backgroundColor: '#d4c4b0' }} />
            <div className="h-96 rounded-2xl" style={{ backgroundColor: '#d4c4b0' }} />
            <div className="h-6 w-72 rounded" style={{ backgroundColor: '#d4c4b0' }} />
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-4 rounded" style={{ backgroundColor: '#d4c4b0', width: `${80 - i * 5}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center" style={{ backgroundColor: '#FFEFC0' }}>
        <Navbar />
        <div className="text-center pt-24">
          <p className="text-5xl mb-4">😕</p>
          <p className="text-xl font-semibold mb-4" style={{ color: '#1e1208' }}>Recipe not found</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 rounded-xl font-bold transition-colors"
            style={{ backgroundColor: '#E6B370', color: '#1e1208' }}
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  const ingredients = getIngredients(recipe);
  const youtubeId = getYouTubeId(recipe.strYoutube);
  const steps = formatInstructions(recipe.strInstructions);

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: '#FFEFC0' }}>
      <Navbar />

      <main className="w-full px-4 sm:px-6 lg:px-10 pt-24 pb-16">
        <div className="max-w-5xl mx-auto">

          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 mb-6 text-sm font-semibold transition-colors group"
            style={{ color: '#B97836' }}
            onMouseEnter={e => e.currentTarget.style.color = '#1e1208'}
            onMouseLeave={e => e.currentTarget.style.color = '#B97836'}
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Back to results
          </button>

          {/* Hero image + title */}
          <div className="relative rounded-2xl overflow-hidden mb-8 shadow-xl">
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="w-full h-64 sm:h-80 md:h-96 object-cover"
            />
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(30,18,8,0.85) 0%, rgba(30,18,8,0.2) 60%, transparent 100%)' }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="flex flex-wrap gap-2 mb-3">
                {recipe.strCategory && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
                    style={{ backgroundColor: '#E6B370', color: '#1e1208' }}>
                    {recipe.strCategory}
                  </span>
                )}
                {recipe.strArea && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border"
                    style={{ borderColor: '#E6B370', color: '#E6B370' }}>
                    {recipe.strArea}
                  </span>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
                style={{ color: '#EFDDCD' }}>
                {recipe.strMeal}
              </h1>
            </div>
          </div>

          {/* Tab navigation */}
          <div className="flex gap-2 mb-8 border-b" style={{ borderColor: '#d4c4b0' }}>
            {['ingredients', 'instructions', ...(youtubeId ? ['video'] : [])].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-5 py-3 text-sm font-semibold capitalize transition-colors border-b-2 -mb-px"
                style={activeTab === tab
                  ? { borderColor: '#B97836', color: '#B97836' }
                  : { borderColor: 'transparent', color: '#8a6a4a' }
                }
              >
                {tab === 'ingredients' && '🧂 '}
                {tab === 'instructions' && '📋 '}
                {tab === 'video' && '▶️ '}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Ingredients tab */}
          {activeTab === 'ingredients' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {ingredients.map(({ ingredient, measure }, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border"
                  style={{ backgroundColor: '#fff8f0', borderColor: '#e8d5bf' }}
                >
                  <img
                    src={`https://www.themealdb.com/images/ingredients/${ingredient}-Small.png`}
                    alt={ingredient}
                    className="w-10 h-10 object-contain flex-shrink-0"
                    onError={e => { e.target.style.display = 'none' }}
                  />
                  <div className="min-w-0">
                    <p className="font-semibold text-sm truncate" style={{ color: '#1e1208' }}>
                      {ingredient}
                    </p>
                    {measure && (
                      <p className="text-xs" style={{ color: '#B97836' }}>
                        {measure}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Instructions tab */}
          {activeTab === 'instructions' && (
            <div className="space-y-4">
              {steps.map((step, i) => (
                step.trim() ? (
                  <div
                    key={i}
                    className="flex gap-4 p-4 rounded-xl border"
                    style={{ backgroundColor: '#fff8f0', borderColor: '#e8d5bf' }}
                  >
                    <span
                      className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                      style={{ backgroundColor: '#E6B370', color: '#1e1208' }}
                    >
                      {i + 1}
                    </span>
                    <p className="text-sm leading-relaxed" style={{ color: '#1e1208' }}>
                      {step}
                    </p>
                  </div>
                ) : null
              ))}
            </div>
          )}

          {/* Video tab */}
          {activeTab === 'video' && youtubeId && (
            <div className="rounded-2xl overflow-hidden shadow-lg"
              style={{ aspectRatio: '16/9' }}>
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}`}
                title={recipe.strMeal}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          )}

          {/* Tags */}
          {recipe.strTags && (
            <div className="mt-8 flex flex-wrap gap-2">
              {recipe.strTags.split(',').map(tag => tag.trim()).filter(Boolean).map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-medium shadow-sm"
                  style={{ backgroundColor: '#C19A6B', color: '#FFFFFF' }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

        </div>
      </main>
    </div>
  );
}