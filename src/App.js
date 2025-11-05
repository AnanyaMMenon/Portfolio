import React, { useState, useEffect, useRef } from 'react';
import emailjs from 'emailjs-com';
import { Github, Linkedin, Mail, Phone, MapPin, ExternalLink, Download, Menu, X, Code, Database, Cloud, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import { Briefcase } from "lucide-react";
import AMLogo from './assets/AM.jpg'; // adjust the path if needed

import 'aos/dist/aos.css';
import './Portfolio.css'; // Import your CSS file

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [emailStatus, setEmailStatus] = useState('');
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [typedName, setTypedName] = useState('');
  const [loadingText, setLoadingText] = useState('');
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [typedTitle, setTypedTitle] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const formRef = useRef();
  const menuRef = useRef(null);
  // toggle for Publications vs Certifications
  const [pubView, setPubView] = useState('publications');

  const [activeExpSection, setActiveExpSection] = useState(null);
  const [activeExperience, setActiveExperience] = useState('');

// Certifications (from LinkedIn)
const certifications = [
  {
    name: "AWS Cloud Technical Essentials",
    issuer: "AWS",
    date: "Oct 2025",
    skills: ["AWS Basics", "Cloud Concepts", "Core Services"],
    link: "https://www.coursera.org/account/accomplishments/verify/W0GJOUUROX4V",
    logo: "https://logos-world.net/wp-content/uploads/2021/08/Amazon-Web-Services-AWS-Logo.png"
  },
  {
    name: "Architecting Solutions on AWS",
    issuer: "Amazon Web Services",
    date: "Oct 2025",
    skills: ["Architecture", "VPC", "High Availability", "Security"],
    link: "https://www.coursera.org/account/accomplishments/certificate/G3JJ9YK4Q605",
    logo: "https://logos-world.net/wp-content/uploads/2021/08/Amazon-Web-Services-AWS-Logo.png"
  },
  {
    name: "Building Data Lakes on AWS",
    issuer: "Amazon Web Services",
    date: "Oct 2025",
    skills: ["S3", "Glue", "Athena", "Lake Formation"],
    link: "https://www.coursera.org/account/accomplishments/verify/JOXRQNEB5VLY",
    logo: "https://logos-world.net/wp-content/uploads/2021/08/Amazon-Web-Services-AWS-Logo.png"
  },
  {
    name: "Microsoft Certified: DevOps Engineer Expert",
    issuer: "Microsoft",
    date: "Dec 2021",
    skills: ["Azure DevOps", "CI/CD", "IaC", "Monitoring"],
    link: "https://www.credly.com/badges/298a0033-cda4-4309-98a0-0760788b54e9/linked_in_profile",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
  },
  {
    name: "Microsoft Certified: Azure Developer Associate",
    issuer: "Microsoft",
    date: "Oct 2021",
    skills: ["AZ-204", "App Service", "Functions", "Key Vault"],
    link: "https://www.credly.com/badges/b9862198-b3d0-4bf3-9a19-2733a0faea74/linked_in_profile",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
  },
  {
    name: "Microsoft Certified: Azure Fundamentals",
    issuer: "Microsoft",
    date: "Sep 2021",
    skills: ["Cloud Concepts", "Core Azure Services", "Security"],
    link: "https://www.credly.com/badges/391a1566-1e15-4389-ab2c-04cc2bebb16c/linked_in_profile",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
  }
];

  const titles = [
    'Software Engineer',
    'Full Stack Developer',
    'Cloud Developer',
    'Mobile App Developer'
  ];

  // Set zoom to 100% on page load
  useEffect(() => {
    document.body.style.zoom = '100%';
    // For Firefox
    document.body.style.transform = 'scale(1)';
    document.body.style.transformOrigin = 'top left';
  }, []);

  // Initialize AOS (Animate On Scroll) library
  useEffect(() => {
    if (!loading) {
      // Reinitialize AOS after loading completes
      AOS.refresh();
    } else {
      AOS.init({ duration: 800, once: true, offset: 80 });
    }
  }, [loading]);

  // Make sections visible when loading completes
  useEffect(() => {
    if (!loading) {
      // Set all sections to visible initially when loading completes
      const allSections = ['home', 'about', 'experience', 'skills', 'projects', 'publications', 'education', 'contact'];
      setVisibleSections(new Set(allSections));
    }
  }, [loading]);

  // Intersection Observer for section animations
  useEffect(() => {
    // Don't set up observer until loading is complete
    if (loading) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setVisibleSections(prev => new Set([...prev, sectionId]));
        }
      });
    }, observerOptions);

    // Small delay to ensure DOM is ready
    setTimeout(() => {
      const sections = ['home', 'about', 'experience', 'skills', 'projects', 'publications', 'education', 'contact'];
      sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          observer.observe(element);
          // Also mark as visible immediately if already in viewport
          const rect = element.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            setVisibleSections(prev => new Set([...prev, sectionId]));
          }
        }
      });
    }, 100);

    return () => observer.disconnect();
  }, [loading]);

  // Loading screen typewriter effect
  useEffect(() => {
const loadingMessage = [
  "Hi, I am Ananya.",
  "I build scalable web applications.",
  "Check out my Portfolio <3"
].join("\n");    let i = 0;
    if (loading) {
      const typing = setInterval(() => {
        if (i < loadingMessage.length) {
          setLoadingText(loadingMessage.slice(0, i + 1));
          i++;
        } else {
          clearInterval(typing);
          // Wait a bit after typing completes before showing portfolio
          setTimeout(() => setLoading(false), 500);
        }
      }, 50); // Typing speed - adjust as needed
      return () => clearInterval(typing);
    }
  }, [loading]);

  // Typewriter effect for rotating titles
  useEffect(() => {
    if (loading) return; // Don't start until loading is done

    const currentTitle = titles[titleIndex];
    const typingSpeed = isDeleting ? 50 : 50;
    const pauseTime = isDeleting ? 50 : 1000;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        if (typedTitle.length < currentTitle.length) {
          setTypedTitle(currentTitle.slice(0, typedTitle.length + 1));
        } else {
          // Finished typing, pause then start deleting
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        // Deleting backward
        if (typedTitle.length > 0) {
          setTypedTitle(currentTitle.slice(0, typedTitle.length - 1));
        } else {
          // Finished deleting, move to next title
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % titles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [typedTitle, isDeleting, titleIndex, titles, loading]);

  // Scroll spy: highlight nav link as section is in view
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'skills', 'projects', 'publications', 'education', 'contact'];
      const scrollPosition = window.scrollY + 120; // Offset for navbar height

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    console.log('Scrolling to section:', sectionId); // Debug log
    const element = document.getElementById(sectionId);
    console.log('Element found:', element); // Debug log
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    } else {
      console.error('Section not found:', sectionId);
    }
    setIsMenuOpen(false);
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setEmailStatus(''); // Reset status

    emailjs.sendForm(
      'service_t7am8qo',    // Replace with your EmailJS service ID
      'template_p6nhyft',   // Replace with your EmailJS template ID
      formRef.current,
      'tZ1u72LpykRW7FiZT'     // Replace with your EmailJS public key
    )
    .then(
      (result) => {
        setEmailStatus('Message sent successfully!');
        formRef.current.reset();
        setMessage(""); // Clear the message textarea
      },
      (error) => {
        setEmailStatus('Failed to send message. Please try again.');
      }
    );
  };

  const skills = {
    languages: [
      'C#',
      'C/C++',
      'Java',
      'Python',
      'JavaScript',
      'TypeScript',
      'SQL',
      'Dart',
      'HTML & CSS'
    ],
    frameworks: [
      'ASP.NET MVC',
      'ASP.NET Web API',
      'Entity Framework Core',
      'Flask',
      'Angular',
      'React',
      'Flutter',
      'jQuery',
      'Bootstrap',
      'Node.js',
      'Express.js',
      'Tailwind CSS',
    ],
    tools: [
      'Microsoft Azure',
      'Git & GitHub',
      'GitLab CI/CD',
      'Docker',
      'Postman',
      'Visual Studio & VS Code',
      'ServiceNow',
      'Azure DevOps Pipelines',
      'SSMS',
    ]
  };

  // Experience data (responsive logo paths, mobile-friendly)
  const experiences = [
    {
      title: 'Software Engineer Intern',
      company: 'CDK Global',
      // Use relative path for logo, ensure image is in public folder for React
      logo: require('./assets/cdk.png'),
      location: 'Chicago, IL',
      period: 'June 2024 – May 2025',
      achievements: [
        "Led refactoring of 15+ legacy NuGet dependencies and developed async C# event-driven features, restoring 5 critical CRM systems during CDK's cyberattack recovery with 100% test coverage and zero production incidents",
        "Created Python automation scripts utilizing pandas and asyncio that reduced data validation and log processing time by 40%, significantly improving debugging efficiency and real-time monitoring of CRM system health",
        "Built a reusable React-based redirect warning dialog with CDK's internal UI/UX library to improve external link safety in the CRM email client, enhancing user security and reducing phishing incidents by 25%"
      ],
      skills: [
        "C#", "React", "AsyncAPI", "Python", "pandas", "asyncio", "MSTest", "Dependency Injection", "NuGet", "UI/UX"
      ]
    },
    {
      title: 'Graduate Student Assistant (CPS Testing Examiner)',
      company: 'Chicago Public Schools (CPS)',
      logo: require('./assets/cps.png'),
      location: 'Chicago, IL',
      period: 'Jan 2024 – May 2025',
      achievements: [
        "Streamlined digital record management by ensuring 100% accuracy in updating test statuses for 50+ students within a large-scale online platform, applying validation checks comparable to software testing and debugging",
        "Designed and implemented a structured inventory tracking system with weekly validation logic while overseeing exam sessions for 50+ students, ensuring smooth operations and process reliability"
      ],
      skills: [
        "Data Management", "Quality Assurance", "Process Automation", "System Validation"
      ]
    },
    {
      title: 'Cloud Engineer | Graduate Engineer Trainee',
      company: 'LTIMindtree (Chevron)',
      logo: require('./assets/lti.png'),
      location: 'Bangalore, IN',
      period: 'June 2021 – July 2023',
      achievements: [
        "Developed and deployed 20+ web applications for Client Chevron using Azure PaaS Services, Docker, Kubernetes, and Python while maintaining application servers, databases, and other resources",
        "Investigated vendor-reported issues and designed an ASP.NET application to automate weekly data loads, increasing team performance by 40% and saving 40+ hours of manual work",
        "Led a team of 5 to develop an ASP.NET and Angular web application with CRUD operations and REST APIs for an in-house bus reservation system, improving ticketing efficiency and customer satisfaction by 20%"
      ],
      skills: [
        "Azure", "ASP.NET", "C#", "Docker", "Kubernetes", "Python", "Angular", "REST API", "Team Leadership"
      ]
    },
    {
      title: 'Software Engineer Intern',
      company: 'DailyNinja',
      logo: require('./assets/dn.jpeg'),
      location: 'Bangalore, IN',
      period: 'June 2019 – July 2019',
      achievements: [
        "Engineered a scalable data pipeline in Python with modular components for acquisition, transformation, and validation of large datasets, improving system accuracy and reliability by 35%",
        "Developed and deployed Python automation scripts with reusable functions to streamline data ingestion workflows, reducing manual effort by 25% and increasing overall team throughput"
      ],
      skills: [
        "Python", "Data Pipeline", "Automation", "Data Engineering", "ETL"
      ]
    }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isMenuOpen) return;
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // Loading Screen
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="loading-gif-container">
            <img 
              src={require('./assets/ab5rsx.gif')} 
              alt="Loading animation" 
              className="loading-gif"
            />
          </div>
          <div className="loading-text">
            <p className="typewriter-text">
              {loadingText}
              <span className="typewriter-cursor">|</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="portfolio-container min-h-screen bg-gradient-to-br from-purple-900 to-purple-700 px-2 sm:px-4">
      {/* Sticky Top Navigation Bar */}
      <nav
        className="fixed top-0 left-0 w-full border-b border-purple-700 shadow-lg"
        style={{
          background: 'rgba(24, 18, 43, 0.98)',
          minHeight: '64px',
          boxShadow: '0 2px 16px 0 rgba(168,85,247,0.10)',
          zIndex: 99999,
          pointerEvents: 'auto'
        }}
      >

<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
  <div className="flex items-center">
    <img
      src={AMLogo}
      alt="Ananya Menon Logo"
      className="h-10 w-10 rounded-full object-cover" // adjust height/width as needed
    />
  </div>


          <div className="hidden md:flex gap-8">
            {['home', 'about', 'experience', 'skills', 'projects', 'publications', 'education', 'contact'].map((section) => (
              <button
                key={section}
                onClick={(e) => {
                  console.log('CLICKED:', section);
                  scrollToSection(section);
                }}
                className={`uppercase tracking-wide px-3 py-1 rounded transition-colors duration-200 font-medium ${
                  activeSection === section
                    ? 'bg-purple-700 text-white shadow-md'
                    : 'text-white/80 hover:bg-purple-900 hover:text-white'
                }`}
                style={{
                  border: 'none',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  pointerEvents: 'auto',
                  zIndex: 100000
                }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden relative">
            <button
              onClick={() => {
                console.log('Menu toggle clicked');
                setIsMenuOpen(!isMenuOpen);
              }}
              className="text-white p-2 focus:outline-none"
              aria-label="Open navigation menu"
              style={{ zIndex: 100000, pointerEvents: 'auto' }}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
            {/* Dropdown menu */}
            {isMenuOpen && (
              <div
                ref={menuRef}
                className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[#18122b] ring-1 ring-black ring-opacity-5"
                style={{
                  background: 'rgba(24,18,43,0.98)',
                  border: '1px solid rgba(168,85,247,0.25)',
                  zIndex: 100001
                }}
              >
                <div className="py-2">
                  {['Home', 'About', 'Experience', 'Skills', 'Projects', 'Publications', 'Education', 'Contact'].map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        console.log('Mobile menu clicked:', item);
                        scrollToSection(item.toLowerCase());
                        setIsMenuOpen(false);
                      }}
                      className={`block w-full text-left px-6 py-3 rounded text-white/90 hover:bg-purple-800 transition-colors ${
                        activeSection === item.toLowerCase() ? 'bg-purple-900 text-purple-300' : ''
                      }`}
                      style={{ fontSize: "1.1rem", cursor: 'pointer' }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section" style={{ minHeight: '90vh', paddingTop: '8rem', paddingBottom: '6rem' }}>
        <div className="hero-content" style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <motion.div 
            className="hero-avatar"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src={require('./assets/image.jpg')}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '50%',
              }}
            />
          </motion.div>
          <motion.h1 
            className="hero-name" 
            style={{ fontSize: '5rem', marginBottom: '1rem' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Ananya <span className="hero-name-highlight">Menon</span>
          </motion.h1>
          <motion.p 
            className="hero-title" 
            style={{ fontSize: '2rem', marginBottom: '1.5rem', minHeight: '3rem' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <span className="typewriter-text">{typedTitle}</span>
            <span className="typewriter-cursor">|</span>
          </motion.p>
          <motion.p 
            className="hero-description" 
            style={{ fontSize: '1.5rem', marginBottom: '2.5rem' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Full-stack developer specializing in .NET and Azure, with a Master's degree from Illinois Tech.
          </motion.p>
          
          <motion.div 
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.a
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
              href="#contact-form"
            >
              <Mail size={20} />
              Get In Touch
            </motion.a>
            <motion.a
              href="/Portfolio/Resume.pdf"
              className="btn-primary ml-4 flex items-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={20} />
              Resume
            </motion.a>
          </motion.div>

          <motion.div 
            className="social-links"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.a 
              href="https://linkedin.com/in/ananya-m-menon" 
              className="social-link" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin size={30} />
            </motion.a>
            <motion.a 
              href="https://github.com/AnanyaMMenon" 
              className="social-link" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github size={30} />
            </motion.a>
            <motion.a 
              href="mailto:ananyammenon@gmail.com" 
              className="social-link" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Mail size={30} />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <motion.section
        id="about"
        className={`section ${visibleSections.has('about') ? 'section-visible' : 'section-hidden'}`}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <h2 className="section-title" data-aos="fade-down">About Me</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-light mb-6">
              I'm a full-stack developer with 3+ years of professional experience at LTIMindtree (Chevron), building scalable apps using .NET and Azure. During my Master's in Computer Science at Illinois Tech, I interned at CDK Global, where I honed my skills working on real-world projects.<br /><br />
              Powered by caffeine and questionable Wi-Fi.<br /><br />
              If it scales and doesn't crash, that's a win.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-purple">
                <MapPin size={20} />
                <span>Chicago, IL</span>
              </div>
              <div className="flex items-center gap-2 text-purple">
                <Phone size={20} />
                <span>872-294-7498</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <motion.div 
              className="glass-card" 
              data-aos="zoom-in" 
              whileHover={{ scale: 1.05, y: -5 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Code className="text-purple mb-4" size={32} />
              <h3 className="text-white font-semibold mb-2">Full-Stack Development</h3>
              <p className="text-muted text-sm">Expert in modern web technologies and frameworks</p>
            </motion.div>
            <motion.div 
              className="glass-card"
              whileHover={{ scale: 1.05, y: -5 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Cloud className="text-purple mb-4" size={32} />
              <h3 className="text-white font-semibold mb-2">Cloud Engineering</h3>
              <p className="text-muted text-sm">Specialized in Microsoft Azure and DevOps</p>
            </motion.div>
            <motion.div 
              className="glass-card"
              whileHover={{ scale: 1.05, y: -5 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Database className="text-purple mb-4" size={32} />
              <h3 className="text-white font-semibold mb-2">Data Engineering</h3>
              <p className="text-muted text-sm">Building efficient data pipelines and analytics</p>
            </motion.div>
            <motion.div 
              className="glass-card"
              whileHover={{ scale: 1.05, y: -5 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Award className="text-purple mb-4" size={32} />
              <h3 className="text-white font-semibold mb-2">Certified Professional</h3>
              <p className="text-muted text-sm">Multiple Microsoft Azure certifications</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Experience Section */}
      <section
        id="experience"
        className={`section bg-black/20 ${
          visibleSections.has('experience') ? 'section-visible' : 'section-hidden'
        } px-4 sm:px-6`}
      >
        <div className="max-w-5xl mx-auto w-full">
          <motion.h2 
            className="text-4xl font-bold text-white mb-12 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            data-aos="fade-down"
          >
            Experience
          </motion.h2>

          <div className="flex flex-col gap-6">
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                className="experience-card-wrapper"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <button
                  onClick={() =>
                    setActiveExperience(activeExperience === exp.company ? '' : exp.company)
                  }
                  className="experience-header"
                >
                  {/* Left: Company Logo + Role */}
                  <div className="title">
                    <div className="company-logo-container">
                      {exp.logo ? (
                        <img
                          src={exp.logo}
                          alt={`${exp.company} logo`}
                          className="company-logo"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement.innerHTML =
                              `<div class="company-logo-fallback">${exp.company?.[0] ?? ''}</div>`;
                          }}
                        />
                      ) : (
                        <div className="company-logo-fallback">{exp.company?.[0] ?? ''}</div>
                      )}
                    </div>
                    <div>
                      <h3>{exp.company}</h3>
                      <p>{exp.title}</p>
                    </div>
                  </div>

                  {/* Right: Period + Location */}
                  <div className="flex flex-col items-end">
                    <p className="period">{exp.period}</p>
                    <p className="location">{exp.location}</p>
                  </div>
                </button>

                {/* Expandable Card */}
                {activeExperience === exp.company && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="overflow-hidden experience-details"
                  >
                    <div className="glass-card">
                      <ul className="list-disc list-inside space-y-2 leading-relaxed">
                        {exp.achievements.map((ach, i) => (
                          <li key={i}>{ach}</li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2 mt-5 skills">
                        {exp.skills.map((s, i) => (
                          <span key={i}>{s}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`section ${visibleSections.has('skills') ? 'section-visible' : 'section-hidden'} px-0 sm:px-2`}>
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          data-aos="fade-down"
        >
          Technical Skills
        </motion.h2>
        <div className="glass-card mb-8">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-4">🧠 Programming Languages</h3>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {skills.languages.map((skill, index) => (
              <motion.span
                key={index}
                className="bg-purple-800/80 text-purple-100 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-sm sm:text-base font-semibold shadow-md whitespace-nowrap skill-badge"
                style={{
                  letterSpacing: '0.01em',
                  display: 'inline-block',
                  minWidth: '80px',
                  textAlign: 'center',
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.1, y: -3 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
        <div className="glass-card mb-8">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-4">🧰 Frameworks & Libraries</h3>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {skills.frameworks.map((framework, index) => (
              <motion.span
                key={index}
                className="bg-purple-800/80 text-purple-100 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-sm sm:text-base font-semibold shadow-md whitespace-nowrap skill-badge"
                style={{
                  letterSpacing: '0.01em',
                  display: 'inline-block',
                  minWidth: '80px',
                  textAlign: 'center',
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.1, y: -3 }}
              >
                {framework}
              </motion.span>
            ))}
          </div>
        </div>
        <div className="glass-card mb-8">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-4">🔧 Developer Tools & Platforms</h3>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {skills.tools.map((tool, index) => (
              <motion.span
                key={index}
                className="bg-purple-800/80 text-purple-100 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-sm sm:text-base font-semibold shadow-md whitespace-nowrap skill-badge"
                style={{
                  letterSpacing: '0.01em',
                  display: 'inline-block',
                  minWidth: '80px',
                  textAlign: 'center',
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.1, y: -3 }}
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Publications / Certifications Section */}
      <section
        id="publications"
        className={`section ${visibleSections.has('publications') ? 'section-visible' : 'section-hidden'} px-0 sm:px-2`}
      >
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          data-aos="fade-down"
        >
          {pubView === 'publications' ? 'Publications' : 'Certifications'}
        </motion.h2>

        {/* Toggle */}
<div className="max-w-6xl mx-auto w-full mb-8 flex items-center justify-center gap-3" role="tablist" aria-label="Publications and Certifications">
  <button
    className={`${pubView === 'publications' ? 'btn-primary' : 'btn-secondary opacity-60'}`}
    onClick={() => setPubView('publications')}
    type="button"
    role="tab"
    aria-selected={pubView === 'publications'}
    aria-controls="pubs-panel"
    style={{ padding: '0.5rem 1rem', borderRadius: '999px' }}
  >
    Publications
  </button>

  <button
    className={`${pubView === 'certifications' ? 'btn-primary' : 'btn-secondary opacity-60'}`}
    onClick={() => setPubView('certifications')}
    type="button"
    role="tab"
    aria-selected={pubView === 'certifications'}
    aria-controls="certs-panel"
    style={{ padding: '0.5rem 1rem', borderRadius: '999px' }}
  >
    Certifications
  </button>
</div>


        <div className="max-w-6xl mx-auto w-full">
          {pubView === 'publications' ? (
            // ===== Publications View =====
            <div className="space-y-8">
              <div className="glass-card w-full">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Flask Based Web App on Diabetes Prediction
                </h3>
                <p className="text-light mb-4">
                  Developed a comparative study of different classification algorithms on the Diabetes
                  Dataset and built a Flask-based web app deployed on Heroku. Demonstrated that random
                  forests provide better accuracy (81.17%).
                </p>
                <div className="flex flex-wrap gap-3 mb-4">
                  {['Python', 'Flask', 'Machine Learning', 'Random Forest', 'Heroku'].map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-purple-800/80 text-purple-100 px-5 py-2 rounded-full text-base font-semibold shadow-md"
                      style={{ fontSize: '1.05rem', letterSpacing: '0.01em', display: 'inline-block' }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <a
                  href="https://link.springer.com/epdf/10.1007/978-981-16-6407-6_67?sharing_token=DwUKby1AiSeesSk0SQven_e4RwlQNchNByi7wbcMAY6qyTQEIZy7YhTdTpcA7llm7CLJWtfI5qeMB_dGoJJDqoqzMrQYZvUHLrkkcy3f-H2gIkfno4L2Az_ix1u_lkSzkRgwBjIcnVSQKC0reuL6ivfJ9tCgH5xqOS-6ZoHY_Bk%3D"
                  className="inline-flex items-center gap-2 text-white hover:text-purple-300 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={16} />
                  View Publication
                </a>
              </div>
            </div>
          ) : (
            // ===== Certifications View =====
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((c, i) => (
                <motion.div 
                  key={i} 
                  className="glass-card w-full items-start"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                >
                  {/* Logo at the top */}
                  {c.logo && (
                    <div className="mb-4 flex justify-center items-center">
                      <img 
                        src={c.logo} 
                        alt={`${c.issuer} logo`}
                        className="certification-logo"
                        style={{
                          height: '50px',
                          width: 'auto',
                          objectFit: 'contain',
                          maxWidth: '150px',
                          minHeight: '40px'
                        }}
                        onError={(e) => {
                          console.error('Logo failed to load:', c.logo);
                          e.target.style.display = 'none';
                          const fallback = document.createElement('div');
                          fallback.className = 'certification-logo-fallback';
                          fallback.textContent = c.issuer.includes('AWS') ? 'AWS' : 'MS';
                          fallback.style.cssText = 'height: 50px; width: 50px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.1); border-radius: 8px; color: white; font-weight: bold;';
                          e.target.parentElement.appendChild(fallback);
                        }}
                      />
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-white mb-1">{c.name}</h3>
                  <p className="text-muted mb-2">
                    {c.issuer} • {c.date}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {c.skills.map((s, idx) => (
                      <span
                        key={idx}
                        className="bg-purple-800/80 text-purple-100 px-4 py-1.5 rounded-full text-sm font-semibold shadow-md"
                        style={{ letterSpacing: '0.01em', display: 'inline-block' }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  {c.link && (
                    <a
                      href={c.link}
                      className="inline-flex items-center gap-2 text-white hover:text-purple-300 transition-colors text-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink size={14} />
                      Verify / Learn more
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`section ${visibleSections.has('projects') ? 'section-visible' : 'section-hidden'} px-0 sm:px-2`}>
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          data-aos="fade-down"
        >
          Projects
        </motion.h2>
        <div className="max-w-6xl mx-auto w-full">
          <div
            className="flex overflow-x-auto gap-8 pb-4"
            style={{
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {[
              {
                title: 'F1 App',
                description: 'This is an F1 Live Hub app, think of it as the Red Bull Racing of mobile dev. It pulls real-time data from the Ergast API and uses OpenAI to sound smart about driver backstories. It keeps you on track—whether you\'re team Hamilton or Verstappen.',
                skills: ['Dart', 'Flutter', 'C++'],
                logo: require('./assets/F.png'),
                link: 'https://github.com/AnanyaMMenon/F1--App/blob/master/README.md'
              },
              {
                title: 'ParkedIn',
                description: 'ParkedIn helps people find parking in Chicago, pay for spots, and manage reservations without circling the block for hours. 🚗 It\'s built with Flask blueprints for clean structure, using routes for users, lots, payments, reservations, and vehicles. It handles login, CRUD operations, and database management like a pro valet—so you can focus on getting parked, not parking.',
                skills: ['Python', 'SQL', 'Flask'],
                logo: require('./assets/paking.png'),
                link: 'https://github.com/AnanyaMMenon/ParkedIn/tree/main'
              },
              {
                title: 'Battleship',
                description: 'Battleship is a Flutter + Dart app where you can log in, matchmake, and sink ships on a smart 5x5 grid, playing against humans or AI. It uses a REST API for game and auth management, http for calls, provider for state, and shared_preferences for local storage—bringing turn-based naval battles with hits, misses, and sunk ships straight to your phone, minus the sea spray. 🚢💥',
                skills: ['Dart', 'Flutter', 'REST-API'],
                logo: require('./assets/BatleshipGame.png'),
                link: 'https://github.com/AnanyaMMenon/Battleship-'
              },
              {
                title: 'Snackcident',
                description: 'Ever had a snackcident? Snackcident is a Flutter-based health tracking app that lets you log every bite and calculate your BMI to keep your health in check. Built with Flutter and Firebase, it uses Firebase Authentication for secure user login, Cloud Firestore for real-time data storage, and OpenAI integration for intelligent meal suggestions and nutrition analysis. The app features a clean, intuitive UI with provider for state management, making calorie tracking and meal logging seamless. It logs calorie intake, analyzes nutrition patterns, tracks daily goals, and keeps you honest—one snack at a time.',
                skills: ['Flutter', 'Firebase', 'OpenAi'],
                logo: require('./assets/calorie.png'),
                link: 'https://github.com/AnanyaMMenon/Snackcident/tree/main'
              },
              {
                title: 'Pumpkin Raider',
                description: 'Pumpkin Raider is a cozy arcade project built with React and TypeScript, packed with three retro-inspired mini-games that bring nostalgic vibes to your browser. It uses IndexedDB for local high score persistence, ensuring your achievements stick around even after closing the tab. The project features smooth animations, responsive design, and a charming autumnal aesthetic with crunchy leaves and aesthetic pumpkins. Each mini-game has its own unique mechanics and scoring system, perfect for quick breaks and competitive high score chasing. It\'s all about comfy vibes, silly high scores, and late-night gaming sessions.',
                skills: ['React', 'TypeScript', 'IndexedDB'],
                logo: require('./assets/pumpkiNRAIDER.png'),
                link: 'https://github.com/AnanyaMMenon/Pumpkin-Raider'
              }
            ].map((project, idx) => (
              <motion.div
                key={idx}
                className="glass-card project-card flex-shrink-0 flex flex-col"
                style={{
                  scrollSnapAlign: 'start'
                }}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="project-image-container">
                  <img
                    src={project.logo}
                    alt={`${project.title} screenshot`}
                    className="project-image"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 text-center">{project.title}</h3>
                <p className="text-light mb-4 text-justify text-sm sm:text-base">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-purple-800/80 text-purple-100 px-4 py-1 rounded-full text-xs sm:text-sm font-semibold shadow-md"
                      style={{
                        letterSpacing: '0.01em',
                        display: 'inline-block',
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  className="inline-flex items-center gap-2 text-white hover:text-purple-300 transition-colors text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={14} />
                  View Project
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className={`section ${visibleSections.has('education') ? 'section-visible' : 'section-hidden'}`}>
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          data-aos="fade-down"
        >
          Education
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div 
            className="glass-card"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.03, y: -5 }}
          >
            <h3 className="text-2xl font-bold text-white mb-2">Masters of Science</h3>
            <h3 className="text-2xl font-bold text-white mb-2">Computer Science</h3>
            <p className="text-purple text-lg mb-2">Illinois Institute of Technology</p>
            <p className="text-muted">Chicago, IL • May 2025</p>
          </motion.div>
          <motion.div 
            className="glass-card"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.03, y: -5 }}
          >
            <h3 className="text-2xl font-bold text-white mb-2 text-center">Bachelors of Technology</h3>
            <h3 className="text-2xl text-white mb-2 text-center">Electronics & Communication</h3>
            <p className="text-purple text-lg mb-2 text-center">Dayanand Sagar University</p>
            <p className="text-muted text-center"> Bangalore, India • June 2021</p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`section section-dark ${visibleSections.has('contact') ? 'section-visible' : 'section-hidden'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            data-aos="fade-down"
          >
            Let's Connect
          </motion.h2>
          <p className="text-xl text-light mb-12">
            I'm always open to discussing new opportunities and interesting projects.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.a
              href="#contact-form"
              className="glass-card text-center group"
              onClick={e => {
                e.preventDefault();
                document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' });
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Mail className="text-purple mx-auto mb-4 group-hover:scale-110 transition-transform" size={32} />
              <h3 className="text-white font-semibold mb-2">Email</h3>
              <p className="text-muted mb-2 break-all">menonananyam@gmail.com</p>
              <span className="block mt-2 text-purple-300 underline">Contact Me</span>
            </motion.a>
            <motion.a 
              href="https://linkedin.com/in/ananya-m-menon" 
              className="glass-card text-center group" 
              target="_blank" 
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Linkedin className="text-purple mx-auto mb-4 group-hover:scale-110 transition-transform" size={32} />
              <h3 className="text-white font-semibold mb-2">LinkedIn</h3>
              <p className="text-muted">ananya-m-menon</p>
            </motion.a>
            <motion.a 
              href="https://github.com/AnanyaMMenon" 
              className="glass-card text-center group" 
              target="_blank" 
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Github className="text-purple mx-auto mb-4 group-hover:scale-110 transition-transform" size={32} />
              <h3 className="text-white font-semibold mb-2">GitHub</h3>
              <p className="text-muted">AnanyaMMenon</p>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className={`section section-dark ${visibleSections.has('contact') ? 'section-visible' : 'section-hidden'}`}>
        <div className="contact-form-card">
          <h3 className="text-2xl font-bold text-purple-300 mb-4 text-center">Send me a message</h3>
          <form ref={formRef} onSubmit={sendEmail} className="space-y-4 w-full">
            <input
              type="text"
              name="user_name"
              placeholder="Your Name"
              required
              className="w-full px-4 py-2 rounded bg-[#251a3a] text-black"
            />
            <input
              type="email"
              name="user_email"
              placeholder="Your Email Id"
              required
              className="w-full px-4 py-2 rounded bg-[#251a3a] text-black"
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              required
              className="w-full px-4 py-2 rounded bg-[#251a3a] text-black"
            />
            <div className="relative">
              <textarea
                name="message"
                placeholder="Your Message"
                required
                className="w-full px-4 py-2 rounded bg-[#251a3a] text-black pr-24"
                rows={4}
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn-primary w-full"
            >
              Send
            </button>
            {emailStatus && (
              <div className="text-center mt-2 text-purple-300">{emailStatus}</div>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted">
            © 2025 Ananya Menon. Built with React and a lot of caffeine.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;