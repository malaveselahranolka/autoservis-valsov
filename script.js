// Navbar scroll effect — glass kicks in after #about section
const navbar = document.getElementById('navbar');
const aboutSection = document.getElementById('about');
window.addEventListener('scroll', () => {
    const threshold = aboutSection
        ? aboutSection.offsetTop + aboutSection.offsetHeight
        : window.innerHeight;
    navbar.classList.toggle('scrolled', window.scrollY > threshold);
});

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
    navbar.classList.toggle('menu-open', navLinks.classList.contains('active'));
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
        navbar.classList.remove('menu-open');
    });
});

// Scroll-triggered fade-in animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll(
    '.about-card, .service-card, .pricing-table, .contact-card, .pricing-cta, .services-extras'
).forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Stagger animation delays for grid items
document.querySelectorAll('.about-grid, .services-grid, .contact-info').forEach(grid => {
    grid.querySelectorAll('.fade-in').forEach((item, i) => {
        item.style.transitionDelay = `${i * 0.07}s`;
    });
});

// Also observe explicitly marked fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Contact form – open mailto
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const email = formData.get('email');
    const service = formData.get('service');
    const message = formData.get('message');

    let body = `Jméno: ${name}\n`;
    if (phone) body += `Telefon: ${phone}\n`;
    if (email) body += `E-mail: ${email}\n`;
    if (service) body += `Služba: ${service}\n`;
    if (message) body += `\nPopis:\n${message}`;

    const mailto = `mailto:info@autoservis-novak.cz?subject=${encodeURIComponent('Poptávka z webu – ' + name)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
