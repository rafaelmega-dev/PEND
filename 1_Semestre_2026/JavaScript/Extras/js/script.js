/* ============================================
   BMW PRESENTATION WEBSITE - JAVASCRIPT
   Interactive functionality for the Ultimate Driving Machine
   ============================================ */

// ============================================
// DOM CONTENT LOADED
// Initialize all functionality when DOM is ready
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollAnimations();
    initSmoothScrolling();
    initMobileMenu();
    initModal();
    initNewsletterForm();
    initInquireButtons();
    initTimelineAnimation();
});

// ============================================
// NAVIGATION
// Handle navbar scroll effects
// ============================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    
    // Add scroll event listener for navbar styling
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ============================================
// MOBILE MENU TOGGLE
// Handle mobile menu open/close
// ============================================
function initMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu on hamburger click
    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a nav link
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenu.contains(e.target) && !navMenu.contains(e.target)) {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ============================================
// SMOOTH SCROLLING
// Enable smooth scrolling for anchor links
// ============================================
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    const headerOffset = 80; // Account for fixed header
    const elementPosition = 0;

    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get target element
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Calculate scroll position with offset
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update active state in navigation
                updateActiveNavLink(targetId);
            }
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        updateActiveNavLinkOnScroll();
    });
}

// Update active nav link based on URL hash
function updateActiveNavLink(targetId) {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(function(link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

// Update active nav link based on scroll position
function updateActiveNavLinkOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const headerOffset = 100;

    let currentSection = '';

    sections.forEach(function(section) {
        const sectionTop = section.offsetTop - headerOffset;
        const sectionHeight = section.offsetHeight;

        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(function(link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

// ============================================
// SCROLL ANIMATIONS
// Animate elements when they come into view
// ============================================
function initScrollAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of element is visible
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                // Add visible class to trigger animation
                entry.target.classList.add('visible');
                
                // Stop observing once animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(function(item, index) {
        item.style.transitionDelay = (index * 0.1) + 's'; // Stagger animations
        observer.observe(item);
    });

    // Observe fact cards
    const factCards = document.querySelectorAll('.fact-card');
    factCards.forEach(function(card, index) {
        card.style.transitionDelay = (index * 0.1) + 's';
        observer.observe(card);
    });

    // Observe model cards
    const modelCards = document.querySelectorAll('.model-card');
    modelCards.forEach(function(card, index) {
        card.style.transitionDelay = (index * 0.1) + 's';
        observer.observe(card);
    });

    // Observe price table rows
    const priceRows = document.querySelectorAll('.prices-table tbody tr');
    priceRows.forEach(function(row, index) {
        row.style.transitionDelay = (index * 0.05) + 's';
        observer.observe(row);
    });
}

// ============================================
// TIMELINE ANIMATION
// Additional timeline-specific animations
// ============================================
function initTimelineAnimation() {
    // Add staggered animations to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(function(item, index) {
        // Add data-year as a badge
        const year = item.getAttribute('data-year');
        if (year) {
            const yearBadge = document.createElement('span');
            yearBadge.className = 'timeline-year';
            yearBadge.textContent = year;
            item.querySelector('.timeline-content').insertBefore(
                yearBadge, 
                item.querySelector('.timeline-content').firstChild
            );
        }
    });
}

// ============================================
// MODAL FUNCTIONALITY
// Handle car details modal
// ============================================
function initModal() {
    const modal = document.getElementById('car-modal');
    const modalClose = document.querySelector('.modal-close');
    const viewDetailsButtons = document.querySelectorAll('.view-details');

    // Car data for modal - stores detailed information
    const carData = {
        m4: {
            title: 'BMW M4 Competition',
            power: '503 HP',
            speed: '3.4s (0-60 mph)',
            engine: '3.0L Twin-Turbo I6',
            transmission: '8-Speed Automatic',
            description: 'The BMW M4 Competition delivers raw power and precision. With its twin-turbocharged inline-6 engine, adaptive M suspension, and aggressive styling, it represents the pinnacle of BMW\'s performance heritage.'
        },
        x5: {
            title: 'BMW X5 xDrive40i',
            power: '335 HP',
            speed: '5.3s (0-60 mph)',
            engine: '3.0L Turbo I6',
            transmission: '8-Speed Automatic',
            description: 'The BMW X5 defines the Sports Activity Vehicle segment. Combining luxurious comfort with off-road capability, it features BMW\'s latest iDrive system and premium interior materials.'
        },
        '7': {
            title: 'BMW 760i xDrive',
            power: '536 HP',
            speed: '4.2s (0-60 mph)',
            engine: '4.4L Twin-Turbo V8',
            transmission: '8-Speed Automatic',
            description: 'The BMW 760i represents the pinnacle of automotive luxury. With its powerful V8 engine, executive rear seating, and cutting-edge technology, it offers an unparalleled driving experience.'
        },
        i4: {
            title: 'BMW i4 M50',
            power: '536 HP',
            speed: '3.7s (0-60 mph)',
            engine: 'Dual Electric Motors',
            transmission: 'Single-Speed',
            description: 'The BMW i4 M50 proves that electric vehicles can be exciting. With its powerful dual-motor setup, impressive range, and M-tuned dynamics, it\'s the future of performance.'
        },
        ix: {
            title: 'BMW iX xDrive50',
            power: '516 HP',
            speed: '4.4s (0-60 mph)',
            engine: 'Dual Electric Motors',
            transmission: 'Single-Speed',
            description: 'The BMW iX is a statement vehicle for the electric future. Its innovative design, sustainable materials, and advanced technology make it the most advanced BMW ever built.'
        },
        m3: {
            title: 'BMW M3 Competition',
            power: '503 HP',
            speed: '3.4s (0-60 mph)',
            engine: '3.0L Twin-Turbo I6',
            transmission: '8-Speed Automatic',
            description: 'The BMW M3 Competition is the definitive sports sedan. With its powerful engine, rear-wheel drive dynamics, and track-ready chassis, it continues the legendary M3 heritage.'
        }
    };

    // Add click event to all "View Details" buttons
    viewDetailsButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Get model data from parent card
            const modelCard = this.closest('.model-card');
            const modelId = modelCard.getAttribute('data-model');
            const carInfo = carData[modelId];

            if (carInfo) {
                // Populate modal with car data
                document.getElementById('modal-title').textContent = carInfo.title;
                document.getElementById('modal-power').textContent = carInfo.power;
                document.getElementById('modal-speed').textContent = carInfo.speed;
                document.getElementById('modal-engine').textContent = carInfo.engine;
                document.getElementById('modal-transmission').textContent = carInfo.transmission;
                document.getElementById('modal-description').textContent = carInfo.description;

                // Show modal
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });

    // Close modal on X button click
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            closeModal();
        });
    }

    // Close modal on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Close modal function
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore background scrolling
    }

    // Modal CTA button
    const modalCta = document.getElementById('modal-cta');
    if (modalCta) {
        modalCta.addEventListener('click', function() {
            alert('Thank you for your interest! This would redirect to BMW\'s configuration page.');
            closeModal();
        });
    }
}

// ============================================
// NEWSLETTER FORM
// Handle newsletter subscription
// ============================================
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // Validate email
            if (email && isValidEmail(email)) {
                // Show success message (in production, this would send to server)
                alert('Thank you for subscribing! You will receive the latest BMW news and updates.');
                emailInput.value = ''; // Clear input
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ============================================
// INQUIRE BUTTONS
// Handle price inquiry buttons
// ============================================
function initInquireButtons() {
    const inquireButtons = document.querySelectorAll('.inquire-btn');
    
    inquireButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Get the row data
            const row = this.closest('tr');
            const modelName = row.querySelector('.model-name').textContent;
            const variant = row.cells[1].textContent;
            const price = row.querySelector('.price').textContent;
            
            // Show inquiry message
            alert(`Thank you for your interest in the ${modelName} ${variant}!\n\nPrice: ${price}\n\nA BMW representative will contact you shortly.`);
        });
    });
}

// ============================================
// SCROLL TO TOP BUTTON
// Add a scroll to top functionality
// ============================================
function createScrollToTopButton() {
    // Create scroll to top button
    const scrollBtn = document.createElement('button');
    scrollBtn.id = 'scroll-to-top';
    scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollBtn);

    // Style the button
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, var(--bmw-blue), var(--bmw-dark-blue));
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(0, 102, 177, 0.4);
    `;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });

    // Scroll to top on click
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hover effects
    scrollBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 6px 25px rgba(0, 102, 177, 0.6)';
    });

    scrollBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(0, 102, 177, 0.4)';
    });
}

// Initialize scroll to top button
createScrollToTopButton();

// ============================================
// PARALLAX EFFECT (Hero Section)
// Add subtle parallax to hero background
// ============================================
function initParallax() {
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            // Apply parallax effect only when in hero section
            if (scrollPosition < hero.offsetHeight) {
                hero.style.backgroundPositionY = (scrollPosition * 0.5) + 'px';
            }
        });
    }
}

// Initialize parallax
initParallax();

// ============================================
// LOADING ANIMATION
// Show loading screen on page load
// ============================================
function initLoadingAnimation() {
    // Create loading overlay
    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg" alt="BMW Logo" class="loader-logo">
            <div class="loader-spinner"></div>
        </div>
    `;
    
    // Add loader styles
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    loader.querySelector('.loader-content').style.cssText = `
        text-align: center;
    `;
    
    loader.querySelector('.loader-logo').style.cssText = `
        width: 80px;
        margin-bottom: 20px;
        filter: brightness(0) invert(1);
    `;
    
    loader.querySelector('.loader-spinner').style.cssText = `
        width: 40px;
        height: 40px;
        border: 3px solid #333;
        border-top-color: #0066b1;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto;
    `;
    
    // Add keyframes for spinner
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(loader);
    
    // Hide loader after page loads
    window.addEventListener('load', function() {
        setTimeout(function() {
            loader.style.opacity = '0';
            setTimeout(function() {
                loader.remove();
            }, 500);
        }, 1000);
    });
}

// Uncomment to enable loading animation
// initLoadingAnimation();

// ============================================
// KEYBOARD NAVIGATION
// Enhance accessibility with keyboard navigation
// ============================================
document.addEventListener('keydown', function(e) {
    // Allow Escape to close mobile menu
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobile-menu');
        const navMenu = document.getElementById('nav-menu');
        
        if (navMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// ============================================
// PERFORMANCE OPTIMIZATION
// Throttle scroll events for better performance
// ============================================
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(function() {
                inThrottle = false;
            }, limit);
        }
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    // Scroll-based operations here
    // These will now run at most once per 100ms
}, 100));

// ============================================
// CONSOLE EASTER EGG
// BMW-themed console message
// ============================================
console.log(`
%c🚗 BMW - The Ultimate Driving Machine 🚗
%c
Welcome to the BMW presentation website!
This site showcases the legendary Bavarian automaker.
%c
Powered by pure HTML, CSS, and Vanilla JavaScript.
No frameworks. Just performance.
%c
© 2024 BMW AG. This is a demonstration website.
`,
    'color: #0066b1; font-size: 20px; font-weight: bold;',
    'color: #666;',
    'color: #009ada; font-style: italic;',
    'color: #999; font-size: 12px;'
);
