/**
 * TESSIPI Foundation - JavaScript Principal
 * Gestion des interactions, animations et formulaires
 */

// ============================================
// INITIALISATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initDonationSystem();
    initCounterAnimation();
    initScrollAnimations();
    initForms();
    initSmoothScroll();
});

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Effet de scroll sur la navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Mise à jour du lien actif
        updateActiveNavLink();
    });
    
    // Menu mobile
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Fermer le menu mobile au clic sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// Mise à jour du lien de navigation actif
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

// ============================================
// SYSTÈME DE DONS
// ============================================
function initDonationSystem() {
    const typeBtns = document.querySelectorAll('.type-btn');
    const amountBtns = document.querySelectorAll('.amount-btn');
    const customAmountInput = document.getElementById('customAmount');
    const impactValue = document.getElementById('impactValue');
    const donateBtn = document.getElementById('donateBtn');
    
    let donationType = 'once';
    let donationAmount = 100;
    
    // Impacts correspondant aux montants
    const impacts = {
        25: 'Kit d\'hygiène pour une famille',
        50: 'Consultation médicale de base',
        100: 'Consultation médicale complète',
        250: 'Kit alimentaire pour une famille (1 mois)',
        500: 'Scolarisation d\'un enfant (1 an)'
    };
    
    // Sélection du type de don
    typeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            typeBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            donationType = this.dataset.type;
            updateImpact();
        });
    });
    
    // Sélection du montant
    amountBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            amountBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            customAmountInput.value = '';
            donationAmount = parseInt(this.dataset.amount);
            updateImpact();
        });
    });
    
    // Montant personnalisé
    customAmountInput.addEventListener('input', function() {
        if (this.value) {
            amountBtns.forEach(b => b.classList.remove('active'));
            donationAmount = parseInt(this.value) || 0;
            updateImpact();
        }
    });
    
    // Mise à jour de l'impact
    function updateImpact() {
        let impact = '';
        
        if (donationAmount <= 25) {
            impact = impacts[25];
        } else if (donationAmount <= 50) {
            impact = impacts[50];
        } else if (donationAmount <= 100) {
            impact = impacts[100];
        } else if (donationAmount <= 250) {
            impact = impacts[250];
        } else {
            impact = impacts[500];
        }
        
        if (donationType === 'monthly') {
            impact += ' (par mois)';
        }
        
        impactValue.textContent = impact;
    }
    
    // Bouton de don
    donateBtn.addEventListener('click', function() {
        if (donationAmount <= 0) {
            showToast('Veuillez sélectionner un montant', 'error');
            return;
        }
        
        // Simulation du processus de don
        const message = donationType === 'monthly' 
            ? `Don mensuel de ${donationAmount}€ configuré avec succès !`
            : `Don de ${donationAmount}€ enregistré. Merci pour votre générosité !`;
        
        showToast(message, 'success');
        
        // Ici, vous redirigeriez vers une page de paiement
        // window.location.href = `/paiement?montant=${donationAmount}&type=${donationType}`;
    });
}

// ============================================
// ANIMATION DES COMPTEURS
// ============================================
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number[data-target], .impact-number[data-target]');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                animateCounter(counter, target);
                counterObserver.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element, target) {
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Fonction d'easing
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (target - start) * easeOutQuart);
        
        // Formatage du nombre
        if (target >= 1000) {
            element.textContent = current.toLocaleString('fr-FR');
        } else {
            element.textContent = current;
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            if (target >= 1000) {
                element.textContent = target.toLocaleString('fr-FR');
            } else {
                element.textContent = target;
            }
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// ============================================
// ANIMATIONS AU SCROLL
// ============================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.value-card, .action-card, .engage-card, .transparency-card, .news-card, .impact-item'
    );
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        scrollObserver.observe(el);
    });
}

// ============================================
// FORMULAIRES
// ============================================
function initForms() {
    // Formulaire de contact
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validation
            if (!data.name || !data.email || !data.subject || !data.message) {
                showToast('Veuillez remplir tous les champs', 'error');
                return;
            }
            
            // Simulation d'envoi
            submitForm(data, 'contact')
                .then(() => {
                    showToast('Message envoyé avec succès !', 'success');
                    this.reset();
                })
                .catch(() => {
                    showToast('Erreur lors de l\'envoi. Veuillez réessayer.', 'error');
                });
        });
    }
    
    // Formulaire newsletter
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            if (!email) {
                showToast('Veuillez entrer votre email', 'error');
                return;
            }
            
            submitForm({ email }, 'newsletter')
                .then(() => {
                    showToast('Inscription à la newsletter réussie !', 'success');
                    this.reset();
                })
                .catch(() => {
                    showToast('Erreur lors de l\'inscription.', 'error');
                });
        });
    }
    
    // Formulaire partenaire
    const partnerForm = document.getElementById('partnerForm');
    if (partnerForm) {
        partnerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showToast('Demande de partenariat envoyée !', 'success');
            closeModal('partnerModal');
            this.reset();
        });
    }
    
    // Formulaire bénévole
    const volunteerForm = document.getElementById('volunteerForm');
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showToast('Inscription en tant que bénévole réussie !', 'success');
            closeModal('volunteerModal');
            this.reset();
        });
    }
    
    // Formulaire adhésion
    const memberForm = document.getElementById('memberForm');
    if (memberForm) {
        memberForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showToast('Demande d\'adhésion envoyée !', 'success');
            closeModal('memberModal');
            this.reset();
        });
    }
}

// Soumission de formulaire (simulation)
async function submitForm(data, type) {
    // Ici, vous feriez un appel API réel
    // const response = await fetch(`/api/${type}`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data)
    // });
    
    // Simulation d'un délai réseau
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Formulaire ${type} soumis:`, data);
            resolve({ success: true });
        }, 1000);
    });
}

// ============================================
// SCROLL DOUX
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// GESTION DES MODALS
// ============================================
function showPartnerModal() {
    showModal('partnerModal');
}

function showVolunteerModal() {
    showModal('volunteerModal');
}

function showMemberModal() {
    showModal('memberModal');
}

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Fermer au clic en dehors
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal(modalId);
            }
        });
        
        // Fermer avec Escape
        document.addEventListener('keydown', function escapeHandler(e) {
            if (e.key === 'Escape') {
                closeModal(modalId);
                document.removeEventListener('keydown', escapeHandler);
            }
        });
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ============================================
// NOTIFICATIONS TOAST
// ============================================
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    const toastIcon = toast.querySelector('i');
    
    toastMessage.textContent = message;
    
    // Icône selon le type
    if (type === 'error') {
        toastIcon.className = 'fas fa-exclamation-circle';
        toastIcon.style.color = '#EF4444';
    } else {
        toastIcon.className = 'fas fa-check-circle';
        toastIcon.style.color = '#22C55E';
    }
    
    toast.classList.add('active');
    
    setTimeout(() => {
        toast.classList.remove('active');
    }, 4000);
}

// ============================================
// UTILITAIRES
// ============================================

// Débounce pour les événements fréquents
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle pour les événements fréquents
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Formatage des nombres
function formatNumber(num) {
    return num.toLocaleString('fr-FR');
}

// Validation email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ============================================
// GESTION DU LANGAGE (i18n)
// ============================================
const translations = {
    fr: {
        donate: 'Faire un don',
        contact: 'Contact',
        newsletter: 'Newsletter',
        subscribe: 'S\'inscrire'
    },
    en: {
        donate: 'Donate',
        contact: 'Contact',
        newsletter: 'Newsletter',
        subscribe: 'Subscribe'
    }
};

let currentLang = 'fr';

function toggleLanguage() {
    currentLang = currentLang === 'fr' ? 'en' : 'fr';
    updateLanguage();
}

function updateLanguage() {
    const langBtn = document.getElementById('langBtn');
    if (langBtn) {
        const flag = langBtn.querySelector('.flag');
        const text = langBtn.querySelector('span:not(.flag)');
        
        if (currentLang === 'en') {
            flag.textContent = '🇬🇧';
            text.textContent = 'EN';
        } else {
            flag.textContent = '🇫🇷';
            text.textContent = 'FR';
        }
    }
    
    // Ici, vous mettriez à jour tous les textes de la page
    // en fonction de la langue sélectionnée
}

// ============================================
// GESTION DU THEME (Dark/Light mode)
// ============================================
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Charger le thème sauvegardé
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
}

// ============================================
// PERFORMANCE: Lazy Loading des images
// ============================================
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ============================================
// ANALYTICS (simulation)
// ============================================
function trackEvent(eventName, data = {}) {
    // Ici, vous enverriez les événements à votre service d'analytics
    console.log('Event tracked:', eventName, data);
}

// Tracking des clics sur les boutons de don
document.querySelectorAll('.btn-donate, .floating-donate').forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('donate_click', { location: btn.className });
    });
});

// Tracking des vues de sections
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            trackEvent('section_view', { section: entry.target.id });
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('section[id]').forEach(section => {
    sectionObserver.observe(section);
});

// ============================================
// ACCESSIBILITÉ
// ============================================

// Gestion du focus pour les modals
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            const focusableElements = activeModal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstFocusable = focusableElements[0];
            const lastFocusable = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey && document.activeElement === firstFocusable) {
                e.preventDefault();
                lastFocusable.focus();
            } else if (!e.shiftKey && document.activeElement === lastFocusable) {
                e.preventDefault();
                firstFocusable.focus();
            }
        }
    }
});

// Réduire les animations pour les utilisateurs qui le préfèrent
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.scrollBehavior = 'auto';
}

// ============================================
// SERVICE WORKER (PWA)
// ============================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered:', registration);
            })
            .catch(error => {
                console.log('SW registration failed:', error);
            });
    });
}

// ============================================
// EXPORT DES FONCTIONS GLOBALES
// ============================================
window.showPartnerModal = showPartnerModal;
window.showVolunteerModal = showVolunteerModal;
window.showMemberModal = showMemberModal;
window.closeModal = closeModal;
window.showToast = showToast;
window.toggleLanguage = toggleLanguage;
window.toggleTheme = toggleTheme;
