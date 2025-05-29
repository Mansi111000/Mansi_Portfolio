import React, { useState, useEffect, useRef } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef(null);

  // Update cursor position on mouse move
  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      console.log(`Mouse position: x=${e.clientX}, y=${e.clientY}`);

      // Add a sparkle to the trail
      setTrail(currentTrail => [
        ...currentTrail,
        {
          id: Date.now() + Math.random(), // Unique ID
          x: e.clientX + (Math.random() - 0.5) * 5, // Add slight random offset
          y: e.clientY + (Math.random() - 0.5) * 5,
          size: Math.random() * 6 + 2, // Random size between 2px and 8px
          duration: Math.random() * 0.5 + 0.3, // Random duration between 0.3s and 0.8s
        }
      ]);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Remove old sparkles from the trail
  useEffect(() => {
    if (trail.length > 0) {
      const timeout = setTimeout(() => {
        setTrail(currentTrail => currentTrail.slice(1));
      }, trail[0].duration * 1000); // Remove after its animation duration

      return () => clearTimeout(timeout);
    }
  }, [trail]);

  // Check for hoverable elements
  useEffect(() => {
    const checkHover = (e) => {
      const target = e.target;
      const isClickable = target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('[onClick], [href]'); // Add other selectors for clickable elements if needed
      setIsHovering(isClickable);
    };

    window.addEventListener('mouseover', checkHover);
    window.addEventListener('mouseout', checkHover); // Also check on mouseout

    return () => {
      window.removeEventListener('mouseover', checkHover);
      window.removeEventListener('mouseout', checkHover);
    };
  }, []);


  // Hide default cursor and apply global cursor styles
  useEffect(() => {
    document.body.style.cursor = 'none'; // Hide default cursor

    // Add global styles for hover effect on other elements
    const style = document.createElement('style');
    style.innerHTML = `
      a, button, [onClick], [href] {
          cursor: none !important; /* Hide default cursor on interactive elements */
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.body.style.cursor = 'auto'; // Restore default cursor on unmount
      document.head.removeChild(style);
    };
  }, []);


  return (
    <>
      {/* Main Cursor Particle - Styled as a glowing diamond/spark */}
      <div
        ref={cursorRef}
        className={`fixed rounded-sm pointer-events-none z-50 transition-transform ease-out ${isHovering ? 'scale-120' : 'scale-100'}`}
        style={{
          top: `${position.y}px`,
          left: `${position.x}px`,
          // Transform to center, scale on hover, and rotate 45deg (diamond shape)
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.2 : 1}) rotate(45deg)`,
          // Adjusted styles for a glowing diamond/spark
          width: '14px', // Square shape
          height: '14px', // Square shape
          background: 'linear-gradient(45deg, rgba(99,102,241,0.7) 0%, rgba(168,85,247,0.7) 100%)', // Gradient for diamond
          boxShadow: '0 0 10px 3px rgba(99,102,241,0.5), 0 0 20px 8px rgba(168,85,247,0.3)', // Soft glow effect
          transition: 'transform 0.3s linear, box-shadow 0.2s ease-in-out', // Increased duration and linear timing function for smoother transform
        }}
      ></div>
      {/* Sparkle Trail */}
      {trail.map(sparkle => (
        <div
          key={sparkle.id}
          className="fixed top-0 left-0 rounded-full pointer-events-none z-50"
          style={{
            transform: `translate(${sparkle.x}px, ${sparkle.y}px)`,
            width: `${sparkle.size * 0.6}px`, // Further smaller sparkles
            height: `${sparkle.size * 0.6}px`, // Further smaller sparkles
            background: 'rgba(255, 255, 255, 0.3)', // Even more transparent white sparkle
            opacity: 0, // Start invisible
            animation: `sparkle-fade ${sparkle.duration}s ease-out forwards`,
          }}
        ></div>
      ))}

      {/* Define sparkle fade animation */}
      <style jsx="true">{`
        @keyframes pulse-soft {
            0%, 100% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.05); opacity: 1; }
        }
        .animate-pulse-soft {
             animation: pulse-soft 1.5s infinite ease-in-out;
        }

        @keyframes sparkle-fade {
          0% { opacity: 0.7; transform: scale(1); }
          100% { opacity: 0; transform: scale(0); }
        }
      `}</style>
    </>
  );
};

export default CustomCursor;