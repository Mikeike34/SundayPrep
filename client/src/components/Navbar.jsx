import { useNavigate, useLocation} from 'react-router-dom';
import {useSearch } from '../context/SearchContext.jsx';

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { clearSearch, groceryList } = useSearch();

    const handleLogoClick = () => {
        clearSearch();
        navigate('/');
    };

    const isActive = (path) => location.pathname === path;

    return(
        <nav className = 'fixed top-0 left-0 right-0 z-50 backdrop-blur-sm shadow-md' style={{ backgroundColor: '#C19A6B' }}>
            <div className = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className = 'flex items-center justify-between h-16'>
                    <button onClick={handleLogoClick} className = 'flex items-center gap-2 group'>
                        <span className = 'text-2xl'>🥗</span>
                        <span className = 'text-xl font-bold tracking-tight transition-colors' style={{ color: '#FFFFFF' }}>
                            SundayPrep
                        </span>
                    </button>
                    <div className = 'flex items-center gap-4'>
                        <button
                            onClick={() => navigate('/grocery-list')}
                            className=" relative flex flex-col items-center px-4 py-2 rounded-full text-sm font-semibold transition-colors shadow-md transition-all duration-100 ease-in-out transform active:translate-y-px"
                            style={{ backgroundColor: '#FFE6C2', color: '#000000' }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F0BE77'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FFE6C2'}
                        >
                            Grocery List
                            {groceryList.length > 0 && (
                                <span className = 'text-xs font-bold leading-none'
                                    style={{color: '#B97836'}}>
                                        {groceryList.length} item{groceryList.length !== 1 ? 's' : ''}
                                </span>
                            )}
                        </button>
                        <button
                            onClick ={() => navigate('/leftovers')}
                            className="px-4 py-2 rounded-full text-sm font-semibold transition-colors shadow-md transition-all duration-100 ease-in-out transform active:translate-y-px"
                            style={{ backgroundColor: '#FFE6C2', color: '#000000' }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F0BE77'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FFE6C2'}
                        >
                            Leftovers
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}