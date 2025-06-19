import React, { useState, useEffect, useRef } from 'react';
import emailjs from 'emailjs-com';
import { Github, Linkedin, Mail, Phone, MapPin, ExternalLink, Download, Menu, X, Code, Database, Cloud, Award } from 'lucide-react';
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

    // Observe all sections
    const sections = ['home', 'about', 'experience', 'skills', 'projects', 'education', 'contact'];
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

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'skills', 'projects', 'education', 'contact'];
      const scrollPosition = window.scrollY + 100;

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

  const experiences = [
    {
      title: 'Software Engineer Intern',
      company: 'CDK Global',
      logo: '/cdk.png',
      location: 'Chicago, IL',
      period: 'June 2024 – May 2025',
      achievements: [
        'Collaborated with the Florida team during CDK\'s cyberattack recovery, helping restore key systems and deliver production-ready solutions',
        'Built a reusable React-based redirect warning dialog for the CRM email client, using CDK\'s internal UI/UX library to improve external link safety',
        'Developed and tested async C# event-driven features for vehicle service and parts lead notifications using AsyncAPI specs, achieving 100% test coverage',
        'Led refactoring efforts to remove legacy NuGet dependencies in the CRM backend, reducing security risks and improving maintainability'
      ]
    },
    {
      title: 'Senior Cloud Engineer',
      company: 'LTIMindtree',
      logo: '/lti.png',
      location: 'Bangalore, IN',
      period: 'Sept 2021 – July 2023',
      achievements: [
        'Developed and deployed 20+ web applications with Client Chevron using Azure PaaS Services',
        'Investigated root causes for problems that the vendor team had raised, increasing the team performance rate by 40%',
        'Designed an ASP.NET application that automated weekly load of data, saving over 40 hours of manual work'
      ]
    },
    {
      title: 'Graduate Engineer Trainee',
      company: 'LTIMindtree',
      logo: '/lti.png',
      location: 'Bangalore, IN',
      period: 'June 2021 – Sept 2021',
      achievements: [
        'Managed a team of 5 people to create an ASP.NET, Angular web application with CRUD and REST API for an in-house online bus reservation system',
        'Received positive user feedback with a 20% increase in customer satisfaction scores due to the efficient ticket purchase process'
      ]
    },
    {
      title: 'Data Analyst Intern',
      company: 'Daily Ninja',
      logo: '/dn.jpeg',
      location: 'Bangalore, IN',
      period: 'Jun 2019 – July 2019',
      achievements: [
        'Built a data pipeline to utilize Python and Excel to acquire, prepare, and cleanse large datasets, resulting in a 35% improvement in data accuracy',
        'Implemented automation scripts in Python to streamline data preparation tasks, reducing manual effort by 25% and increasing team productivity'
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
    <div className="portfolio-container">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50" style={{
        background: 'rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Ananya Menon
            </div>
            {/* Dropdown menu button (always visible, right corner) */}
            <div className="relative">
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
                    background: 'rgba(0,0,0,0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.1)'
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
                        className={`block w-full text-left px-6 py-3 text-white/90 hover:bg-purple-800 transition-colors ${
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
        </div>
      </nav>

      {/* Hero Section */}
        <section id="home" className="hero-section" style={{ minHeight: '90vh', paddingTop: '8rem', paddingBottom: '6rem' }}>
          <div className="hero-content" style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
            <div className="hero-avatar">
  <img
    src="image.jpg" // If in public folder
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
          Full-stack dev with cloud energy. Built with .NET, Azure, and a degree from Illinois Tech.
            </p>
            
            <div className="hero-buttons">
          <a
        href="#contact-form"
        className="btn-primary"
        onClick={e => {
    e.preventDefault();
    document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' });
  }}
>
  <Mail size={20} />
  Get In Touch
</a>
 <a
  href="/Portfolio/Resume.pdf"
  className="btn-secondary"
  target="_blank"
  rel="noopener noreferrer"
>
  <Download size={20} />
  Download Resume
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
      <section id="about" className={`section ${visibleSections.has('about') ? 'section-visible' : 'section-hidden'}`}>
        <h2 className="section-title">About Me</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-light mb-6">
Coded my way through a Master's at Illinois Tech. 3+ years of breaking, fixing, and building stuff in .NET, Azure, and full-stack land. <br></br>If it scales and doesn't crash, that's a win. 
            </p>
            <p className="text-light mb-6">
             Powered by caffeine and questionable Wi-Fi.  </p>
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
            <div className="glass-card">
              <Code className="text-purple mb-4" size={32} />
              <h3 className="text-white font-semibold mb-2">Full-Stack Development</h3>
              <p className="text-muted text-sm">Expert in modern web technologies and frameworks</p>
            </div>
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
      </section>

      {/* Experience Section */}
      <section id="experience" className={`section bg-black/20 ${visibleSections.has('experience') ? 'section-visible' : 'section-hidden'}`}>
  <div className="max-w-6xl mx-auto">
    <h2 className="text-4xl font-bold text-white mb-12 text-center">Experience</h2>
    <div className="space-y-8">
      {experiences.map((exp, index) => (
        <div key={index} className="glass-card">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 w-full">
            {/* Left: Logo, Company, Location */}
            <div className="flex items-center gap-4 mb-4 md:mb-0 text-left">
              <div className="company-logo-container">
                <img 
                  src={exp.logo} 
                  alt={`${exp.company} logo`}
                  className="company-logo"
                  onLoad={() => console.log(`Logo loaded successfully: ${exp.company}`)}
                  onError={(e) => {
                    console.log(`Logo failed to load: ${exp.company}`, e.target.src);
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
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
          <ul className="space-y-3">
            {exp.achievements.map((achievement, i) => (
              <li key={i} className="text-white/80 flex items-start gap-3">
                <span className="text-purple-400 mt-2">•</span>
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Skills Section */}
      <section id="skills" className={`section ${visibleSections.has('skills') ? 'section-visible' : 'section-hidden'}`}>
        <h2 className="section-title text-4xl font-bold text-white mb-12 text-center">Technical Skills</h2>
        <div className="glass-card mb-8">
          <h3 className="text-xl font-bold text-purple-300 mb-4">🧠 Programming Languages</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
  {skills.languages.map((skill, index) => (
    <span
      key={index}
      className="bg-purple-600/20 text-white text-xl px-5 py-2 rounded-full font-medium flex items-center gap-2 justify-center"
    >
      <Code className="text-purple" size={22} />
      {skill}
    </span>
  ))}
</div>
        </div>
        <div className="glass-card mb-8">
          <h3 className="text-xl font-bold text-purple-300 mb-4">🧰 Frameworks & Libraries</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
  {skills.frameworks.map((framework, index) => (
    <span
      key={index}
      className="bg-purple-600/20 text-white text-xl px-5 py-2 rounded-full font-medium flex items-center gap-2 justify-center"
    >
      <Code className="text-purple" size={22} />
      {framework}
    </span>
  ))}
</div>
        </div>
        <div className="glass-card mb-8">
          <h3 className="text-xl font-bold text-purple-300 mb-4">🔧 Developer Tools & Platforms</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
  {skills.tools.map((tool, index) => (
    <span
      key={index}
      className="bg-purple-600/20 text-white text-xl px-5 py-2 rounded-full font-medium flex items-center gap-2 justify-center"
    >
      <Code className="text-purple" size={22} />
      {tool}
    </span>
  ))}
</div>
        </div>
      </section>


      {/* Projects Section */}
      <section id="projects" className={`section section-dark ${visibleSections.has('projects') ? 'section-visible' : 'section-hidden'}`}>
        <h2 className="section-title">Publication</h2>
        <div className="max-w-4xl mx-auto">
          <div className="glass-card">
            <h3 className="text-2xl font-bold text-white mb-4">Flask Based Web App on Diabetes Prediction Using Machine Learning</h3>
            <p className="text-light mb-6">
              Developed a comparative study of different classification algorithms models on the Diabetes Dataset to predict if the user has Diabetes 
              and subsequently made a flask-based web app deployed on Heroku. Resulted in proof that random forests are efficient and provide better accuracy of 81.168%.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-purple-600/20 text-purple px-3 py-1 rounded-full text-sm">Python</span>
              <span className="bg-purple-600/20 text-purple px-3 py-1 rounded-full text-sm">Flask</span>
              <span className="bg-purple-600/20 text-purple px-3 py-1 rounded-full text-sm">Machine Learning</span>
              <span className="bg-purple-600/20 text-purple px-3 py-1 rounded-full text-sm">Random Forest</span>
              <span className="bg-purple-600/20 text-purple px-3 py-1 rounded-full text-sm">Heroku</span>
            </div>
            <div className="text-sm text-muted mb-4">
              Published in: Proceedings of the 2nd International Conference on Recent Trends in Machine Learning, IoT, Smart Cities and Applications, 
              Lecture Notes in Networks and Systems 237 • December 2021
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
            <h3 className="text-2xl font-bold text-white mb-2">Bachelors of Technology</h3>
            <h3 className="text-2xl font- text-white mb-2">Electronics & Communication</h3>
            <p className="text-purple text-lg mb-2">Dayanand Sagar University</p>
            <p className="text-muted">• Bangalore, India • June 2021</p>
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