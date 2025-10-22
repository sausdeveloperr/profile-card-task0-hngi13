// Smooth scroll behavior for any internal links
document.addEventListener('DOMContentLoaded', function() {
    // Add keyboard navigation enhancements
    const sections = document.querySelectorAll('.about-section');
    
    // Make sections focusable for keyboard navigation
    sections.forEach((section, index) => {
        section.setAttribute('tabindex', '0');
        
        section.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowDown' && index < sections.length - 1) {
                e.preventDefault();
                sections[index + 1].focus();
            } else if (e.key === 'ArrowUp' && index > 0) {
                e.preventDefault();
                sections[index - 1].focus();
            }
        });
    });

    // Add intersection observer for animation timing
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    // Only observe if user hasn't requested reduced motion
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        sections.forEach(section => {
            section.style.animationPlayState = 'paused';
            observer.observe(section);
        });
    }

    // Add subtle parallax effect to header (if motion is allowed)
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const header = document.querySelector('.about-header');
            if (header) {
                header.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        });
    }
});

// Handle focus management for accessibility
document.addEventListener('keydown', function(e) {
    // Add visual indicator for keyboard navigation
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});