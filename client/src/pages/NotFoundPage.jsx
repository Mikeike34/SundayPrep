import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function NotFoundPage(){
    const navigate = useNavigate();
    return(
        <div className="page-enter min-h-screen w-full" style={{ backgroundColor: '#FFEFC0' }}>
            <Navbar />
            <div className="w-full flex items-center justify-center pt-24 px-4">
                <div className="text-center">
                    <p className="text-8xl font-bold mb-2" style={{ color: '#000000' }}>404</p>
                    <p className="text-6xl mb-4">🥣</p>
                    <h2 className="text-2xl font-bold mb-2" style={{ color: '#000000' }}>
                        Page not found
                    </h2>
                    <p className="mb-8" style={{ color: '#000000' }}>
                        Looks like this recipe got lost in the kitchen.
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-3 rounded-xl font-bold transition-colors transition-all duration-100 ease-in-out transform active:translate-y-px"
                        style={{ backgroundColor: '#FFE6C2', color: '#1e1208' }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F0BE77'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FFE6C2'}
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
}