import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import LeftoversPage from './pages/LeftoversPage';
import useScrollToTop from './hooks/useScrollToTop';


export default function App(){
  useScrollToTop();
  return(
    <Routes>
      <Route path = '/' element={<LandingPage />} />
      <Route path = '/recipe/:id' element={<RecipeDetailPage />} />
      <Route path = '/leftovers' element={<LeftoversPage />} />
    </Routes>
  )
}
