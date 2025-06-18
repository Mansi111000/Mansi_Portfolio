import { useState, useEffect, useCallback } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const SectionNavigation = ({ currentSection, onNavigate }) => {
  const [showUpArrow, setShowUpArrow] = useState(false);
  const [showDownArrow, setShowDownArrow] = useState(true);

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
      
      // Show up arrow when not at the top
      setShowUpArrow(scrollPosition > 100);
      
      // Show down arrow when not at the bottom
      setShowDownArrow(scrollPosition + windowHeight < documentHeight - 100);
    }, 150), // Throttle to 150ms for better mobile performance
    []
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleUpClick = useCallback(() => {
    const sections = ['home', 'about', 'projects', 'experience', 'skills', 'contact'];
    const currentIndex = sections.indexOf(currentSection);
    
    if (currentIndex > 0) {
      onNavigate(sections[currentIndex - 1]);
    } else {
      onNavigate('home');
    }
  }, [currentSection, onNavigate]);

  const handleDownClick = useCallback(() => {
    const sections = ['home', 'about', 'projects', 'experience', 'skills', 'contact'];
    const currentIndex = sections.indexOf(currentSection);
    
    if (currentIndex < sections.length - 1) {
      onNavigate(sections[currentIndex + 1]);
    } else {
      onNavigate('contact');
    }
  }, [currentSection, onNavigate]);

  return (
    <div className="fixed right-2 sm:right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-2 sm:gap-4 z-50">
      {showUpArrow && (
        <button
          onClick={handleUpClick}
          className="p-2 sm:p-3 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300 hover:scale-110 hover:shadow-lg group"
        >
          <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 text-primary-600 group-hover:text-primary-700" />
        </button>
      )}
      {showDownArrow && (
        <button
          onClick={handleDownClick}
          className="p-2 sm:p-3 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300 hover:scale-110 hover:shadow-lg group"
        >
          <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 text-primary-600 group-hover:text-primary-700" />
        </button>
      )}
    </div>
  );
};

export default SectionNavigation; 