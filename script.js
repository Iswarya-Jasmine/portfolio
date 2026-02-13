// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update active nav link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.backgroundColor = 'rgba(15, 23, 42, 0.9)';
        header.style.boxShadow = 'none';
    }
    
    // Update active nav link based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-level');
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBar = entry.target;
            const width = skillBar.style.width;
            skillBar.style.width = '0%';
            
            setTimeout(() => {
                skillBar.style.width = width;
            }, 300);
        }
    });
}, observerOptions);

skillBars.forEach(bar => {
    observer.observe(bar);
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        const isDisplayed = navLinks.style.display === 'flex';
        navLinks.style.display = isDisplayed ? 'none' : 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.backgroundColor = 'var(--dark)';
        navLinks.style.padding = '20px';
        navLinks.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
        navLinks.style.gap = '15px';
        navLinks.style.borderTop = '1px solid rgba(255, 255, 255, 0.1)';
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && navLinks.style.display === 'flex') {
        if (!e.target.closest('.navbar') && !e.target.closest('.nav-links')) {
            navLinks.style.display = 'none';
        }
    }
});

// Animation on scroll for cards
const animatedCards = document.querySelectorAll('.project-card, .certification-card, .coding-card, .timeline-content, .experience-card');
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { 
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

animatedCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    cardObserver.observe(card);
});

// Add hover effect to education timeline
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach(item => {
    const content = item.querySelector('.timeline-content');
    const dot = item.querySelector('.timeline-dot');
    
    if (content && dot) {
        content.addEventListener('mouseenter', () => {
            dot.style.transform = 'scale(1.3)';
            dot.style.boxShadow = '0 0 15px rgba(99, 102, 241, 0.5)';
        });
        
        content.addEventListener('mouseleave', () => {
            dot.style.transform = 'scale(1)';
            dot.style.boxShadow = 'none';
        });
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2025', currentYear);
    }
    
    // Add active class to home link by default
    const homeLink = document.querySelector('a[href="#home"]');
    if (homeLink && window.scrollY === 0) {
        homeLink.classList.add('active');
    }
});
