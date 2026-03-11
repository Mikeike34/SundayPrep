import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import LeftoversPage from './pages/LeftoversPage';


export default function App(){
  return(
    <Routes>
      <Route path = '/' element={<LandingPage />} />
      <Route path = '/recipe/:id' element={<RecipeDetailPage />} />
      <route path = '/leftovers' element={<LeftoversPage />} />
    </Routes>
  )
}
