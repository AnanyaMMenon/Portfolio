import React, { useState, useEffect, useRef } from 'react';
import emailjs from 'emailjs-com';
import { Github, Linkedin, Mail, Phone, MapPin, ExternalLink, Download, Menu, X, Code, Database, Cloud, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Portfolio.css'; // Import your CSS file
const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [emailStatus, setEmailStatus] = useState('');
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [typedName, setTypedName] = useState('');
  const [visibleSections, setVisibleSections] = useState(new Set(['home']));
  const formRef = useRef();
  const menuRef = useRef(null);

  // Set zoom to 100% on page load
  useEffect(() => {
    document.body.style.zoom = '100%';
    // For Firefox
    document.body.style.transform = 'scale(1)';
    document.body.style.transformOrigin = 'top left';
  }, []);

  // Initialize AOS (Animate On Scroll) library
  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 80 });
  }, []);

  // Intersection Observer for section animations
  useEffect(() => {
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

    // Add "publications" here
    const sections = ['home', 'about', 'experience', 'skills', 'projects', 'publications', 'education', 'contact'];
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Typing animation effect
  useEffect(() => {
    const name = "Ananya Menon";
    let i = 0;
    if (loading) {
      const typing = setInterval(() => {
        setTypedName((prev) => prev + name[i]);
        i++;
        if (i === name.length) {
          clearInterval(typing);
          setTimeout(() => setLoading(false), 800); // Wait a bit before showing portfolio
        }
      }, 120);
      return () => clearInterval(typing);
    }
  }, [loading]);

  // Scroll spy: highlight nav link as section is in view
  useEffect(() => {
    const handleScroll = () => {
      // Add "publications" here
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
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
        "Collaborated with the Florida team during CDK's cyberattack recovery, helping restore key systems and deliver production-ready solutions",
        "Built a reusable React-based redirect warning dialog for the CRM email client, using CDK's internal UI/UX library to improve external link safety",
        "Developed and tested async C# event-driven features for vehicle service and parts lead notifications using AsyncAPI specs, achieving 100% test coverage",
        "Led refactoring efforts to remove legacy NuGet dependencies in the CRM backend, reducing security risks and improving maintainability"
      ],
      skills: [
        "C#", "React", "AsyncAPI", "Azure", "Unit Testing", "UI/UX", "NuGet"
      ]
    },
    {
      title: 'Senior Cloud Engineer',
      company: 'LTIMindtree',
      logo: require('./assets/lti.png'),
      location: 'Bangalore, IN',
      period: 'Sept 2021 – July 2023',
      achievements: [
        "Developed and deployed 20+ web applications with Client Chevron using Azure PaaS Services",
        "Investigated root causes for problems that the vendor team had raised, increasing the team performance rate by 40%",
        "Designed an ASP.NET application that automated weekly load of data, saving over 40 hours of manual work"
      ],
      skills: [
        "Azure", "ASP.NET", "C#", "Web Apps", "Automation", "Root Cause Analysis"
      ]
    },
    {
      title: 'Graduate Engineer Trainee',
      company: 'LTIMindtree',
      logo: require('./assets/lti.png'),
      location: 'Bangalore, IN',
      period: 'June 2021 – Sept 2021',
      achievements: [
        "Managed a team of 5 people to create an ASP.NET, Angular web application with CRUD and REST API for an in-house online bus reservation system",
        "Received positive user feedback with a 20% increase in customer satisfaction scores due to the efficient ticket purchase process"
      ],
      skills: [
        "ASP.NET", "Angular", "REST API", "Team Management", "CRUD"
      ]
    },
    {
      title: 'Data Analyst Intern',
      company: 'Daily Ninja',
      logo: require('./assets/dn.jpeg'),
      location: 'Bangalore, IN',
      period: 'Jun 2019 – July 2019',
      achievements: [
        "Built a data pipeline to utilize Python and Excel to acquire, prepare, and cleanse large datasets, resulting in a 35% improvement in data accuracy",
        "Implemented automation scripts in Python to streamline data preparation tasks, reducing manual effort by 25% and increasing team productivity"
      ],
      skills: [
        "Python", "Excel", "Data Pipeline", "Automation", "Data Cleansing"
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

  return (
    <div className="portfolio-container min-h-screen bg-gradient-to-br from-purple-900 to-purple-700 px-2 sm:px-4">
      {/* Sticky Top Navigation Bar */}
      <nav
  className="fixed top-0 left-0 w-full z-[9999] border-b border-purple-700 shadow-lg"
  style={{
    background: 'rgba(24, 18, 43, 0.98)', // nearly opaque, deep purple
    minHeight: '64px',
    boxShadow: '0 2px 16px 0 rgba(168,85,247,0.10)',
    backdropFilter: 'none'
  }}
>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Ananya Menon
          </div>
          <div className="hidden md:flex gap-8">
            {['home', 'about', 'experience', 'skills', 'projects', 'education', 'contact'].map((section) => (
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
                  cursor: 'pointer'
                }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2 focus:outline-none"
              aria-label="Open navigation menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
            {/* Dropdown menu */}
            {isMenuOpen && (
              <div
                ref={menuRef}
                className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[#18122b] ring-1 ring-black ring-opacity-5 z-50"
                style={{
                  background: 'rgba(24,18,43,0.98)',
                  border: '1px solid rgba(168,85,247,0.25)'
                }}
              >
                <div className="py-2">
                  {['Home', 'About', 'Experience', 'Skills', 'Projects', 'Education', 'Contact'].map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        scrollToSection(item.toLowerCase());
                        setIsMenuOpen(false);
                      }}
                      className={`block w-full text-left px-6 py-3 rounded text-white/90 hover:bg-purple-800 transition-colors ${
                        activeSection === item.toLowerCase() ? 'bg-purple-900 text-purple-300' : ''
                      }`}
                      style={{ fontSize: "1.1rem" }}
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
            <div className="hero-avatar">
  <img
    src={
      require('./assets/image.jpg') // Use relative path for image
    } // If in public folder
    alt=""
    style={{
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: '50%',
    }}
  />
</div>
            <h1 className="hero-name" style={{ fontSize: '5rem', marginBottom: '1rem' }}>
          Ananya <span className="hero-name-highlight">Menon</span>
            </h1>
            <p className="hero-title" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>
          Software Engineer & Cloud Developer
            </p>
            <p className="hero-description" style={{ fontSize: '1.5rem', marginBottom: '2.5rem' }}>
            Full-stack developer specializing in .NET and Azure, with a Master’s degree from Illinois Tech.

            </p>
            
            <div className="hero-buttons">
          <motion.a
  whileHover={{ scale: 1.07 }}
  className="btn-primary"
  href="#contact-form"
>
  <Mail size={20} />
  Get In Touch
</motion.a>
 <a
  href="/Portfolio/Resume.pdf"
  className="btn-primary ml-4 flex items-center gap-2"
  target="_blank"
  rel="noopener noreferrer"
>
  <Download size={20} />
  Resume
</a>


          </div>

          <div className="social-links">
            <a href="https://linkedin.com/in/ananya-m-menon" className="social-link" target="_blank" rel="noopener noreferrer">
              <Linkedin size={30} />
            </a>
            <a href="https://github.com/AnanyaMMenon" className="social-link" target="_blank" rel="noopener noreferrer">
              <Github size={30} />
            </a>
            <a href="mailto:ananyammenon@gmail.com" className="social-link" target="_blank" rel="noopener noreferrer">
              <Mail size={30} />
            </a>
          </div>
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
    I’m a full-stack developer with 3+ years of professional experience at LTIMindtree (Chevron), building scalable apps using .NET and Azure. During my Master’s in Computer Science at Illinois Tech, I interned at CDK Global, where I honed my skills working on real-world projects.<br /><br />
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
      <motion.div className="glass-card" data-aos="zoom-in" whileHover={{ scale: 1.05 }}>
        <Code className="text-purple mb-4" size={32} />
        <h3 className="text-white font-semibold mb-2">Full-Stack Development</h3>
        <p className="text-muted text-sm">Expert in modern web technologies and frameworks</p>
      </motion.div>
      <div className="glass-card">
        <Cloud className="text-purple mb-4" size={32} />
        <h3 className="text-white font-semibold mb-2">Cloud Engineering</h3>
        <p className="text-muted text-sm">Specialized in Microsoft Azure and DevOps</p>
      </div>
      <div className="glass-card">
        <Database className="text-purple mb-4" size={32} />
        <h3 className="text-white font-semibold mb-2">Data Engineering</h3>
        <p className="text-muted text-sm">Building efficient data pipelines and analytics</p>
      </div>
      <div className="glass-card">
        <Award className="text-purple mb-4" size={32} />
        <h3 className="text-white font-semibold mb-2">Certified Professional</h3>
        <p className="text-muted text-sm">Multiple Microsoft Azure certifications</p>
      </div>
    </div>
  </div>
</motion.section>

      {/* Experience Section */}
      <section id="experience" className={`section bg-black/20 ${visibleSections.has('experience') ? 'section-visible' : 'section-hidden'} px-0 sm:px-2`}>
    <div className="max-w-6xl mx-auto w-full">
      <h2 className="text-4xl font-bold text-white mb-12 text-center">Experience</h2>
      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <motion.div
            className="glass-card w-full"
            whileHover={{ scale: 1.04, boxShadow: "0 20px 40px rgba(168,85,247,0.25)" }}
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 w-full">
              {/* Left: Logo, Company, Location */}
              <div className="flex items-center gap-4 mb-4 md:mb-0 text-left">
                <div className="company-logo-container w-14 h-14 flex-shrink-0 mr-3">
                  <img 
                    src={exp.logo}
                    alt={`${exp.company} logo`}
                    className="company-logo w-14 h-14 object-contain rounded bg-white"
                    onError={e => { e.target.style.display = 'none'; }}
                  />
                  <div className="company-logo-fallback" style={{ display: 'none' }}>
                    <span className="text-2xl font-bold text-purple-400">{exp.company.charAt(0)}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">{exp.title}</h3>
                  <p className="text-purple-300 text-lg mb-0">{exp.company}</p>
                  <p className="text-muted text-base">{exp.location}</p>
                </div>
              </div>
              {/* Right: Date */}
              <span className="text-white/60 text-sm md:text-base md:text-right w-full md:w-auto">{exp.period}</span>
            </div>
            <ul className="space-y-2">
  {exp.achievements.map((achievement, i) => (
    <li
      key={i}
      className="text-white/80 flex gap-2 items-baseline leading-snug"
      style={{ wordBreak: 'break-word' }}
    >
      <span className="text-purple-400 text-lg flex-shrink-0">•</span>
      <span className="flex-1">{achievement}</span>
    </li>
  ))}
</ul>
            {exp.skills && exp.skills.length > 0 && (
  <div className="flex flex-wrap gap-3 mt-6">
    {exp.skills.map((skill, idx) => (
      <span
        key={idx}
        className="bg-purple-800/80 text-purple-100 px-5 py-2 rounded-full text-base font-semibold shadow-md"
        style={{
          fontSize: '1.15rem',
          letterSpacing: '0.01em',
          display: 'inline-block',
        }}
      >
        {skill}
      </span>
    ))}
  </div>
)}
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* Skills Section */}
      <section id="skills" className={`section ${visibleSections.has('skills') ? 'section-visible' : 'section-hidden'} px-0 sm:px-2`}>
    <h2 className="section-title text-3xl sm:text-4xl font-bold text-white mb-8 sm:mb-12 text-center">Technical Skills</h2>
    <div className="glass-card mb-8">
      <h3 className="text-lg sm:text-xl font-bold text-white mb-4">🧠 Programming Languages</h3>
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {skills.languages.map((skill, index) => (
          <span
            key={index}
            className="bg-purple-800/80 text-purple-100 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-sm sm:text-base font-semibold shadow-md whitespace-nowrap"
            style={{
              letterSpacing: '0.01em',
              display: 'inline-block',
              minWidth: '80px',
              textAlign: 'center',
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
    <div className="glass-card mb-8">
      <h3 className="text-lg sm:text-xl font-bold text-white mb-4">🧰 Frameworks & Libraries</h3>
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {skills.frameworks.map((framework, index) => (
          <span
            key={index}
            className="bg-purple-800/80 text-purple-100 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-sm sm:text-base font-semibold shadow-md whitespace-nowrap"
            style={{
              letterSpacing: '0.01em',
              display: 'inline-block',
              minWidth: '80px',
              textAlign: 'center',
            }}
          >
            {framework}
          </span>
        ))}
      </div>
    </div>
    <div className="glass-card mb-8">
      <h3 className="text-lg sm:text-xl font-bold text-white mb-4">🔧 Developer Tools & Platforms</h3>
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {skills.tools.map((tool, index) => (
          <span
            key={index}
            className="bg-purple-800/80 text-purple-100 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-sm sm:text-base font-semibold shadow-md whitespace-nowrap"
            style={{
              letterSpacing: '0.01em',
              display: 'inline-block',
              minWidth: '80px',
              textAlign: 'center',
            }}
          >
            {tool}
          </span>
        ))}
      </div>
    </div>
  </section>

{/* Publications Section */}
<section id="publications" className={`section ${visibleSections.has('publications') ? 'section-visible' : 'section-hidden'} px-0 sm:px-2`}>
  <h2 className="section-title text-3xl sm:text-4xl font-bold text-white mb-8 sm:mb-12 text-center">Publications</h2>
  <div className="max-w-6xl mx-auto w-full">
    <div className="space-y-8">
      <div className="glass-card w-full">
        <h3 className="text-2xl font-bold text-white mb-2">Flask Based Web App on Diabetes Prediction</h3>
        <p className="text-light mb-4">
          Developed a comparative study of different classification algorithms on the Diabetes Dataset and built a Flask-based web app deployed on Heroku. Demonstrated that random forests provide better accuracy (81.17%).
        </p>
        <div className="flex flex-wrap gap-3 mb-4">
          {["Python", "Flask", "Machine Learning", "Random Forest", "Heroku"].map((skill, idx) => (
            <span
              key={idx}
              className="bg-purple-800/80 text-purple-100 px-5 py-2 rounded-full text-base font-semibold shadow-md"
              style={{
                fontSize: '1.15rem',
                letterSpacing: '0.01em',
                display: 'inline-block',
              }}
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
      {/* Add more publication cards below as needed */}
    </div>
  </div>
</section>

      {/* Projects Section */}
      <section id="projects" className={`section ${visibleSections.has('projects') ? 'section-visible' : 'section-hidden'} px-0 sm:px-2`}>
  <h2 className="section-title text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-8 sm:mb-12 text-center">Projects</h2>
  <div className="max-w-6xl mx-auto w-full">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* F1 App */}
      <div className="glass-card w-full flex flex-col items-center">
        <div
          className="flex items-start justify-center w-full h-[150px] mb-4"
          style={{ minHeight: 150, background: "#fff", borderRadius: "0.75rem 0.75rem 0 0", overflow: "hidden" }}
        >
          <img
            src={require("./assets/f1_logo.png")}
            alt="F1 App screenshot"
            className="object-contain w-[220px] h-[120px] mt-4"
            style={{ display: "block" }}
          />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-white mb-2 text-center">F1 App</h3>
        <p className="text-light mb-4 text-justify text-sm sm:text-base">
          This is an F1 Live Hub app, think of it as the Red Bull Racing of mobile dev. It pulls real-time data from the <i>Ergast API</i> and uses <i>OpenAI</i> to sound smart about driver backstories. `http` handles networking, `provider` keeps the state cool, and `shared_preferences` remembers your faves like a trusty pit crew. With tests to avoid mid-race crashes and sleek tabs for Drivers, Races, and Favorites, it keeps you on track—whether you're team Hamilton or Verstappen.
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {["Dart", "Flutter", "C++"].map((skill, idx) => (
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
          href="https://github.com/AnanyaMMenon/F1--App/blob/master/README.md"
          className="inline-flex items-center gap-2 text-white hover:text-purple-300 transition-colors text-sm"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ExternalLink size={14} />
          View Project
        </a>
      </div>
      {/* ParkedIn */}
      <div className="glass-card w-full flex flex-col items-center">
        <div
          className="flex items-start justify-center w-full h-[150px] mb-4"
          style={{ minHeight: 150, background: "#fff", borderRadius: "0.75rem 0.75rem 0 0", overflow: "hidden" }}
        >
          <img
            src={require("./assets/parking.png")}
            alt="Parking App screenshot"
            className="object-contain w-[220px] h-[120px] mt-4"
            style={{ display: "block" }}
          />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-white mb-2 text-center">ParkedIn</h3>
        <p className="text-light mb-4 text-justify text-sm sm:text-base">
ParkedIn helps people find parking in Chicago, pay for spots, and manage reservations without circling the block for hours. 🚗 It’s built with Flask blueprints for clean structure, using routes for users, lots, payments, reservations, and vehicles. It handles login, CRUD operations, and database management like a pro valet—so you can focus on getting parked, not parking.
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {["Python", "SQL", "Flask"].map((skill, idx) => (
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
          href="https://github.com/AnanyaMMenon/ParkedIn/tree/main"
          className="inline-flex items-center gap-2 text-white hover:text-purple-300 transition-colors text-sm"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ExternalLink size={14} />
          View Project
        </a>
      </div>
      {/* Battleship */}
      <div className="glass-card w-full flex flex-col items-center">
        <div
          className="flex items-start justify-center w-full h-[150px] mb-4"
          style={{ minHeight: 150, background: "#fff", borderRadius: "0.75rem 0.75rem 0 0", overflow: "hidden" }}
        >
          <img
            src={require("./assets/battleship.png")}
            alt="Battleship App screenshot"
            className="object-contain w-[220px] h-[120px] mt-4"
            style={{ display: "block" }}
          />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-white mb-2 text-center">Battleship</h3>
        <p className="text-light mb-4 text-justify text-sm sm:text-base">
          Battleship is a Flutter + Dart app where you can log in, matchmake, and sink ships on a smart 5x5 grid, playing against humans or AI. It uses a REST API for game and auth management, `http` for calls, `provider` for state, and `shared_preferences` for local storage—bringing turn-based naval battles with hits, misses, and sunk ships straight to your phone, minus the sea spray. 🚢💥
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {["Dart", "Flutter", "REST-API"].map((skill, idx) => (
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
          href="https://github.com/AnanyaMMenon/Battleship-"
          className="inline-flex items-center gap-2 text-white hover:text-purple-300 transition-colors text-sm"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ExternalLink size={14} />
          View Project
        </a>
      </div>
    </div>
  </div>
</section>

      {/* Education Section */}
      <section id="education" className={`section ${visibleSections.has('education') ? 'section-visible' : 'section-hidden'}`}>
        <h2 className="section-title">Education</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass-card">
            <h3 className="text-2xl font-bold text-white mb-2">Masters of  Science</h3>
            <h3 className="text-2xl font- text-white mb-2">Computer Science</h3>
            <p className="text-purple text-lg mb-2">Illinois Institute of Technology</p>
            <p className="text-muted">Chicago, IL • May 2025</p>
          </div>
          <div className="glass-card">
  <h3 className="text-2xl font-bold text-white mb-2 text-center">Bachelors of Technology</h3>
  <h3 className="text-2xl text-white mb-2 text-center">Electronics & Communication</h3>
  <p className="text-purple text-lg mb-2 text-center">Dayanand Sagar University</p>
  <p className="text-muted text-center"> Bangalore, India • June 2021</p>
</div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`section section-dark ${visibleSections.has('contact') ? 'section-visible' : 'section-hidden'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-title">Let's Connect</h2>
          <p className="text-xl text-light mb-12">
            I'm always open to discussing new opportunities and interesting projects.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <a
  href="#contact-form"
  className="glass-card text-center group"
  onClick={e => {
    e.preventDefault();
    document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' });
  }}
>
  <Mail className="text-purple mx-auto mb-4 group-hover:scale-110 transition-transform" size={32} />
  <h3 className="text-white font-semibold mb-2">Email</h3>
  <p className="text-muted mb-2 break-all">menonananya@gmail.com</p>
  <span className="block mt-2 text-purple-300 underline">Contact Me</span>
</a>
            {/* ...LinkedIn and GitHub cards... */}
            <a href="https://linkedin.com/in/ananya-m-menon" className="glass-card text-center group" target="_blank" rel="noopener noreferrer">
              <Linkedin className="text-purple mx-auto mb-4 group-hover:scale-110 transition-transform" size={32} />
              <h3 className="text-white font-semibold mb-2">LinkedIn</h3>
              <p className="text-muted">ananya-m-menon</p>
            </a>
            <a href="https://github.com/AnanyaMMenon" className="glass-card text-center group" target="_blank" rel="noopener noreferrer">
              <Github className="text-purple mx-auto mb-4 group-hover:scale-110 transition-transform" size={32} />
              <h3 className="text-white font-semibold mb-2">GitHub</h3>
              <p className="text-muted">AnanyaMMenon</p>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form Section (bottom of the page) */}
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