// Initialize Animations
AOS.init({
    duration: 1000,
    once: false,
    mirror: true
});

// Particles Background
particlesJS('particles-js', {
    particles: {
        number: { 
            value: 80,
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
            speed: 2,
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

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '10px 0';
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
        navbar.style.padding = '20px 0';
        navbar.style.background = 'rgba(10, 10, 10, 0.8)';
    }
});

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

observer.observe(aboutSection);

// Simulate typing effect for terminal header
const headerElement = document.querySelector('.terminal-header');
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

contactObserver.observe(contactSection);

// Form submission
document.getElementById('cyber-form').addEventListener('submit', (e) => {
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
    successMessage.style.display = 'block';
    
    // Reset form after delay
    setTimeout(() => {
        document.getElementById('cyber-form').reset();
        successMessage.style.display = 'none';
    }, 5000);
});
