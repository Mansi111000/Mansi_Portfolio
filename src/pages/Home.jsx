import { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ChevronDown, BookOpen, Award, ExternalLink, User, Code2, Library, Brain, Cloud, Palette, Database, BarChart3, GitBranch, Layers } from 'lucide-react';
import SectionNavigation from '../components/SectionNavigation';

const Home = ({ isLoading }) => {
  const [text, setText] = useState('');
  const [currentSection, setCurrentSection] = useState('home');
  
  // State to track visibility of sections for scroll animations
  const [isVisible, setIsVisible] = useState({});

  // Refs for each section
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const experienceRef = useRef(null);
  const skillsRef = useRef(null);
  const contactRef = useRef(null);

  // Map section ids to their refs
  const sectionRefs = {
    home: homeRef,
    about: aboutRef,
    projects: projectsRef,
    experience: experienceRef,
    skills: skillsRef,
    contact: contactRef,
  };

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prevState => ({
            ...prevState,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.2 } // Trigger when 20% of the element is visible
    );

    // Observe each section
    Object.keys(sectionRefs).forEach((sectionId) => {
      if (sectionRefs[sectionId].current) {
        observer.observe(sectionRefs[sectionId].current);
      }
    });

    // Clean up observer on component unmount
    return () => {
      Object.keys(sectionRefs).forEach((sectionId) => {
        if (sectionRefs[sectionId].current) {
          observer.unobserve(sectionRefs[sectionId].current);
        }
      });
    };
  }, []); // Empty dependency array means this effect runs once on mount

  // Set the full text to be typed with correct newlines and formatting
  const fullText = 'print("Hello world 👋, I\'m **Mansi Thakkar** 👩‍💻")\n{\n   //On an Exciting Path Towards AI & ML🚀\n}';

  // Typing animation effect
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50); // Adjusted typing speed

    return () => {
      clearInterval(typingInterval);
    };
  }, [fullText]);

  // Data for Projects Section
  const projects = [
    {
      title: "RevSense – Customer Feedback Analytics & Sentiment Insights Platform",
      description: "Developed RevSense, a comprehensive review analysis platform designed to extract actionable insights from large volumes of customer feedback. The system automates the end-to-end pipeline—from scraping and preprocessing reviews to categorizing them hierarchically, summarizing opinions, and generating data-driven business insights.",
      tech: ["Python", "Flask", "Pandas", "NLP" , "Web-Scrapping","BeautifulSoup","Text Summarization", "Data Analysis" , "LLM"],
      github: "https://github.com/Mansi111000/RevSense",
      imageUrl: "/images/revsense.jpg"
    },
    {
      title: "Sales Insights Dashboard",
      description: "Designed and developed an end-to-end sales analysis and prediction solution for a hardware supplier using Tableau and MySQL. This project simulates a real-world business environment, enabling hands-on experience with data analytics, visualization, and performance tracking. It focuses on uncovering key trends, identifying sales patterns, and supporting data-driven decision-making through dynamic dashboards.",
      tech: ["Tableau", "MySQL"],
      github: "https://github.com/Mansi111000/Tableau_DashBoard",
      imageUrl: "/images/dashboard.png"
    },
    {
      title: "Malware Detection",
      description: "Developed a Machine Learning-based Malware Detection System to identify and classify malicious files with high accuracy. The model utilizes AdaBoost and feature selection techniques like SHAP (SHapley Additive exPlanations) to enhance detection efficiency.",
      tech: ["AdaBoost", "Shap", "Feature Extraction", "LightGBM"],
      github: "https://github.com/Mansi111000/Malware-Detection-using-ML",
      imageUrl:"/images/malware.png"
    },
    {
      title: "Make My Gift",
      description: "Developed Make-My-Gift, a web-based platform that simplifies the gifting process by offering extensive customization options for different functions, festivals, and events. The platform allows users to personalize gifts based on specific themes, occasions, and preferences, ensuring a meaningful and tailored gifting experience.",
      tech: ["Python", "Django", "HTML", "JavaScript","SQLite"],
      github: "https://github.com/Mansi111000/Make-My-Gift",
      imageUrl: "/images/makemygift.png"
    },
    {
      title: "Zero Day Attack Detection",
      description: "Developed an AI-driven Intrusion Detection System (IDS) leveraging Reinforcement Learning to detect zero-day attacks using the CICIDS2017 dataset. The model integrates Isolation Forest and One-Class SVM for anomaly detection and a Deep Q-Network (DQN) to adaptively identify unknown threats.",
      tech: ["SVM", "isolation forest", "Deep Q-Network"],
      github: "https://github.com/Mansi111000/Zero-Day-Attack-Using-RL",
      imageUrl: "/images/zeroday.png"
    },
    {
      title: "EEG-Based-Emotion-Recognition",
      description: "Developed an EEG-based Emotion Recognition System to classify emotional states using brainwave signals. This project leverages Machine Learning models trained on EEG data collected from video stimuli (olfactory-enhanced and traditional).",
      tech: ["Data Preprocessing", "Feature Extraction", "SVM", "K-Nearest Neighbors (KNN)", "Random Forest","Decision Tree"],
      github: "https://github.com/Mansi111000/EEG-Based-Emotion-Recognition",
      imageUrl: "/images/eeg.png"
    }


  ];

  // Data for Education Section
  const education = [
    {
      degree: "Bachelor of Technology in Computer Science",
      institution: "Nirma University",
      period: "2023 - Present",
    },
    {
      degree: "Diploma in Computer Engineering",
      institution: "Gujarat Technological University",
      period: "2020 - 2023",
    },
  ];

  // Data for Experience Section
  const timeline = [
    {
      type: "experience",
      title: "Executive Commitee Member",
      organization: "Computer Society of India,Nirma University",
      period: "2023 - Present",
      description: [
        "Collaborated with industry professionals to provide members with valuable insights and meaningful networking opportunities.",
        "Played an active role in strategic planning and decision-making for events, workshops, and outreach initiatives."
      ],
      logoUrl: '/images/csi.jpg'
    },
    {
      type: "Internship",
      title: "Project Intern",
      organization: "InfoLabz",
      period: "2022-2023",
      description: [
        "Led Make My Gift, an online platform enabling personalized gift hamper creation.",
        "Our intuitive interface allows users to craft bespoke hampers at competitive rates, ensuring premium quality and prompt delivery.",
        "Particularly beneficial for corporate needs, we streamline gifting processes, catering to diverse occasions.",
        "Developed using Python and Django, our platform seamlessly connects customer preferences with top-tier gift selections, enhancing satisfaction and convenience in the online shopping landscape."
      ],
      logoUrl: '/images/infolabz.jpeg'
    }
  ];

  // Data for Skills Section (NEW)
  const skills = [
    {
      category: "Programming Languages",
      items: ["Python", "JavaScript", "C++"]
    },
    {
      category: "Frameworks & Libraries",
      items: ["Django", "Flask", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "TensorFlow", "PyTorch"]
    },
    {
      category: "Machine Learning & AI",
      items: ["Supervised Learning", "Feature Engineering", "Model Tuning & Optimization", "GridSearchCV",
        "Embedding-Based Clustering & Classification", "Web Integration with AI Models", "Object-Oriented Programming in AI Systems", "Spacy", "Sentence-BERT", "Transformers (BERT)", "NLP", "GeminiLLM"]
    },
    {
      category: "Version Control",
      items: ["Git", "GitHub"]
    },
    {
      category: "Cloud & Deployment",
      items: ["AWS EC2", "AWS S3", "AWS Sagemaker", "Vercel"]
    },
    {
      category: "Markup & Styling",
      items: ["HTML", "CSS", "Tailwind CSS"]
    },
    {
      category: "Database Management",
      items: ["SQLite", "Redis"]
    },
    {
      category: "Data Analytics & Visualization",
      items: ["Tableau","Data Visualization"]
    }
  ];

  const scrollToSection = (sectionId) => {
    return new Promise((resolve) => {
      const section = document.getElementById(sectionId);
      if (section) {
        const navbarHeight = 64;
        const sectionTop = sectionId === 'home' ? 0 : section.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: sectionTop,
          behavior: 'smooth'
        });

        // Wait for scroll to complete
        const checkScroll = () => {
          const currentScroll = window.scrollY;
          const targetPosition = sectionId === 'home' ? 0 : section.offsetTop - navbarHeight;
          
          if (Math.abs(currentScroll - targetPosition) < 5) {
            window.removeEventListener('scroll', checkScroll);
            resolve();
          }
        };

        window.addEventListener('scroll', checkScroll);
        
        // Fallback timeout
        setTimeout(() => {
          window.removeEventListener('scroll', checkScroll);
          resolve();
        }, 1000);
      } else {
        resolve();
      }
    });
  };

  const handleSectionNavigate = async (sectionId) => {
    // Temporarily disable section updates
    const sections = ['home', 'about', 'projects', 'experience', 'skills', 'contact'];
    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        element.style.pointerEvents = 'none';
      }
    });

    // Wait for scroll to complete
    await scrollToSection(sectionId);
    
    // Update the active section
    setCurrentSection(sectionId);

    // Re-enable section updates
    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        element.style.pointerEvents = 'auto';
      }
    });
  };

  useEffect(() => {
    const sections = ['home', 'about', 'projects', 'experience', 'skills', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Only update if we're not in the middle of a navigation
      if (document.body.style.pointerEvents !== 'none') {
        // Special handling for home section
        if (scrollPosition < 100) {
          setCurrentSection('home');
          return;
        }

        // Find the current section
        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i];
          const element = document.getElementById(section);
          if (element) {
            const { offsetTop } = element;
            if (scrollPosition >= offsetTop - 100) {
              setCurrentSection(section);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to render text with syntax highlighting
  const renderCodeSnippet = (snippetText) => {
    const lines = snippetText.split('\n');
    return (
      <>
        {lines.map((line, lineIndex) => (
          <span key={lineIndex}>
            {/* Apply highlighting based on line content */}
            {line.includes('print') && (
              <>
                <span className="text-blue-400">print</span>
                <span className="text-white">(</span>
                {/* Handle string content and highlight name */}
                {line.includes('"') && (
                   <span className="text-green-400">
                     {'"'} {/* Opening quote */}
                     {line.substring(line.indexOf('"') + 1, line.lastIndexOf('"')).split('**').map((part, partIndex) => (
                        <span key={partIndex} className={partIndex === 1 ? 'text-purple-400 font-bold' : ''}> {/* Highlight middle part (name) */}
                          {part}
                        </span>
                     ))}
                     {'"'} {/* Closing quote */}
                   </span>
                )}
                <span className="text-white">)</span>
              </>
            )}
            {line.trim() === '{' && <span className="text-yellow-400">{line}</span>}
            {line.trim() === '}' && <span className="text-yellow-400">{line}</span>}
            {line.trim().startsWith('//') && 
              <span className="text-gray-500 text-xl md:text-2xl"> {/* Increased size and color for comment */}
                {'  '}{line.trim()}
              </span>
            }
            {lineIndex < lines.length - 1 && '\n'} {/* Maintain newlines */}
          </span>
        ))}
      </>
    );
  };

  // The loading screen content is handled by App.jsx based on isLoading state
  // This component now only renders its content when isLoading is false

  return (
    <div className="min-h-screen bg-gradient-mesh animate-gradient-xy relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-radial from-primary-100/30 to-transparent animate-pulse-slow"></div>
      <div className="absolute inset-0 bg-gradient-conic from-primary-200/20 via-transparent to-accent-200/20 animate-gradient-xy"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
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

      <SectionNavigation 
        currentSection={currentSection} 
        onNavigate={handleSectionNavigate} 
      />

      {/* Home section content - Removed conditional visibility classes */}
      <main ref={homeRef} className="relative min-h-[80vh] flex flex-col items-center justify-center px-4 py-20 transition-all duration-700 ease-out">
        <div className="max-w-4xl w-full space-y-8 animate-fade-in">
          {/* Profile Section */}
          <div className="text-center space-y-6 animate-slide-up">
            {/* Profile image code */}
            <div className="relative w-56 h-56 mx-auto mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full animate-morph"></div>
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <img
                  src="/images/profile.png"
                  alt="Mansi Thakkar"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/400x400?text=MT';
                  }}
                />
              </div>
              <div className="absolute inset-0 rounded-full border-4 border-white shadow-lg"></div>
            </div>

            {/* Animated Code Snippet Editor */}
            <div className="w-full px-2 sm:px-4 max-w-3xl mx-auto mt-8 p-3 sm:p-6 bg-gray-800 rounded-lg shadow-2xl text-left font-mono text-sm sm:text-xl md:text-2xl overflow-x-auto">
              <pre className="whitespace-pre-wrap break-words">
                <code className="block overflow-x-auto">
                  {/* Render the typing text with improved syntax highlighting */}
                  {renderCodeSnippet(text)}
                  <span className="animate-pulse text-white">|</span>{/* Blinking cursor */}
                </code>
              </pre>
            </div>

            {/* Replace social links with Download CV button */}
            <div className="flex justify-center mt-8">
              <a
                href="https://drive.google.com/file/d/1c92n77UtQnW1LxXKJEfddAIhruGVTwo5/view?usp=sharing" // Replace with your actual Google Drive link
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 ease-out transform rounded-lg shadow-lg bg-gradient-to-r from-primary-600 to-accent-600 hover:scale-105 hover:shadow-xl active:scale-95"
              >
                <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform translate-x-1 translate-y-1 bg-gradient-to-r from-primary-700 to-accent-700 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary-600 to-accent-600 border-2 border-white rounded-lg group-hover:bg-gradient-to-r group-hover:from-primary-700 group-hover:to-accent-700"></span>
                <span className="relative flex items-center space-x-2">
                  <svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  <span>View My CV</span>
                </span>
              </a>
            </div>
          </div>

          {/* Skills Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              {
                title: "Programming",
                description: "Experienced in building data-driven and interactive applications",
                color: "from-primary-400 to-primary-600",
              },
              {
                title: "Data Science",
                description: "Passionate about turning raw data into meaningful insights",
                color: "from-accent-400 to-accent-600",
              },
              {
                title: "AI/ML",
                description: "Building intelligent systems to solve real-world problems",
                color: "from-secondary-400 to-secondary-600",
              },
            ].map((skill, index) => (
              <div
                key={skill.title}
                className="group relative bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-scale-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl"
                     style={{ backgroundImage: `linear-gradient(to right, ${skill.color})` }}></div>
                <h3 className="text-xl font-semibold text-primary-700 mb-2">{skill.title}</h3>
                <p className="text-secondary-600">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* About Section Content - Added ref and conditional classes */}
      <section ref={aboutRef} id="about" className={`relative min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-gradient-mesh overflow-hidden transition-all duration-700 ease-out ${isVisible.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
         {/* Simplified background */}
         <div className="absolute inset-0 bg-gradient-radial from-primary-100/30 to-transparent"></div>
         
         <div className="max-w-4xl w-full space-y-12">
           {/* About Content */}
           <div className="text-center space-y-6">
             <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
               About Me
             </h2>
             <div className="text-lg md:text-xl text-secondary-600 max-w-2xl mx-auto leading-relaxed">
               <p>
                 I'm a B.Tech Computer Science student at Nirma University, passionate about Artificial Intelligence and Machine Learning.  
                 I enjoy exploring how data and algorithms can solve real-world problems in smart, innovative ways.  
                 My interests include machine learning, deep learning, and data science.  
                 I'm always eager to take on new challenges and expand my skill set through hands-on projects.  
                 With a strong foundation in computer science, I aim to contribute to building intelligent, data-driven systems.  
               </p>
             </div>
           </div>

           {/* Education Section */}
           <div className="w-full">
             <h3 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
               Educational Background
             </h3>
             {/* Adjusted grid for exactly two items */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {education.map((edu, index) => (
                 <div
                   key={index}
                   className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                 >
                   <div className="flex items-center mb-3">
                     <h4 className="text-xl font-semibold text-primary-700 flex items-center">
                       {edu.degree} {index === 0 ? '🎓' : '📜'}
                     </h4>
                   </div>
                   <p className="text-lg text-secondary-600 mb-2 font-bold">{edu.institution}</p>
                   <p className="text-base text-secondary-600 font-medium mb-3">{edu.period}</p>
                   {edu.description && <p className="text-secondary-700 text-sm leading-relaxed">{edu.description}</p>}
                 </div>
               ))}
             </div>
           </div>
         </div>
      </section>

      {/* Projects Section Content - Added ref and conditional classes */}
      <section ref={projectsRef} id="projects" className={`relative min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-gradient-mesh overflow-hidden transition-all duration-700 ease-out ${isVisible.projects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
         {/* Simplified background */}
         <div className="absolute inset-0 bg-gradient-radial from-primary-100/30 to-transparent"></div>
         
         <div className="max-w-6xl w-full space-y-8">
           <div className="text-center mb-12">
             <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent break-words">
               Projects
             </h2>
           </div>
           {/* Projects Grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {projects.map((project, index) => (
               <div
                 key={project.title}
                 className={`relative block visible opacity-100 bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all transform hover:scale-105 
                   ${index % 2 === 0 ? 'border-l-4 border-primary-500' : 'border-r-4 border-accent-500'}
                 `}
               >
                 <div className="relative w-full bg-gray-50 flex items-center justify-center p-4">
                   <img 
                     src={project.imageUrl || 'https://via.placeholder.com/600x400?text=Project+Image'} 
                     alt={`${project.title} preview`}
                     className="w-auto h-auto max-w-full max-h-[250px] object-contain"
                     loading="lazy"
                     decoding="async"
                     fetchpriority={index < 2 ? "high" : "low"}
                   />
                 </div>
                 
                 <div className="p-4 sm:p-5 md:p-6 space-y-3">
                   <div className="min-h-[60px]">
                     <h3 className="text-base sm:text-lg md:text-xl font-bold text-primary-700 break-words whitespace-normal leading-tight">{project.title}</h3>
                   </div>
                   <p className="text-sm sm:text-base text-secondary-600 line-clamp-3 sm:line-clamp-4 md:line-clamp-none">{project.description}</p>
                   <div className="flex flex-wrap gap-1.5 sm:gap-2">
                     {project.tech.map((tech) => (
                       <span
                         key={tech}
                         className="bg-primary-100 text-primary-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap"
                       >
                         {tech}
                       </span>
                     ))}
                   </div>
                   <div className="flex space-x-4 pt-1">
                     <a
                       href={project.github}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="flex items-center space-x-2 text-primary-600 hover:text-primary-800 transition-colors"
                     >
                       <Github size={16} className="text-primary-600 sm:w-5 sm:h-5" />
                       <span className="text-sm sm:text-base">Code</span>
                     </a>
                   </div>
                 </div>
               </div>
             ))}
           </div>
         </div>
      </section>

      {/* Experience Section - Added ref and conditional classes */}
      <section ref={experienceRef} id="experience" className={`relative min-h-screen flex flex-col items-center justify-center px-4 py-20 transition-all duration-700 ease-out ${isVisible.experience ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-4xl w-full space-y-8 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent animate-gradient-x pb-2">
            Experience
          </h2>
          {/* Experience Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-1 bg-gradient-to-b from-primary-400 via-accent-400 to-primary-400 hidden md:block z-10"></div>
            {timeline.filter(item => item.type === 'experience' || item.type === 'Internship').map((item, index) => (
              <div key={index} className={`relative flex items-center ${index === 0 ? 'mb-12' : 'mb-12'} 
                ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'} 
                ${index === 0 ? 'animate-slide-up' : index % 2 === 1 ? 'animate-slide-down' : 'animate-fade-in'}
              `}>
                {/* Timeline dot - Hidden on mobile */}
                <div className="absolute left-1/2 transform -translate-x-1/2 z-20 hidden md:block">
                  {/* Increased dot size slightly for better visual connection */}
                  <div className="w-6 h-6 bg-gradient-to-r from-primary-600 to-accent-600 rounded-full border-4 border-white shadow-lg"></div>
                </div>

                {/* Horizontal connecting lines (Restored and adjusted) */}
                {/* Line for left card: Connects from right edge of dot to left edge of card content */}
                {index % 2 === 0 && (
                  <div className="hidden md:block absolute left-[calc(50% + 12px)] top-1/2 w-[60px] h-0.5 bg-gradient-to-r from-primary-400 to-accent-400 transform -translate-y-1/2 z-10"></div>
                )}
                {/* Line for right card: Connects from left edge of dot to right edge of card content */}
                {index % 2 === 1 && (
                  <div className="hidden md:block absolute right-[calc(50% + 12px)] top-1/2 w-[60px] h-0.5 bg-gradient-to-l from-primary-400 to-accent-400 transform -translate-y-1/2 z-10"></div>
                )}

                {/* Card Container */}
                {/* Adjusted padding to align with horizontal lines */}
                <div className={`w-full md:w-6/12 z-10 ${index % 2 === 0 ? 'md:pr-[6px]' : 'md:pl-[6px]'}`}>
                  <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="flex items-center mb-2">
                      {item.logoUrl && (
                        <img 
                          src={item.logoUrl} 
                          alt={`${item.organization} logo`} 
                          className="w-10 h-10 sm:w-12 sm:h-12 object-contain mr-3"
                        />
                      )}
                      {index !== 0 && item.type === 'experience' && <User className="w-5 h-5 text-accent-600 mr-2" />}
                      <span className="text-sm sm:text-base text-secondary-600 font-bold">{item.period}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold mb-1 text-primary-700">{item.title}</h3>
                    <p className="text-base sm:text-lg text-secondary-600 font-bold mb-2">{item.organization}</p>
                    {Array.isArray(item.description) ? (
                      <ul className="text-xs sm:text-sm text-secondary-600 list-disc pl-4 space-y-1">
                        {item.description.map((point, pointIndex) => (
                          point.trim() && <li key={pointIndex}>{point.trim()}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs sm:text-sm text-secondary-600">{item.description}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section (NEW) - Added ref and conditional classes */}
      <section ref={skillsRef} id="skills" className={`relative flex flex-col items-center justify-center px-4 py-16 bg-gradient-shine overflow-hidden transition-all duration-700 ease-out ${isVisible.skills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
         {/* Simplified background */}
         <div className="absolute inset-0 bg-gradient-radial from-primary-200/30 to-transparent"></div>
         
         <div className="max-w-4xl w-full space-y-8">
           <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-secondary-600 to-primary-600 bg-clip-text text-transparent">
             Skills
           </h2>
           {/* Skills Section - Optimized grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
             {/* First column */}
             <div className="space-y-4 sm:space-y-6">
               {skills.slice(0, 3).map((skillCategory) => (
                 <div key={skillCategory.category} className="bg-white/80 backdrop-blur-sm p-3 sm:p-4 rounded-xl shadow-lg">
                   <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-primary-700 flex items-center">
                     {skillCategory.category === 'Programming Languages' && <Code2 className="w-5 h-5 mr-2 text-primary-600" />}
                     {skillCategory.category === 'Frameworks & Libraries' && <Layers className="w-5 h-5 mr-2 text-primary-600" />}
                     {skillCategory.category === 'Machine Learning & AI' && <Brain className="w-5 h-5 mr-2 text-primary-600" />}
                     {skillCategory.category}
                   </h3>
                   <div className="flex flex-wrap gap-2">
                     {skillCategory.items.map((skill) => (
                       <span
                         key={skill}
                         className="bg-accent-100 text-accent-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium shadow-md"
                       >
                         {skill}
                       </span>
                     ))}
                   </div>
                 </div>
               ))}
             </div>
             
             {/* Second column */}
             <div className="space-y-4 sm:space-y-6">
               {skills.slice(3).map((skillCategory) => (
                 <div key={skillCategory.category} className="bg-white/80 backdrop-blur-sm p-3 sm:p-4 rounded-xl shadow-lg">
                   <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-primary-700 flex items-center">
                     {skillCategory.category === 'Version Control' && <GitBranch className="w-5 h-5 mr-2 text-primary-600" />}
                     {skillCategory.category === 'Cloud & Deployment' && <Cloud className="w-5 h-5 mr-2 text-primary-600" />}
                     {skillCategory.category === 'Markup & Styling' && <Palette className="w-5 h-5 mr-2 text-primary-600" />}
                     {skillCategory.category === 'Database Management' && <Database className="w-5 h-5 mr-2 text-primary-600" />}
                     {skillCategory.category === 'Data Analytics & Visualization' && <BarChart3 className="w-5 h-5 mr-2 text-primary-600" />}
                     {skillCategory.category}
                   </h3>
                   <div className="flex flex-wrap gap-2">
                     {skillCategory.items.map((skill) => (
                       <span
                         key={skill}
                         className="bg-accent-100 text-accent-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium shadow-md"
                       >
                         {skill}
                       </span>
                     ))}
                   </div>
                 </div>
               ))}
             </div>
           </div>
         </div>
      </section>

      {/* Contact Section - Added ref and conditional classes */}
      <section ref={contactRef} id="contact" className={`relative min-h-screen flex flex-col items-center justify-center px-4 py-20 pb-32 transition-all duration-700 ease-out ${isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Adjusted main content container for better centering and alignment */}
        <div className="max-w-4xl w-full space-y-8 animate-fade-in text-center"> {/* Added text-center here and kept max-w-4xl for overall width */}
          <h2 className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent animate-gradient-x">
            Get in Touch
          </h2>
        
          {/* Display contact information within a centered max-w-md block for tighter grouping */}
          <div className="max-w-md mx-auto space-y-8"> {/* Kept max-w-md mx-auto for centering this block, removed animate-fade-in as it's on the parent */}
             <div>
               <h3 className="text-2xl font-bold mb-6 text-primary-700">Contact Information</h3> {/* Removed text-center, parent div will handle */}
               <p className="text-secondary-600 mb-6"> {/* Removed text-center, parent div will handle */}
                 Feel free to reach out to me for any opportunities or collaborations. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
               </p>
             </div>

             <div className="space-y-4"> {/* Removed text-center, flex classes handle centering children */}
               <a
                 href="mailto:mansithakkar1123@gmail.com"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="flex items-center justify-center space-x-3 text-primary-600 hover:text-primary-800 transition-colors"
               >
                 <Mail className="w-6 h-6" />
                 <span>mansithakkar1123@gmail.com</span>
               </a>
               <a
                  href="https://github.com/Mansi111000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-3 text-primary-600 hover:text-primary-800 transition-colors"
                >
                  <Github className="w-6 h-6" />
                  <span>github.com/Mansi111000</span>
                </a>
                <a
                  href="https://linkedin.com/in/mansi-thakkar11"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-3 text-primary-600 hover:text-primary-800 transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                  <span>linkedin.com/in/mansi-thakkar11</span>
                </a>
             </div>

             <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
               <h4 className="text-lg font-semibold mb-2 text-primary-700 text-center">Location</h4> {/* Kept text-center for heading */}
               <p className="text-secondary-600 text-center">Ahmedabad, India</p> {/* Added text-center */}
               <p className="text-secondary-600 text-sm mt-1 text-center">Available for remote and on-site work</p> {/* Added text-center */}
             </div>
           </div>

        </div>
      </section>
    </div>
  );
};

export default Home;