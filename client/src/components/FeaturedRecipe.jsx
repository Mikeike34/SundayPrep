import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FeaturedRecipe({ recipe }) {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  if (!recipe) return null;

  const instructions = recipe.strInstructions || '';
  const words = instructions.split(' ');
  const preview = words.slice(0, 60).join(' ');
  const isTruncated = words.length > 60;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure ? measure.trim() : ''} ${ingredient.trim()}`.trim());
    }
  }

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-lg"
      style={{ backgroundColor: '#C19A6B' }}>
      <div className="md:flex md:h-[480px]">

        {/* Image — fixed, never grows */}
        <div className="md:w-1/2 relative flex-shrink-0 h-72 md:h-full">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(30,18,8,0.6) 0%, transparent 60%)' }} />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider"
              style={{ backgroundColor: '#E6B370', color: '#1e1208' }}>
              ✨ Featured Recipe
            </span>
          </div>
        </div>

        {/* Content — fixed height, internal scroll */}
        <div className="md:w-1/2 flex flex-col h-full p-6 md:p-8" style={{ minHeight: 0 }}>

          {/* Static top section */}
          <div className="flex-shrink-0">
            <div className="flex flex-wrap gap-2 mb-3">
              {recipe.strCategory && (
                <span className="px-2 py-1 text-b-xs rounded-md"
                  style={{ backgroundColor: '#FFE6C2', color: '#000000' }}>
                  {recipe.strCategory}
                </span>
              )}
              {recipe.strArea && (
                <span className="px-2 py-1 text-b-xs rounded-md"
                  style={{ backgroundColor: '#FFE6C2', color: '#000000' }}>
                  {recipe.strArea}
                </span>
              )}
            </div>

            <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight" style={{ color: '#FFFFFF' }}>
              {recipe.strMeal}
            </h2>

            <div className="mb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: '#35281E' }}>
                Ingredients
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#FFFFFF' }}>
                {ingredients.slice(0, 6).join(' · ')}
                {ingredients.length > 6 && ` · +${ingredients.length - 6} more`}
              </p>
            </div>

            <h3 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: '#35281E' }}>
              Instructions
            </h3>
          </div>

          {/* Scrollable instructions area — stops 20px above button */}
          <div
            className="flex-1 overflow-y-auto pr-1 mb-5"
            style={{
              minHeight: 0,
              paddingBottom: '0px',
              scrollbarWidth: 'thin',
              scrollbarColor: '#B97836 #2e1f0f',
            }}
          >
            <p className="text-sm leading-relaxed" style={{ color: '#FFFFFF' }}>
              {expanded || !isTruncated ? instructions : `${preview}...`}
            </p>
            {isTruncated && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="mt-2 text-sm font-medium transition-colors"
                style={{ color: '#E6B370' }}
                onMouseEnter={e => e.target.style.color = '#FFE6C2'}
                onMouseLeave={e => e.target.style.color = '#E6B370'}
              >
                {expanded ? '▲ Show less' : '▼ Show all'}
              </button>
            )}
          </div>

          {/* Button — always pinned at bottom, never moves */}
          <div className="flex-shrink-0">
            <button
              onClick={() => navigate(`/recipe/${recipe.idMeal}`)}
              className="w-full py-3 font-bold rounded-xl transition-colors transition-all duration-100 ease-in-out transform active:translate-y-px"
              style={{ backgroundColor: '#FFE6C2', color: '#1e1208' }}
              onMouseEnter={e => e.target.style.backgroundColor = '#F0BE77'}
              onMouseLeave={e => e.target.style.backgroundColor = '#FFE6C2'}
            >
              View Full Recipe →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}