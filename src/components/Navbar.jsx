import { useState, useEffect } from 'react';
import { Github, Linkedin, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      // Update active section based on scroll position
      const sections = ['home', 'about', 'projects', 'experience', 'skills', 'contact'];
      const scrollPosition = window.scrollY;

      // Special handling for home section
      if (scrollPosition < 100) {
        setActiveSection('home');
        return;
      }

      // Find the current section
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop } = element;
          if (scrollPosition >= offsetTop - 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleSectionNavigate = (sectionId) => {
    if (sectionId === 'home') {
      // Special handling for home section
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      setActiveSection('home');
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
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-lg transition-all duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo and Navigation Links */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <div className="flex items-center">
              <div className="bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <img
                  src="/images/M.png"
                  alt="Mansi Thakkar"
                  className="h-12 w-12 object-contain hover:scale-110 transition-transform duration-300"
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
                  target="_blank"
                  rel="noopener noreferrer"
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
          <div className="flex items-center space-x-4">
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
                <X className="w-6 h-6 text-primary-600" />
              ) : (
                <Menu className="w-6 h-6 text-primary-600" />
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
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                  activeSection === link.id
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-secondary-600 hover:bg-primary-50 hover:text-primary-600'
                }`}
                target="_blank"
                rel="noopener noreferrer"
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