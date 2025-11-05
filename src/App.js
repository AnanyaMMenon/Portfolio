import React, { useState, useEffect, useRef } from 'react';
import emailjs from 'emailjs-com';
import { Github, Linkedin, Mail, Phone, MapPin, ExternalLink, Download, Menu, X, Code, Database, Cloud, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import { Briefcase } from "lucide-react";
import AMLogo from './assets/AM.jpg';

import 'aos/dist/aos.css';
import './Portfolio.css';

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
  const [pubView, setPubView] = useState('publications');
  const [activeExpSection, setActiveExpSection] = useState(null);
  const [activeExperience, setActiveExperience] = useState('');

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

  useEffect(() => {
    document.body.style.zoom = '100%';
    document.body.style.transform = 'scale(1)';
    document.body.style.transformOrigin = 'top left';
  }, []);

  useEffect(() => {
    if (!loading) {
      AOS.refresh();
    } else {
      AOS.init({ duration: 800, once: true, offset: 80 });
    }
  }, [loading]);

  useEffect(() => {
    if (!loading) {
      const allSections = ['home', 'about', 'experience', 'skills', 'projects', 'publications', 'education', 'contact'];
      setVisibleSections(new Set(allSections));
    }
  }, [loading]);

  useEffect(() => {
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

    setTimeout(() => {
      const sections = ['home', 'about', 'experience', 'skills', 'projects', 'publications', 'education', 'contact'];
      sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          observer.observe(element);
          const rect = element.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            setVisibleSections(prev => new Set([...prev, sectionId]));
          }
        }
      });
    }, 100);

    return () => observer.disconnect();
  }, [loading]);

  useEffect(() => {
    const loadingMessage = [
      "Hi, I am Ananya.",
      "I build scalable web applications.",
      "Check out my Portfolio <3"
    ].join("\n");
    let i = 0;
    if (loading) {
      const typing = setInterval(() => {
        if (i < loadingMessage.length) {
          setLoadingText(loadingMessage.slice(0, i + 1));
          i++;
        } else {
          clearInterval(typing);
          setTimeout(() => setLoading(false), 500);
        }
      }, 50);
      return () => clearInterval(typing);
    }
  }, [loading]);

  useEffect(() => {
    if (loading) return;

    const currentTitle = titles[titleIndex];
    const typingSpeed = isDeleting ? 50 : 50;
    const pauseTime = isDeleting ? 50 : 1000;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (typedTitle.length < currentTitle.length) {
          setTypedTitle(currentTitle.slice(0, typedTitle.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (typedTitle.length > 0) {
          setTypedTitle(currentTitle.slice(0, typedTitle.length - 1));
        } else {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % titles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [typedTitle, isDeleting, titleIndex, titles, loading]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'skills', 'projects', 'publications', 'education', 'contact'];
      const scrollPosition = window.scrollY + 120;

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

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setEmailStatus('');

    emailjs.sendForm(
      'service_t7am8qo',
      'template_p6nhyft',
      formRef.current,
      'tZ1u72LpykRW7FiZT'
    )
    .then(
      (result) => {
        setEmailStatus('Message sent successfully!');
        formRef.current.reset();
        setMessage("");
      },
      (error) => {
        setEmailStatus('Failed to send message. Please try again.');
      }
    );
  };

  const skills = {
    languages: [
      { name: 'C#', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
      { name: 'C/C++', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
      { name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
      { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'SQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      { name: 'Dart', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg' },
      { name: 'HTML & CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'Tailwind CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg' }
    ],
    frameworks: [
      { name: 'ASP.NET', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg' },
      { name: 'Entity Framework', logo: 'data:image/png;base64,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' },
      { name: 'Flask', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg' },
      { name: 'Angular', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg' },
      { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Flutter', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
      { name: 'jQuery', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg' },
      { name: 'Bootstrap', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
      { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Express.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
    ],
    tools: [
      { name: 'Microsoft Azure', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg' },
      { name: 'Git & GitHub', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'GitLab CI/CD', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg' },
      { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
      { name: 'Postman', logo: 'https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg' },
      { name: 'Visual Studio', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualstudio/visualstudio-plain.svg' },
      { name: 'VS Code', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
      { name: 'Kubernetes', logo: 'data:image/png;base64,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' },
      { name: 'SSMS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg' },
      { name: 'AWS', logo: "https://logos-world.net/wp-content/uploads/2021/08/Amazon-Web-Services-AWS-Logo.png" },
  ]};

  const experiences = [
    {
      title: 'Software Engineer Intern',
      company: 'CDK Global',
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
              className="h-10 w-10 rounded-full object-cover"
            />
          </div>

          <div className="hidden md:flex gap-8">
            {['home', 'about', 'experience', 'skills', 'projects', 'publications', 'education', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
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
          <div className="md:hidden relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2 focus:outline-none"
              aria-label="Open navigation menu"
              style={{ zIndex: 100000, pointerEvents: 'auto' }}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
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

      {/* Hero Section - keeping original code */}
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

      {/* About Section - keeping original */}
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

                  <div className="flex flex-col items-end">
                    <p className="period">{exp.period}</p>
                    <p className="location">{exp.location}</p>
                  </div>
                </button>

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

      {/* Skills Section - NEW WITH LOGOS */}
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

        {/* Programming Languages */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">🧠 Programming Languages</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {skills.languages.map((skill, index) => (
              <motion.div
                key={index}
                className="skill-card"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="skill-logo-container">
                  <img 
                    src={skill.logo} 
                    alt={skill.name}
                    className="skill-logo"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const fallback = document.createElement('div');
                      fallback.className = 'skill-logo-fallback';
                      fallback.textContent = skill.name.charAt(0);
                      e.currentTarget.parentElement.appendChild(fallback);
                    }}
                  />
                </div>
                <p className="skill-name">{skill.name}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Frameworks & Libraries */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">🧰 Frameworks & Libraries</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {skills.frameworks.map((framework, index) => (
              <motion.div
                key={index}
                className="skill-card"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="skill-logo-container">
                  <img 
                    src={framework.logo} 
                    alt={framework.name}
                    className="skill-logo"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const fallback = document.createElement('div');
                      fallback.className = 'skill-logo-fallback';
                      fallback.textContent = framework.name.charAt(0);
                      e.currentTarget.parentElement.appendChild(fallback);
                    }}
                  />
                </div>
                <p className="skill-name">{framework.name}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Developer Tools */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">🔧 Developer Tools & Platforms</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {skills.tools.map((tool, index) => (
              <motion.div
                key={index}
                className="skill-card"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="skill-logo-container">
                  <img 
                    src={tool.logo} 
                    alt={tool.name}
                    className="skill-logo"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const fallback = document.createElement('div');
                      fallback.className = 'skill-logo-fallback';
                      fallback.textContent = tool.name.charAt(0);
                      e.currentTarget.parentElement.appendChild(fallback);
                    }}
                  />
                </div>
                <p className="skill-name">{tool.name}</p>
              </motion.div>
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

      {/* Projects Section - keeping original */}
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