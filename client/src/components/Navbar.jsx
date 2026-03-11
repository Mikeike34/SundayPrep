import {Link, useNavigate} from 'react-router-dom';
import {useSearch } from '../context/SearchContext.jsx';

export default function Navbar() {
    const navigate = useNavigate();
    const { clearSearch } = useSearch();

    const handleLogoClick = () => {
        clearSearch();
        navigate('/');
    };

    return(
        <nav className = 'fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b' style={{ backgroundColor: 'rgba(30,18,8,0.92)', borderColor: '#B97836' }}>
            <div className = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className = 'flex items-center justify-between h-16'>
                    <button onClick={handleLogoClick} className = 'flex items-center gap-2 group'>
                        <span className = 'text-2xl'>🥗</span>
                        <span className = 'text-xl font-bold tracking-tight transition-colors' style={{ color: '#E6B370' }}>
                            SundayPrep
                        </span>
                    </button>
                    <div className = 'flex items-center gap-4'>
                        <a
                            href="/leftovers"
                            className="px-4 py-2 rounded-full text-sm font-semibold transition-colors"
                            style={{ backgroundColor: '#E6B370', color: '#1e1208' }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#FFCBB2'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#E6B370'}
                        >
                            Leftovers
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    )
}