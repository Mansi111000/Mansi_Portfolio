import { ArrowUp } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Throttle function for better performance
  const throttle = (func, limit) => {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  };

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(
    throttle(() => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show footer when user is near the bottom (within 100px)
      const shouldShow = scrollPosition + windowHeight >= documentHeight - 100;
      setIsVisible(shouldShow);
    }, 100), // Throttle to 100ms for better mobile performance
    []
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <footer 
      className={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-300 transform ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative bg-gradient-mesh overflow-hidden">
      {/* Simplified background elements for mobile performance */}
      <div className="absolute inset-0 bg-gradient-radial from-primary-100/20 to-transparent"></div>
      
      {/* Reduced floating particles for mobile performance */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary-300/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: '4s', // Faster animation for better performance
            }}
          />
        ))}
      </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="text-center space-y-2 sm:space-y-3">
          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
              className="inline-flex items-center space-x-2 px-4 sm:px-6 py-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 hover:scale-105 hover:shadow-lg text-primary-600 font-medium text-sm sm:text-base"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Copyright */}
            <div className="text-secondary-600 text-xs sm:text-sm">
            <p>© {new Date().getFullYear()} Mansi Thakkar. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 