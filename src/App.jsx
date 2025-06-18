import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import { handleReducedMotion, lazyLoadImages } from './utils/performance';
// import About from './pages/About'; // Removed
// import Projects from './pages/Projects'; // Removed
// import Experience from './pages/Experience'; // Removed
// import Contact from './pages/Contact'; // Removed

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Handle reduced motion preferences
    handleReducedMotion();
    
    // Initialize lazy loading
    lazyLoadImages();
    
    const appLoadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Reduced timeout for better mobile experience

    return () => clearTimeout(appLoadingTimer);
  }, []);

  return (
    <Router>
      <div className="relative min-h-screen bg-gray-900 text-white">
        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center bg-gradient-mesh z-50">
            <div className="text-center px-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-[0.3em] sm:tracking-[0.5em] text-primary-600">
                <span className="inline-block animate-float" style={{ animationDelay: '0s' }}>M</span>
                <span className="inline-block animate-float" style={{ animationDelay: '0.1s' }}>A</span>
                <span className="inline-block animate-float" style={{ animationDelay: '0.2s' }}>N</span>
                <span className="inline-block animate-float" style={{ animationDelay: '0.3s' }}>S</span>
                <span className="inline-block animate-float" style={{ animationDelay: '0.4s' }}>I</span>
                <span className="inline-block mx-2 sm:mx-4"></span>
                <span className="inline-block animate-float" style={{ animationDelay: '0.5s' }}>T</span>
                <span className="inline-block animate-float" style={{ animationDelay: '0.6s' }}>H</span>
                <span className="inline-block animate-float" style={{ animationDelay: '0.7s' }}>A</span>
                <span className="inline-block animate-float" style={{ animationDelay: '0.8s' }}>K</span>
                <span className="inline-block animate-float" style={{ animationDelay: '0.9s' }}>K</span>
                <span className="inline-block animate-float" style={{ animationDelay: '1.0s' }}>A</span>
                <span className="inline-block animate-float" style={{ animationDelay: '1.1s' }}>R</span>
              </h1>
            </div>
          </div>
        )}
        {!isLoading && <Navbar />}
        {!isLoading && (
          <Routes>
            <Route path="/" element={<Home isLoading={isLoading} />} />
            {/* Removed routes for other pages */}
            {/* <Route path="/about" element={<About />} /> */}
            {/* <Route path="/projects" element={<Projects />} /> */}
            {/* <Route path="/experience" element={<Experience />} /> */}
            {/* <Route path="/contact" element={<Contact />} /> */}
          </Routes>
        )}
        {!isLoading && <Footer />}
      </div>
    </Router>
  );
}

export default App; 