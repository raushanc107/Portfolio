document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in');
    animatedElements.forEach(el => observer.observe(el));

    // Mobile Menu Toggle Variables
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');

                    // Reset icon
                    if (menuToggle) {
                        const icon = menuToggle.querySelector('i');
                        if (icon) {
                            icon.classList.remove('fa-times');
                            icon.classList.add('fa-bars');
                        }
                    }
                }
            }
        });
    });

    // Mobile Menu Toggle Logic
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Toggle icon
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars'); // Corrected order to matches original logic intent (if active, show X)
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Dynamic Header Background
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Typing Effect Logic (Simple version)
    const textElement = document.querySelector('.typing-text span');
    // Simple cursor blink effect is handled by CSS, complex typing can be added here if requested.

    // Experience Calculation (From Aug 2020)
    function updateExperience() {
        const startDate = new Date('2020-08-01'); // August 2020
        const currentDate = new Date();

        // Calculate difference in months
        let totalMonths = (currentDate.getFullYear() - startDate.getFullYear()) * 12;
        totalMonths -= startDate.getMonth();
        totalMonths += currentDate.getMonth();

        // Convert to Year.Month format
        const years = Math.floor(totalMonths / 12);
        const months = totalMonths % 12;

        const expString = `${years}.${months}`;

        const expElement = document.getElementById('exp-years');
        if (expElement) {
            expElement.textContent = expString;
        }
    }

    updateExperience();

    // Mobile Read More Logic (Projects, About, Experience, Hero)
    function initReadMore() {
        if (window.innerWidth > 768) {
            document.querySelectorAll('.read-more-btn').forEach(btn => btn.remove());
            document.querySelectorAll('.expanded').forEach(el => el.classList.remove('expanded'));
            return;
        }

        // Targets: Project Cards, Hero Description, About Text, Timeline Items
        const containers = [
            ...document.querySelectorAll('.project-info'),
            ...document.querySelectorAll('.timeline-content')
        ];

        // Single elements and specialized lists
        const heroDesc = document.querySelector('.hero-description');
        const aboutParagraphs = document.querySelectorAll('.about-text p');

        const targets = [];

        // Add paragraphs from containers
        containers.forEach(c => {
            const p = c.querySelector('p');
            if (p) targets.push(p);
        });

        // Add Hero
        if (heroDesc) targets.push(heroDesc);

        // Add About Paragraphs
        if (aboutParagraphs) targets.push(...aboutParagraphs);

        targets.forEach(p => {
            if (!p) return;

            // Check if button already exists (relative to parent or sibling check)
            if (p.nextSibling && p.nextSibling.className === 'read-more-btn') return;

            // Only add if content overflows
            if (p.scrollHeight <= p.clientHeight + 2) return;

            const btn = document.createElement('button');
            btn.className = 'read-more-btn';
            btn.innerText = 'Read More';

            btn.addEventListener('click', (e) => {
                e.preventDefault();
                p.classList.toggle('expanded');
                if (p.classList.contains('expanded')) {
                    btn.innerText = 'Show Less';
                } else {
                    btn.innerText = 'Read More';
                }
            });

            // Insert after paragraph
            p.parentNode.insertBefore(btn, p.nextSibling);
        });
    }

    // Run with delay to ensure rendering
    setTimeout(initReadMore, 100);

    // Re-run on resize just in case
    window.addEventListener('resize', () => {
        initReadMore();
    });
});
