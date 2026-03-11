const BASE = '/api';

export const fetchRandomRecipe = async () => {
    const res = await fetch(`${BASE}/random`);
    if(!res.ok) throw new Error('Failed to fetch random recipe');
    const data = await res.json();
    return data.meals[0];
};

export const searchRecipesByName = async (query) => {
    const res = await fetch(`${BASE}/search?q=${encodedURIComponent(query)}`);
    if(!res.ok) throw new Error('Failed to search recipes');
    const data = await res.json();
    return data.meals || [];
};

export const searchRecipesByIngredient = async (ingredient) => {
    const res = await fetch(`${BASE}/ingredient?i=${encodeURIComponent(ingredient)}`);
    if(!res.ok) throw new Error('Failed to search by ingredient');
    const data = await res.json();
    return data.meals || [];
};

export const fetchRecipeById = async(id) => {
    const res = await fetch(`${BASE}/recipe/${id}`);
    if(!res.ok) throw new Error('Failed to fetch recipe');
    const data = await res.json();
    return data.meals[0];
};
