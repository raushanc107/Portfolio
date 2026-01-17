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
                const navLinks = document.querySelector('.nav-links');
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Toggle icon
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
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
});
