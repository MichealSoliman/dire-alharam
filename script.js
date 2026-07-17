// Mobile Menu Toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    const isHidden = menu.classList.contains('hidden');
    
    if (isHidden) {
        menu.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        menu.setAttribute('aria-hidden', 'false');
    } else {
        menu.classList.add('hidden');
        document.body.style.overflow = '';
        menu.setAttribute('aria-hidden', 'true');
    }
}

// Mobile Submenu Toggle
function toggleMobileSubmenu() {
    const submenu = document.getElementById('mobileSubmenu');
    const arrow = document.getElementById('submenuArrow');
    
    if (submenu.classList.contains('hidden')) {
        submenu.classList.remove('hidden');
        arrow.style.transform = 'rotate(180deg)';
    } else {
        submenu.classList.add('hidden');
        arrow.style.transform = 'rotate(0deg)';
    }
}

// FAQ Toggle
function toggleFAQ(button) {
    const content = button.nextElementSibling;
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    
    if (isExpanded) {
        content.classList.add('hidden');
        button.setAttribute('aria-expanded', 'false');
        button.querySelector('svg').style.transform = 'rotate(0deg)';
    } else {
        // Close all other FAQ items
        document.querySelectorAll('.faq-item button').forEach(btn => {
            if (btn !== button) {
                btn.setAttribute('aria-expanded', 'false');
                btn.nextElementSibling.classList.add('hidden');
                btn.querySelector('svg').style.transform = 'rotate(0deg)';
            }
        });
        
        content.classList.remove('hidden');
        button.setAttribute('aria-expanded', 'true');
        button.querySelector('svg').style.transform = 'rotate(180deg)';
    }
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Close mobile menu on outside click
document.addEventListener('click', function(e) {
    const menu = document.getElementById('mobileMenu');
    const menuContent = menu.querySelector('.bg-white');
    const menuButton = document.querySelector('[onclick="toggleMobileMenu()"]');
    
    if (!menu.classList.contains('hidden') && 
        !menuContent.contains(e.target) && 
        !menuButton.contains(e.target)) {
        toggleMobileMenu();
    }
});

// Close mobile menu on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const menu = document.getElementById('mobileMenu');
        if (!menu.classList.contains('hidden')) {
            toggleMobileMenu();
        }
    }
});

// Lazy loading images
document.addEventListener('DOMContentLoaded', function() {
    // Check for Intersection Observer support
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
});

// Performance: Defer non-critical scripts
window.addEventListener('load', function() {
    // Load any non-critical scripts here
});

// Form validation (if needed)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('border-red-500');
            isValid = false;
        } else {
            input.classList.remove('border-red-500');
        }
    });
    
    return isValid;
}

// Track active navigation link
function updateActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('text-[#c49b3f]');
        } else {
            link.classList.remove('text-[#c49b3f]');
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateActiveNavLink();
    
    // Add aria-expanded to FAQ buttons
    document.querySelectorAll('.faq-item button').forEach(btn => {
        btn.setAttribute('aria-expanded', 'false');
    });
});

// Export functions for global use
window.toggleMobileMenu = toggleMobileMenu;
window.toggleMobileSubmenu = toggleMobileSubmenu;
window.toggleFAQ = toggleFAQ;
window.validateForm = validateForm;