import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';

const Footer = ({ isLoading }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const contactSection = document.getElementById('contact');
      if (!contactSection) return;

      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const { offsetTop, offsetHeight } = contactSection;
      const bottomThreshold = offsetTop + offsetHeight - windowHeight;
      
      // Show footer when within 200px of contact section bottom
      if (scrollPosition >= bottomThreshold - 200 && scrollPosition <= bottomThreshold + 100) {
        setIsVisible(true);
      } else if (!isHovering) {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHovering]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (isLoading) {
    return null;
  }

  return (
    <footer 
      className={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-300 transform ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative bg-gradient-mesh animate-gradient-xy overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-radial from-primary-100/30 to-transparent animate-pulse-slow"></div>
      <div className="absolute inset-0 bg-gradient-conic from-primary-200/20 via-transparent to-accent-200/20 animate-gradient-xy"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary-300/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-center space-y-3">
          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
              className="inline-flex items-center space-x-2 px-6 py-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 hover:scale-105 hover:shadow-lg text-primary-600 font-medium"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-5 h-5" />
          </button>

          {/* Social Media Links */}
          {/* Removed social media links as requested */}

          {/* Copyright */}
            <div className="text-secondary-600 text-sm">
            <p>© {new Date().getFullYear()} Mansi Thakkar. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 