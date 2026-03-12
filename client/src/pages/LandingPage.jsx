import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import FeaturedRecipe from '../components/FeaturedRecipe';
import SearchBar from '../components/SearchBar';
import RecipeGrid from '../components/RecipeGrid';
import { fetchRandomRecipe } from '../services/api';
import { useSearch } from '../context/SearchContext';

export default function LandingPage() {
  const [featured, setFeatured] = useState(null);
  const [featuredLoading, setFeaturedLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const { searchResults, setSearchResults, hasSearched } = useSearch();

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const recipe = await fetchRandomRecipe();
        setFeatured(recipe);
      } catch (err) {
        console.error(err);
      } finally {
        setFeaturedLoading(false);
      }
    };
    loadFeatured();
  }, []);

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: '#FFEFC0' }}>
      <Navbar />

      <main className="w-full min-w-full px-4 sm:px-6 lg:px-10 pt-24 pb-16">

        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight"
            style={{ color: '#1e1208' }}>
            What are we cooking
            <span style={{ color: '#F0BE77' }}> <br></br> this Sunday?</span>
          </h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: '#1e1208' }}>
            Find recipes by dish name or ingredient, then prep for the week ahead.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-14">
          <SearchBar
            onResults={setSearchResults}
            onLoading={setSearchLoading}
          />
        </div>

        {/* Search results */}
        {hasSearched && (
          <section className="w-full mb-16">
            <h2 className="text-xl font-bold mb-6" style={{ color: '#1e1208' }}>
              {searchResults.length > 0
                ? `${searchResults.length} recipe${searchResults.length !== 1 ? 's' : ''} found`
                : 'No results'}
            </h2>
            <RecipeGrid recipes={searchResults} loading={searchLoading} />
          </section>
        )}

        {/* Featured recipe */}
        {!hasSearched && (
          <section>
            <h2 className="text-xl font-bold mb-6" style={{ color: '#1e1208' }}>
              Featured Recipe
            </h2>
            {featuredLoading ? (
              <div className="animate-pulse rounded-2xl h-80" style={{ backgroundColor: '#2e1f0f' }} />
            ) : (
              <FeaturedRecipe recipe={featured} />
            )}
          </section>
        )}
      </main>
    </div>
  );
}