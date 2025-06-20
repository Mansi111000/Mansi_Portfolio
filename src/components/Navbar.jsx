import { useState, useEffect, useCallback } from 'react';
import { Github, Linkedin, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

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

  // Memoized scroll handler with throttling
  const handleScroll = useCallback(
    throttle(() => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
      
      const sections = ['home', 'about', 'projects', 'experience', 'skills', 'contact'];

      // Special handling for home section - adjusted threshold for better mobile experience
      if (scrollPosition < 50) {
        setActiveSection('home');
        return;
      }

      // Find the current section using getBoundingClientRect for better performance
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        // Adjusted threshold for better mobile detection
        return rect.top <= 80 && rect.bottom >= 80;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    }, 150), // Increased throttle time for better mobile performance
    []
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleSectionNavigate = useCallback((sectionId) => {
    if (sectionId === 'home') {
      // Special handling for home section with improved scroll behavior
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      // Set active section immediately for better UX
      setActiveSection('home');
      // Force update scroll position after animation
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 500);
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        const navbarHeight = 64;
        const sectionTop = section.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: sectionTop,
          behavior: 'smooth'
        });
        setActiveSection(sectionId);
      }
    }
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-lg transition-all duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo and Navigation Links */}
          <div className="flex items-center space-x-4 sm:space-x-8">
            {/* Logo */}
            <div className="flex items-center">
              <div className="bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <img
                  src="/images/M.png"
                  alt="Mansi Thakkar"
                  className="h-10 w-10 sm:h-12 sm:w-12 object-contain hover:scale-110 transition-transform duration-300"
                  loading="eager"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/48x48?text=MT';
                  }}
                />
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleSectionNavigate(link.id)}
                  className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 hover:text-primary-600 ${
                    activeSection === link.id ? 'text-primary-600' : 'text-secondary-600'
                  }`}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-600 to-accent-600 animate-shimmer"></span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right side - Mobile menu button and social links */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Social Links - Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <a
                href="https://github.com/Mansi111000"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
              >
                <Github className="w-5 h-5 text-primary-600" />
              </a>
              <a
                href="https://linkedin.com/in/mansi-thakkar11"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
              >
                <Linkedin className="w-5 h-5 text-primary-600" />
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md shadow-lg animate-slide-down">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleSectionNavigate(link.id)}
                className={`block w-full text-left px-3 py-2 rounded-md text-sm sm:text-base font-medium transition-all duration-300 ${
                  activeSection === link.id
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-secondary-600 hover:bg-primary-50 hover:text-primary-600'
                }`}
              >
                {link.label}
              </button>
            ))}
            {/* Mobile Social Links */}
            <div className="flex justify-center space-x-4 pt-4 pb-2">
              <a
                href="https://github.com/Mansi111000"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
              >
                <Github className="w-5 h-5 text-primary-600" />
              </a>
              <a
                href="https://linkedin.com/in/mansi-thakkar11"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
              >
                <Linkedin className="w-5 h-5 text-primary-600" />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 