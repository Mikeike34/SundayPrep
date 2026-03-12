import { useNavigate } from 'react-router-dom';

export default function RecipeGrid({ recipes, loading }) {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="rounded-xl aspect-square mb-2" style={{ backgroundColor: '#2e1f0f' }} />
            <div className="rounded h-4 w-3/4" style={{ backgroundColor: '#2e1f0f' }} />
          </div>
        ))}
      </div>
    );
  }

  if (!recipes.length) {
    return (
      <div className="w-full text-center py-16">
        <p className="text-4xl mb-3">🍽️</p>
        <p className="text-lg" style={{ color: '#B97836' }}>No recipes found. Try a different search!</p>
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {recipes.map((recipe) => (
        <button
            key={recipe.idMeal}
            onClick={() => navigate(`/recipe/${recipe.idMeal}`)}
            className="group text-left flex flex-col w-full transition-all duration-100 ease-in-out transform active:translate-y-px"
        >
            <div className="relative overflow-hidden rounded-xl aspect-square w-full mb-2"
                style={{ backgroundColor: '#2e1f0f' }}>
                <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            </div>
            <p className="text-xs sm:text-sm font-medium leading-snug w-full transition-colors"
                style={{ color: '#1e1208' }}
                onMouseEnter={e => e.target.style.color = '#B97836'}
                onMouseLeave={e => e.target.style.color = '#1e1208'}
            >
                {recipe.strMeal}
            </p>
        </button>
      ))}
    </div>
  );
}