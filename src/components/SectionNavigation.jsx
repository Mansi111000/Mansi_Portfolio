import { ChevronUp, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

const SectionNavigation = ({ currentSection, onNavigate }) => {
  const sections = ['home', 'about', 'projects', 'experience', 'skills', 'contact'];
  const currentIndex = sections.indexOf(currentSection);
  const [showUpArrow, setShowUpArrow] = useState(true);

  // Add scroll position check
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Only show up arrow if we're not in home section AND we've scrolled down
      setShowUpArrow(currentSection !== 'home' && scrollPosition > 20);
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentSection]); // Add currentSection to dependencies

  const handleUpClick = () => {
    if (currentSection === 'about') {
      // Special handling for going from about to home
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      onNavigate('home');
      // Force hide up arrow after clicking
      setTimeout(() => {
        setShowUpArrow(false);
      }, 100);
    } else if (currentIndex > 0) {
      onNavigate(sections[currentIndex - 1]);
    }
  };

  const handleDownClick = () => {
    if (currentIndex < sections.length - 1) {
      onNavigate(sections[currentIndex + 1]);
    }
  };

  // Determine which arrows to show
  const showDownArrow = currentSection !== 'contact';

  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 z-50">
      {showUpArrow && (
        <button
          onClick={handleUpClick}
          className="p-3 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300 hover:scale-110 hover:shadow-lg group"
        >
          <ChevronUp className="w-4 h-4 md:w-6 md:h-6 text-primary-600 group-hover:text-primary-700" />
        </button>
      )}
      {showDownArrow && (
        <button
          onClick={handleDownClick}
          className="p-3 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300 hover:scale-110 hover:shadow-lg group"
        >
          <ChevronDown className="w-4 h-4 md:w-6 md:h-6 text-primary-600 group-hover:text-primary-700" />
        </button>
      )}
    </div>
  );
};

export default SectionNavigation; 