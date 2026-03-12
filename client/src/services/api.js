const BASE = 'https://www.themealdb.com/api/json/v1/1';

export const fetchRandomRecipe = async () => {
  const res = await fetch(`${BASE}/random.php`);
  if (!res.ok) throw new Error('Failed to fetch random recipe');
  const data = await res.json();
  return data.meals[0];
};

export const searchRecipesByName = async (query) => {
  const res = await fetch(`${BASE}/search.php?s=${encodeURIComponent(query.trim())}`);
  if (!res.ok) throw new Error('Failed to search recipes');
  const data = await res.json();
  return data.meals ?? [];
};

export const searchRecipesByIngredient = async (ingredient) => {
  const res = await fetch(`${BASE}/filter.php?i=${encodeURIComponent(ingredient.trim())}`);
  if (!res.ok) throw new Error('Failed to search by ingredient');
  const data = await res.json();
  return data.meals ?? [];
};

export const fetchRecipeById = async (id) => {
  const res = await fetch(`${BASE}/lookup.php?i=${id}`);
  if (!res.ok) throw new Error('Failed to fetch recipe');
  const data = await res.json();
  return data.meals[0];
};