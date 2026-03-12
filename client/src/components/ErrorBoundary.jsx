import { Component } from 'react';

export default class ErrorBoundary extends Component {
    constructor(props){
        super(props);
        this.state = { hasError: false};
    }

    static getDerivedStateFromError(){
        return { hasError: true};
    }

    componentDidCatch(error, info){
        console.error('ErrorBoundary caught: ', error, info);
    }

    render(){
        if(this.state.hasError){
            return(
                <div className = 'min-h-screen w-full flex items-center justify-center'
                    style={{backgroundColor: '#FFEFC0'}}
                >
                    <div className = 'text-center px-6'>
                        <p className = 'text-6xl mb-4'>🍳</p>
                        <h2 className = 'text-2xl font-bold mb-2' style={{color:'#000000'}}>
                            Something Went Wrong...
                        </h2>
                        <p className = 'mb-6' style = {{color: '#000000'}}>
                            We dropped the recipe. Try refreshing the page.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className = 'px-6 py-3 rounded-xl font-bold transition-colors transition-all duration-100 ease-in-out transform active:translate-y-px'
                            style={{backgroundColor: '#FFE6C2', color: '#1e1208'}}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F0BE77'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FFE6C2'}
                        >
                            Refresh Page
                        </button>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}