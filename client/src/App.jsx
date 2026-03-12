import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import LeftoversPage from './pages/LeftoversPage';
import NotFoundPage from './pages/NotFoundPage';
import useScrollToTop from './hooks/useScrollToTop';


export default function App(){
  useScrollToTop();
  return(
    <Routes>
      <Route path = '/' element={<LandingPage />} />
      <Route path = '/recipe/:id' element={<RecipeDetailPage />} />
      <Route path = '/leftovers' element={<LeftoversPage />} />
      <Route path ='*' element={<NotFoundPage />} />
    </Routes>
  )
}
