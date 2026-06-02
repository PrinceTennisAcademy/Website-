// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId !== '#' && targetId !== '#enroll') {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
        
        // Handle enrollment button
        if (targetId === '#enroll') {
            showEnrollmentModal();
        }
    });
});

// Handle enrollment button click
const enrollBtns = document.querySelectorAll('.btn-enroll, .cta .btn-primary');
enrollBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        showEnrollmentModal();
    });
});

// Show enrollment modal with contact info
function showEnrollmentModal() {
    const enrollmentText = `
Welcome to Prince Tennis Academy!

To enroll or book your FREE TRIAL:

📞 CALL US
+971 2 500 0000

📍 LOCATION
Khalifa City A, Abu Dhabi, UAE

📧 EMAIL
info@princetennisabudhabi.ae

⏰ HOURS
Daily 6:00 AM – 10:00 PM

Limited spots available in each program.
Contact us today to get started! 🎾
    `;
    
    alert(enrollmentText);
}

// Add smooth fade-in animation for elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe program cards, team cards, and facility items
document.querySelectorAll('.program-card, .team-card, .facility-item, .feature').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add active class to nav links based on scroll position
window.addEventListener('scroll', function() {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Mobile menu toggle (for smaller screens)
function setupMobileMenu() {
    const navbar = document.querySelector('.navbar');
    
    // Add mobile menu button if screen is small
    if (window.innerWidth <= 768) {
        if (!document.querySelector('.mobile-menu-toggle')) {
            const menuBtn = document.createElement('button');
            menuBtn.className = 'mobile-menu-toggle';
            menuBtn.innerHTML = '☰';
            menuBtn.style.cssText = `
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                display: block;
            `;
            navbar.querySelector('.container').appendChild(menuBtn);
            
            menuBtn.addEventListener('click', function() {
                const navLinks = document.querySelector('.nav-links');
                navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            });
        }
    }
}

// Initialize mobile menu on page load and resize
window.addEventListener('load', setupMobileMenu);
window.addEventListener('resize', setupMobileMenu);

// Add typing animation for hero text
function typeWriterEffect() {
    const heroH1 = document.querySelector('.hero-content h1');
    if (!heroH1) return;
    
    const text = heroH1.textContent;
    heroH1.textContent = '';
    let index = 0;
    
    function type() {
        if (index < text.length) {
            heroH1.textContent += text.charAt(index);
            index++;
            setTimeout(type, 30);
        }
    }
    
    type();
}

// Run typewriter effect when page loads
window.addEventListener('load', typeWriterEffect);

// Analytics tracking (placeholder for future integration)
function trackEvent(eventName, eventData = {}) {
    console.log('Event tracked:', eventName, eventData);
    // Add your analytics code here (Google Analytics, etc.)
}

// Track enrollment clicks
document.querySelectorAll('.btn-enroll, .cta .btn-primary').forEach(btn => {
    btn.addEventListener('click', function() {
        trackEvent('enrollment_clicked', {
            timestamp: new Date(),
            button_text: this.textContent
        });
    });
});

// Track program interest
document.querySelectorAll('.program-card').forEach((card, index) => {
    card.addEventListener('mouseenter', function() {
        trackEvent('program_viewed', {
            program_number: index + 1
        });
    });
});

console.log('Prince Tennis Academy website loaded successfully! 🎾');