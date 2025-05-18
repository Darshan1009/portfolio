// Initialize Animations
AOS.init({
    duration: 1000,
    once: false,
    mirror: true
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

if (menuToggle && navLinks) {
    // Toggle menu
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking on links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !e.target.closest('.nav-links') && 
            !e.target.closest('.menu-toggle')) {
            navLinks.classList.remove('active');
            body.style.overflow = '';
        }
    });
}

// Particles Background
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize particles if the element exists and isn't already initialized
    const particlesElement = document.getElementById('particles-js');
    if (particlesElement && (!window.pJSDom || window.pJSDom.length === 0)) {
        particlesJS('particles-js', {
            particles: {
                number: { 
                    value: window.innerWidth < 768 ? 30 : 80,
                    density: { enable: true, value_area: 800 }
                },
                color: { value: '#2A9D8F' },
                shape: { 
                    type: 'circle',
                    stroke: { width: 0, color: '#000000' }
                },
                opacity: { 
                    value: 0.5,
                    random: false,
                    anim: { enable: false }
                },
                size: { 
                    value: 3,
                    random: true,
                    anim: { enable: false }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#2A9D8F',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: window.innerWidth < 768 ? 1 : 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: { enable: false, rotateX: 600, rotateY: 1200 }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'repulse' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                },
                modes: {
                    repulse: { distance: 100, duration: 0.4 },
                    push: { particles_nb: 4 }
                }
            },
            retina_detect: true
        });
    }
    
    // Fix connections container initialization
    if (document.getElementById('connectionsContainer')) {
        createInitialConnections();
    }
});

// Responsive Navbar Scroll Effect
const handleNavbarScroll = () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '10px 0';
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
        navbar.style.padding = '20px 0';
        navbar.style.background = 'rgba(10, 10, 10, 0.8)';
    }
};

window.addEventListener('scroll', handleNavbarScroll);

// Smooth Scrolling for Nav Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Skill Bar Animations
const animateSkillBars = () => {
    document.querySelectorAll('.skill').forEach(skill => {
        const percent = skill.getAttribute('data-percent');
        const skillBar = skill.querySelector('.skill-bar');
        skillBar.style.width = percent;
    });
};

// Trigger skill animation when the about section is in view
const aboutSection = document.getElementById('about');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
        }
    });
}, { threshold: 0.3 });

if (aboutSection) {
observer.observe(aboutSection);
}

// Simulate typing effect for terminal header
const headerElement = document.querySelector('.terminal-header');
if (headerElement) {
const text = headerElement.textContent;
headerElement.textContent = '';
headerElement.classList.add('typing-effect');

let i = 0;
const typeWriter = () => {
    if (i < text.length) {
        headerElement.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, Math.random() * 100 + 30);
    } else {
        setTimeout(() => {
            headerElement.classList.remove('typing-effect');
        }, 1500);
    }
};

// Start typing effect when contact section is visible
const contactSection = document.getElementById('contact');
const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(typeWriter, 500);
            contactObserver.unobserve(contactSection);
        }
    });
}, { threshold: 0.5 });

    if (contactSection) {
contactObserver.observe(contactSection);
    }
}

// Form submission
const cyberForm = document.getElementById('cyber-form');
if (cyberForm) {
    cyberForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get input values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const reason = document.getElementById('reason').value;
    
    // You would normally send data to a server here
    console.log('Form submitted:', { name, email, message, reason });
    
    // Show success message
    const successMessage = document.getElementById('form-success');
        if (successMessage) {
    successMessage.style.display = 'block';
    
    // Reset form after delay
    setTimeout(() => {
                cyberForm.reset();
        successMessage.style.display = 'none';
    }, 5000);
        }
    });
}

// Mobile detection and optimization
function isMobile() {
    return window.innerWidth < 768 || 
           ('ontouchstart' in window) || 
           (navigator.maxTouchPoints > 0);
}

// Optimize particle count for mobile
function optimizeForMobile() {
    if (isMobile()) {
        // Reduce animation load on mobile
        const aos = document.querySelectorAll('[data-aos]');
        aos.forEach(el => {
            // Make AOS animations run once on mobile
            el.setAttribute('data-aos-once', 'true');
            // Reduce animation duration
            el.setAttribute('data-aos-duration', '800');
        });
        
        // Reduce particles for better performance
        if (window.pJSDom && window.pJSDom[0]) {
            const pJS = window.pJSDom[0].pJS;
            pJS.particles.number.value = 30;
            pJS.particles.move.speed = 1;
            pJS.fn.particlesRefresh();
        }
        
        // Optimize terminal effects for mobile
        const terminalWindow = document.querySelector('.terminal-window');
        if (terminalWindow) {
            // Simpler effects for better performance
            document.querySelectorAll('.terminal-line').forEach(line => {
                line.style.opacity = '1';
            });
        }
    }
}

// Fix viewport height issue on mobile
function fixMobileVh() {
    // Fix for the 100vh issue on mobile browsers
    const setVhProperty = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    window.addEventListener('resize', setVhProperty);
    window.addEventListener('orientationchange', setVhProperty);
    setVhProperty();
}

// Run on load
window.addEventListener('load', () => {
    optimizeForMobile();
    fixMobileVh();
    
    // Fix for mobile safari scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Smoother scrolling behavior for mobile
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = document.querySelector('#navbar').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollBy({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Matrix code rain animation
function createMatrixRain() {
    // Matrix canvas already exists via particles.js
    // This function adds typing and terminal effects
    
    // Simulate terminal typing effect
    const terminalLines = document.querySelectorAll('.terminal-line:not(.typing-line)');
    
    terminalLines.forEach(line => {
        setTimeout(() => {
            line.style.opacity = '1';
        }, parseInt(line.classList[1]?.split('-')[1] || 0) * 1000);
    });
}

// Create a more dynamic glitch effect
function enhanceGlitchEffect() {
    const glitchText = document.querySelector('.glitch-text');
    
    if (!glitchText) return;
    
    // Random glitch intervals
    setInterval(() => {
        glitchText.style.textShadow = `
            ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px ${Math.random() * 10}px rgba(0, 255, 65, 0.7),
            ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px ${Math.random() * 10}px rgba(255, 0, 0, 0.7)
        `;
        
        setTimeout(() => {
            glitchText.style.textShadow = '0 0 10px rgba(0, 255, 65, 0.7)';
        }, 100);
    }, 3000);
}

// Call these functions after the page loads
window.addEventListener('load', () => {
    createMatrixRain();
    enhanceGlitchEffect();
    
    // Add an additional effect to simulate screen flicker
    const header = document.querySelector('header');
    if (header) {
        setInterval(() => {
            header.classList.add('flicker');
            setTimeout(() => {
                header.classList.remove('flicker');
            }, 100);
        }, 10000); // Flicker every 10 seconds
    }
});

// Add this CSS class to your styles.css file
/*
.flicker {
    animation: flicker 0.1s forwards;
}

@keyframes flicker {
    0% { opacity: 1; }
    25% { opacity: 0.8; }
    50% { opacity: 0.9; }
    75% { opacity: 0.7; }
    100% { opacity: 1; }
}
*/

// Network status section functionality
document.addEventListener('DOMContentLoaded', function() {
  // Get references to elements
  const scanStatusText = document.getElementById('scanStatusText');
  const scanningText = document.querySelector('.scanning-text');
  const completeText = document.querySelector('.complete-text');
  const connectionsContainer = document.getElementById('connectionsContainer');
  const threatsFound = document.getElementById('threatsFound');
  const securityScore = document.getElementById('securityScore');
  
  // After scan completes, show "no vulnerabilities" message
  setTimeout(() => {
    if (scanningText && completeText) {
      scanningText.style.display = 'none';
      completeText.style.display = 'block';
    }
  }, 10000); // Match the scan animation time
  
  // Generate random IPs for the connections list
  function generateRandomIP() {
    return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
  }
  
  // Array of connection types
  const connectionTypes = [
    { icon: 'fa-globe', status: 'HTTP', class: 'secure' },
    { icon: 'fa-lock', status: 'HTTPS', class: 'secure' },
    { icon: 'fa-server', status: 'SSH', class: 'secure' },
    { icon: 'fa-database', status: 'SQL', class: 'secure' },
    { icon: 'fa-envelope', status: 'SMTP', class: 'secure' },
    { icon: 'fa-network-wired', status: 'LAN', class: 'secure' }
  ];
  
  // Create initial connections
  function createInitialConnections() {
    if (!connectionsContainer) return;
    
    // Clear existing connections
    connectionsContainer.innerHTML = '';
    
    // Add 5 random connections
    for (let i = 0; i < 5; i++) {
      addConnection();
    }
  }
  
  // Add a new connection to the list
  function addConnection() {
    if (!connectionsContainer) return;
    
    // Create connection element
    const connection = document.createElement('div');
    connection.className = 'connection-item';
    
    // Random connection type
    const type = connectionTypes[Math.floor(Math.random() * connectionTypes.length)];
    
    // Random port
    const port = Math.floor(Math.random() * 9000) + 1000;
    
    // Create connection HTML
    connection.innerHTML = `
      <div class="connection-icon"><i class="fas ${type.icon}"></i></div>
      <div class="connection-ip">${generateRandomIP()}:${port}</div>
      <div class="connection-status ${type.class}">${type.status}</div>
    `;
    
    // Add to container
    connectionsContainer.appendChild(connection);
    
    // Remove oldest connection if there are too many
    if (connectionsContainer.children.length > 5) {
      connectionsContainer.removeChild(connectionsContainer.children[0]);
    }
  }
  
  // Update connections periodically
  createInitialConnections();
  setInterval(() => {
    addConnection();
  }, 5000);
  
  // Animate scan progress
  let scanCount = 0;
  const portsScanned = document.getElementById('portsScanned');
  
  const scanInterval = setInterval(() => {
    scanCount += Math.floor(Math.random() * 5000) + 1000;
    if (portsScanned) {
      portsScanned.textContent = scanCount.toLocaleString();
    }
    
    if (scanCount >= 65536) {
      clearInterval(scanInterval);
      if (portsScanned) {
        portsScanned.textContent = '65,536';
      }
    }
  }, 1000);
  
  // After scan completes, show a small animation for "secure" status
  setTimeout(() => {
    // Highlight security score
    if (securityScore) {
      securityScore.style.transform = 'scale(1.2)';
      securityScore.style.transition = 'transform 0.5s ease';
      
      setTimeout(() => {
        securityScore.style.transform = 'scale(1)';
      }, 500);
    }
    
    // Highlight "threats found" count
    if (threatsFound) {
      threatsFound.style.color = 'var(--matrix-green)';
      threatsFound.style.fontWeight = 'bold';
    }
  }, 10500);
});

document.querySelectorAll('.cyber-button, .social-link').forEach(el => {
    el.style.pointerEvents = 'auto';
    el.style.zIndex = 9999;
});

document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('navbar-loaded');
    document.querySelectorAll('footer .social-link').forEach((el, i) => {
        setTimeout(() => el.classList.add('animated'), 200 + i * 120);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.section-title').forEach(title => {
        // Find the closest parent section, or fallback to the parent container
        let section = title.closest('section');
        if (!section) section = title.parentElement;

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    title.classList.add('active');
                } else {
                    title.classList.remove('active');
                }
            });
        }, { threshold: 0.5 });
        observer.observe(section);
    });
});
