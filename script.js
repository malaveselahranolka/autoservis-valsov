/* ── Navbar: black on hero, glass after ── */
const navbar = document.getElementById('navbar');
const heroSection = document.getElementById('hero');

function updateNavbar() {
    const threshold = heroSection
        ? heroSection.offsetTop + heroSection.offsetHeight - 68
        : window.innerHeight;
    navbar.classList.toggle('scrolled', window.scrollY > threshold);
}
window.addEventListener('scroll', updateNavbar, { passive: true });
updateNavbar();

/* ── Mobile menu toggle ── */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('active');
    navToggle.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    });
});

/* ── Scroll-triggered animations ── */
const animObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in');
            animObserver.unobserve(entry.target); // fire once
        }
    });
}, {
    threshold: 0.08,
    rootMargin: '0px 0px -36px 0px'
});

// Section headers — fade up
document.querySelectorAll('.section-header').forEach(el => {
    el.classList.add('anim');
    animObserver.observe(el);
});

// About: text from left, highlights from right
const aboutText = document.querySelector('.about-text');
const aboutHL   = document.querySelector('.about-highlights');
if (aboutText) { aboutText.classList.add('anim', 'anim-left');  animObserver.observe(aboutText); }
if (aboutHL)   { aboutHL.classList.add('anim', 'anim-right'); animObserver.observe(aboutHL); }

// Highlight cards — staggered
document.querySelectorAll('.highlight-card').forEach((el, i) => {
    el.classList.add('anim');
    el.style.transitionDelay = `${i * 0.08}s`;
    animObserver.observe(el);
});

// Service cards — staggered fade up
document.querySelectorAll('.svc-card').forEach((el, i) => {
    el.classList.add('anim');
    el.style.transitionDelay = `${i * 0.07}s`;
    animObserver.observe(el);
});

// Additional service cards — staggered scale in
document.querySelectorAll('.addl-card').forEach((el, i) => {
    el.classList.add('anim', 'anim-scale');
    el.style.transitionDelay = `${i * 0.06}s`;
    animObserver.observe(el);
});

// Pricing tables — fade up with slight stagger
document.querySelectorAll('.ptable').forEach((el, i) => {
    el.classList.add('anim');
    el.style.transitionDelay = `${i * 0.12}s`;
    animObserver.observe(el);
});
const pricingFooter = document.querySelector('.pricing-footer');
if (pricingFooter) { pricingFooter.classList.add('anim'); animObserver.observe(pricingFooter); }

// Contact details — staggered left
document.querySelectorAll('.cdetail').forEach((el, i) => {
    el.classList.add('anim', 'anim-left');
    el.style.transitionDelay = `${i * 0.07}s`;
    animObserver.observe(el);
});

// Contact form — from right
const formBox = document.querySelector('.contact-form-box');
if (formBox) { formBox.classList.add('anim', 'anim-right'); animObserver.observe(formBox); }

// Trust bar items
document.querySelectorAll('.trust-item').forEach((el, i) => {
    el.classList.add('anim');
    el.style.transitionDelay = `${i * 0.1}s`;
    animObserver.observe(el);
});

/* ── Contact form → mailto ── */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const d = new FormData(contactForm);
        let body = `Jméno: ${d.get('name')}\n`;
        if (d.get('phone'))   body += `Telefon: ${d.get('phone')}\n`;
        if (d.get('email'))   body += `E-mail: ${d.get('email')}\n`;
        if (d.get('service')) body += `Služba: ${d.get('service')}\n`;
        if (d.get('message')) body += `\nPopis:\n${d.get('message')}`;
        window.location.href = `mailto:info@autoservis-novak.cz?subject=${encodeURIComponent('Poptávka z webu – ' + d.get('name'))}&body=${encodeURIComponent(body)}`;
    });
}

/* ── Smooth scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
