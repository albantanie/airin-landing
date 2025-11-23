// Mobile menu toggle
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Tab switching functionality
function switchTab(platform) {
    // Remove active class from all tabs and content
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    // Add active class to clicked tab and corresponding content
    event.target.classList.add('active');
    document.getElementById(platform).classList.add('active');
}

// Copy code functionality
function copyCode(button, codeId) {
    const codeElement = document.getElementById(codeId);
    const code = codeElement.textContent;

    navigator.clipboard.writeText(code).then(() => {
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.style.background = 'rgba(16, 185, 129, 0.3)';

        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = 'rgba(255, 255, 255, 0.1)';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        button.textContent = 'Failed';
        setTimeout(() => {
            button.textContent = 'Copy';
        }, 2000);
    });
}

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                navLinks.classList.remove('active');

                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';

            // Trigger counter animation for stat numbers
            if (entry.target.classList.contains('cta-stat-number')) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                if (target) {
                    animateCounter(entry.target, target);
                }
            }
        }
    });
}, observerOptions);

// Observe feature cards for animation
document.querySelectorAll('.feature-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Observe demo steps for animation
document.querySelectorAll('.demo-step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateX(-20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// Observe stat numbers for counter animation
document.querySelectorAll('.cta-stat-number').forEach(el => {
    observer.observe(el);
});

// Initialize default tab
document.addEventListener('DOMContentLoaded', () => {
    // Set first tab as active
    const firstTab = document.querySelector('.tab-btn');
    const firstContent = document.querySelector('.tab-content');
    if (firstTab && firstContent) {
        firstTab.classList.add('active');
        firstContent.classList.add('active');
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    const menuBtn = document.querySelector('.mobile-menu-btn');

    if (navLinks.classList.contains('active') &&
        !nav.contains(e.target) ||
        (menuBtn && menuBtn.contains(e.target))) {
        return;
    }

    if (navLinks.classList.contains('active') && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});
