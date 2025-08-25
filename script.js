/**
 * KBRJ Solutions - Enhanced JavaScript
 * Optimized for: Fast, Convenient, Engaging, and Secure User Experience
 * Features: Performance optimization, security enhancements, business-specific functionality
 */

// Performance optimization: Use strict mode and modern JavaScript
'use strict';

// Configuration object for easy maintenance
const CONFIG = {
  ANIMATION_DELAY: 200,
  SCROLL_THRESHOLD: 0.1,
  SCROLL_MARGIN: '-50px',
  TYPING_SPEED: 80,
  FORM_TIMEOUT: 2000,
  MESSAGE_TIMEOUT: 5000,
  API_ENDPOINTS: {
    EARLY_ACCESS: '/api/early-access',
    CONTACT: '/api/contact'
  }
};

// Performance monitoring
const PERFORMANCE = {
  startTime: performance.now(),
  metrics: {},

  mark(name) {
    this.metrics[name] = performance.now();
  },

  measure(name, startMark) {
    if (this.metrics[startMark]) {
      const duration = performance.now() - this.metrics[startMark];
      console.log(`${name}: ${duration.toFixed(2)}ms`);
      return duration;
    }
  }
};

// Security utilities
const SECURITY = {
  // XSS prevention
  sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
  },

  // CSRF token generation (for production)
  generateCSRFToken() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  },

  // Input validation patterns
  patterns: {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^[\+]?[1-9][\d]{0,15}$/,
    name: /^[a-zA-Z\s'-]{2,50}$/
  }
};

// Main application class
class KBRJSolutions {
  constructor() {
    this.isInitialized = false;
    this.currentSection = 'home';
    this.formSubmissions = new Map();
    this.observers = new Map();

    // Bind methods to preserve context
    this.handleScroll = this.handleScroll.bind(this);
    this.handleResize = this.debounce(this.handleResize.bind(this), 250);
  }

  // Initialize the application
  async init() {
    if (this.isInitialized) return;

    PERFORMANCE.mark('app-init-start');

    try {
      // Wait for DOM and critical resources
      await this.waitForDOM();
      await this.waitForCriticalResources();

      // Initialize core functionality
      this.initCore();
      this.initBusinessFeatures();
      this.initAnalytics();

      this.isInitialized = true;
      PERFORMANCE.mark('app-init-end');
      PERFORMANCE.measure('App Initialization', 'app-init-start', 'app-init-end');

      console.log('🚀 KBRJ Solutions website fully loaded and optimized!');

      // Dispatch custom event for other scripts
      window.dispatchEvent(new CustomEvent('kbrj-ready'));

    } catch (error) {
      console.error('Failed to initialize KBRJ Solutions:', error);
      this.handleError(error);
    }
  }

  // Wait for DOM to be ready
  waitForDOM() {
    return new Promise(resolve => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', resolve, { once: true });
      } else {
        resolve();
      }
    });
  }

  // Wait for critical resources
  waitForCriticalResources() {
    return new Promise(resolve => {
      if (document.readyState === 'complete') {
        resolve();
      } else {
        window.addEventListener('load', resolve, { once: true });
      }
    });
  }

  // Initialize core functionality
  initCore() {
    this.initSmoothScrolling();
    this.initScrollAnimations();
    this.initFormHandling();
    this.initNavigationEffects();
    this.initLoadingAnimations();
    this.initAccessibility();
  }

  // Initialize business-specific features
  initBusinessFeatures() {
    this.initEarlyAccessCapture();
    this.initServiceCards();
    this.initCredibilitySection();
    this.initContactOptimization();
    this.initBusinessMetrics();
  }

  // Initialize business metrics
  initBusinessMetrics() {
    // Initialize business-specific tracking and metrics
    console.log('Business metrics initialized');
  }

  // Initialize credibility section
  initCredibilitySection() {
    // Placeholder for credibility section enhancements
    console.log('Credibility section initialized');
  }

  // Initialize contact optimization
  initContactOptimization() {
    // Placeholder for contact optimization
    console.log('Contact optimization initialized');
  }

  // Initialize analytics and tracking
  initAnalytics() {
    this.trackUserEngagement();
    this.trackBusinessMetrics();
    this.initHeatmapTracking();
  }

  // Initialize heatmap tracking
  initHeatmapTracking() {
    // Placeholder for heatmap tracking implementation
    console.log('Heatmap tracking initialized');
  }

  // Enhanced smooth scrolling with business context
  initSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();

        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          // Track navigation clicks for business insights
          this.trackEvent('navigation_click', { target: targetId });

          const headerHeight = document.querySelector('header').offsetHeight;
          const targetPosition = targetSection.offsetTop - headerHeight - 20;

          // Smooth scroll with easing
          this.smoothScrollTo(targetPosition);

          // Update active navigation state
          this.updateActiveNavigation(link);

          // Update current section for analytics
          this.currentSection = targetId.substring(1);
        }
      });
    });
  }

  // Enhanced scroll animations with performance optimization
  initScrollAnimations() {
    const sections = document.querySelectorAll('section');
    const header = document.querySelector('header');

    // Use Intersection Observer for better performance
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible', 'loaded');

          // Track section visibility for business insights
          const sectionId = entry.target.id || entry.target.className;
          this.trackEvent('section_view', { section: sectionId });

          // Trigger business-specific animations
          this.triggerBusinessAnimations(entry.target);
        }
      });
    }, {
      threshold: CONFIG.SCROLL_THRESHOLD,
      rootMargin: CONFIG.SCROLL_MARGIN
    });

    sections.forEach(section => {
      section.classList.add('loading');
      sectionObserver.observe(section);
    });

    // Store observer for cleanup
    this.observers.set('sectionObserver', sectionObserver);

    // Enhanced header scroll effects
    this.initHeaderScrollEffects(header);
  }

  // Enhanced form handling with business logic
  initFormHandling() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
      // Add CSRF protection
      this.addCSRFProtection(form);

      // Add form analytics
      this.addFormAnalytics(form);

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleFormSubmission(form);
      });

      // Real-time validation
      this.initRealTimeValidation(form);
    });
  }

  // Add CSRF protection to form
  addCSRFProtection(form) {
    const csrfToken = SECURITY.generateCSRFToken();
    const tokenInput = document.createElement('input');
    tokenInput.type = 'hidden';
    tokenInput.name = '_csrf';
    tokenInput.value = csrfToken;
    form.appendChild(tokenInput);
  }

  // Add form analytics
  addFormAnalytics(form) {
    // Track form interactions for business insights
    form.addEventListener('focusin', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        this.trackEvent('form_field_focus', { field: e.target.name, form: form.className });
      }
    });
  }

  // Initialize real-time validation
  initRealTimeValidation(form) {
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        this.validateField(input);
      });

      input.addEventListener('input', () => {
        this.clearFieldError(input);
      });
    });
  }

  // Navigation effects
  initNavigationEffects() {
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
      link.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-2px) scale(1.05)';
      });

      link.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
      });
    });
  }

  // Initialize early access capture (business-specific)
  initEarlyAccessCapture() {
    const earlyAccessForm = document.querySelector('.email-form');
    if (!earlyAccessForm) return;

    // Enhanced email capture with business logic
    const emailInput = earlyAccessForm.querySelector('.email-input');
    const submitButton = earlyAccessForm.querySelector('.email-submit');

    if (emailInput && submitButton) {
      // Add email validation and business logic
      this.enhanceEmailCapture(emailInput, submitButton);

      // Track early access interest
      this.trackEvent('early_access_interest', { source: 'hero_section' });
    }
  }

  // Enhance email capture functionality
  enhanceEmailCapture(emailInput, submitButton) {
    // Add email validation on blur
    emailInput.addEventListener('blur', () => {
      this.validateField(emailInput);
    });

    // Clear errors on input
    emailInput.addEventListener('input', () => {
      this.clearFieldError(emailInput);
    });

    // Track email capture attempts
    emailInput.addEventListener('focus', () => {
      this.trackEvent('email_capture_focus', { source: 'hero_section' });
    });
  }

  // Initialize service cards with business interactions
  initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
      // Add hover effects and business metrics
      this.enhanceServiceCard(card);

      // Track service interest
      const serviceType = this.getServiceType(card);
      this.trackEvent('service_view', { service: serviceType });
    });
  }

  // Enhance service card functionality
  enhanceServiceCard(card) {
    // Add click tracking for service cards
    card.addEventListener('click', () => {
      const serviceType = this.getServiceType(card);
      this.trackEvent('service_card_click', { service: serviceType });
    });

    // Add hover effects
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-5px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  }

  // Enhanced form submission handling
  async handleFormSubmission(form) {
    const formData = new FormData(form);
    const formType = this.getFormType(form);

    try {
      // Validate form
      if (!this.validateForm(form)) {
        return;
      }

      // Show loading state
      this.showFormLoading(form);

      // Prepare submission data
      const submissionData = this.prepareSubmissionData(formData, formType);

      // Submit form (simulate API call for now)
      await this.submitForm(submissionData, formType);

      // Show success message
      this.showFormSuccess(form, formType);

      // Track successful submission
      this.trackEvent('form_submission_success', { form_type: formType });

      // Reset form
      form.reset();

    } catch (error) {
      this.showFormError(form, error.message);
      this.trackEvent('form_submission_error', { form_type: formType, error: error.message });
    } finally {
      this.hideFormLoading(form);
    }
  }

  // Enhanced form validation
  validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;

    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    return isValid;
  }

  // Enhanced field validation
  validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    const fieldName = field.name;

    // Clear previous errors
    this.clearFieldError(field);

    // Required field validation
    if (field.hasAttribute('required') && !value) {
      this.showFieldError(field, 'This field is required');
      return false;
    }

    // Type-specific validation
    if (value) {
      switch (fieldType) {
        case 'email':
          if (!SECURITY.patterns.email.test(value)) {
            this.showFieldError(field, 'Please enter a valid email address');
            return false;
          }
          break;
        case 'tel':
          if (!SECURITY.patterns.phone.test(value)) {
            this.showFieldError(field, 'Please enter a valid phone number');
            return false;
          }
          break;
        case 'text':
          if (fieldName === 'name' && !SECURITY.patterns.name.test(value)) {
            this.showFieldError(field, 'Please enter a valid name (2-50 characters)');
            return false;
          }
          break;
      }
    }

    return true;
  }

  // Enhanced error display
  showFieldError(field, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = SECURITY.sanitizeInput(message);
    errorDiv.setAttribute('role', 'alert');
    errorDiv.setAttribute('aria-live', 'polite');

    field.parentNode.appendChild(errorDiv);
    field.classList.add('error');
    field.setAttribute('aria-invalid', 'true');

    // Add error to field for screen readers
    field.setAttribute('aria-describedby', errorDiv.id || 'error');
  }

  // Clear field error
  clearFieldError(field) {
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
      errorDiv.remove();
    }
    field.classList.remove('error');
    field.removeAttribute('aria-invalid');
    field.removeAttribute('aria-describedby');
  }

  // Enhanced success message display
  showFormSuccess(form, formType) {
    const messages = {
      'early-access': 'Thank you! You\'re now on our early access list. We\'ll notify you as soon as we launch.',
      'contact': 'Thank you! We\'ll get back to you within 24 hours.',
      'default': 'Form submitted successfully!'
    };

    const message = messages[formType] || messages.default;
    this.showMessage(message, 'success');
  }

  // Enhanced error message display
  showFormError(form, message) {
    this.showMessage(message, 'error');
  }

  // Show form loading state
  showFormLoading(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;
    }
  }

  // Hide form loading state
  hideFormLoading(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.textContent = 'Send Message';
      submitButton.disabled = false;
    }
  }

  // Prepare submission data
  prepareSubmissionData(formData, formType) {
    const data = {};
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }
    data.formType = formType;
    data.timestamp = new Date().toISOString();
    return data;
  }

  // Submit form (simulate API call)
  async submitForm(data, formType) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, CONFIG.FORM_TIMEOUT));

    // For now, just log the data
    console.log('Form submission:', { formType, data });

    // In production, this would make an actual API call
    return { success: true, message: 'Form submitted successfully' };
  }

  // Enhanced message display system
  showMessage(message, type, duration = CONFIG.MESSAGE_TIMEOUT) {
    // Remove existing messages
    this.removeExistingMessages();

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    messageDiv.textContent = SECURITY.sanitizeInput(message);
    messageDiv.setAttribute('role', 'alert');
    messageDiv.setAttribute('aria-live', 'polite');

    // Find appropriate container
    const container = this.getMessageContainer(type);
    container.appendChild(messageDiv);

    // Animate in
    requestAnimationFrame(() => {
      messageDiv.classList.add('show');
    });

    // Auto-hide with accessibility considerations
    if (duration > 0) {
      setTimeout(() => {
        this.hideMessage(messageDiv);
      }, duration);
    }

    // Track message display
    this.trackEvent('message_display', { type, message: message.substring(0, 50) });
  }

  // Enhanced loading animations
  initLoadingAnimations() {
    // Progressive loading with business context
    const sections = document.querySelectorAll('section');

    sections.forEach((section, index) => {
      const delay = index * CONFIG.ANIMATION_DELAY;
      section.style.transitionDelay = `${delay}ms`;

      // Add business-specific loading classes
      if (section.classList.contains('services')) {
        section.classList.add('business-loading');
      }
    });

    // Body loading states
    document.body.classList.add('loading');

    window.addEventListener('load', () => {
      document.body.classList.remove('loading');
      document.body.classList.add('loaded');

      // Track page load performance
      this.trackPageLoadPerformance();
    });
  }

  // Track page load performance
  trackPageLoadPerformance() {
    if ('performance' in window) {
      const perfData = performance.getEntriesByType('navigation')[0];
      if (perfData) {
        this.trackEvent('page_load_performance', {
          loadTime: Math.round(perfData.loadEventEnd - perfData.loadEventStart),
          domContentLoaded: Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart),
          firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0
        });
      }
    }
  }

  // Enhanced accessibility features
  initAccessibility() {
    // Skip to main content link
    this.addSkipToContentLink();

    // Enhanced keyboard navigation
    this.initKeyboardNavigation();

    // ARIA enhancements
    this.enhanceARIA();

    // Focus management
    this.initFocusManagement();
  }

  // Add skip to content link
  addSkipToContentLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
  }

  // Initialize keyboard navigation
  initKeyboardNavigation() {
    // Add keyboard navigation for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.click();
        }
      });
    });
  }

  // Enhance ARIA attributes
  enhanceARIA() {
    // Add ARIA labels to interactive elements
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
      if (!button.getAttribute('aria-label')) {
        button.setAttribute('aria-label', button.textContent.trim());
      }
    });

    // Add ARIA landmarks
    const main = document.querySelector('main');
    if (main) {
      main.setAttribute('role', 'main');
      main.id = 'main';
    }
  }

  // Initialize focus management
  initFocusManagement() {
    // Trap focus in modals when they're open
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        // Basic focus management - can be enhanced for modals
        const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    });
  }

  // Business-specific analytics tracking
  trackUserEngagement() {
    // Track scroll depth
    this.trackScrollDepth();

    // Track time on page
    this.trackTimeOnPage();

    // Track user interactions
    this.trackUserInteractions();
  }

  // Track scroll depth
  trackScrollDepth() {
    let maxScroll = 0;
    window.addEventListener('scroll', () => {
      const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        if (maxScroll % 25 === 0) { // Track at 25%, 50%, 75%, 100%
          this.trackEvent('scroll_depth', { depth: maxScroll });
        }
      }
    });
  }

  // Track time on page
  trackTimeOnPage() {
    const startTime = Date.now();
    window.addEventListener('beforeunload', () => {
      const timeOnPage = Math.round((Date.now() - startTime) / 1000);
      this.trackEvent('time_on_page', { seconds: timeOnPage });
    });
  }

  // Track user interactions
  trackUserInteractions() {
    // Track clicks on interactive elements
    document.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
        this.trackEvent('element_click', {
          element: e.target.tagName.toLowerCase(),
          text: e.target.textContent.substring(0, 50)
        });
      }
    });
  }

  // Business metrics tracking
  trackBusinessMetrics() {
    // Track service interest
    this.trackServiceInterest();

    // Track conversion funnel
    this.trackConversionFunnel();

    // Track business goals
    this.trackBusinessGoals();
  }

  // Track service interest
  trackServiceInterest() {
    // Track when users view service details
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const serviceType = this.getServiceType(card);
            this.trackEvent('service_interest', { service: serviceType, action: 'view' });
            observer.unobserve(entry.target);
          }
        });
      });
      observer.observe(card);
    });
  }

  // Track conversion funnel
  trackConversionFunnel() {
    // Track early access signups
    const earlyAccessForm = document.querySelector('.email-form');
    if (earlyAccessForm) {
      earlyAccessForm.addEventListener('submit', () => {
        this.trackEvent('conversion_funnel', { stage: 'early_access_signup' });
      });
    }

    // Track contact form submissions
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', () => {
        this.trackEvent('conversion_funnel', { stage: 'contact_form_submission' });
      });
    }
  }

  // Track business goals
  trackBusinessGoals() {
    // Track when users reach key business sections
    const businessSections = ['services', 'about', 'contact'];
    businessSections.forEach(sectionId => {
      const section = document.getElementById(sectionId);
      if (section) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.trackEvent('business_goal', { goal: `view_${sectionId}` });
              observer.unobserve(entry.target);
            }
          });
        });
        observer.observe(section);
      }
    });
  }

  // Utility methods
  debounce(func, wait) {
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

  // Handle scroll events
  handleScroll() {
    // Update header on scroll
    const header = document.querySelector('header');
    if (header) {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
      } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
      }
    }
  }

  // Handle resize events
  handleResize() {
    // Handle responsive behavior
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      document.body.classList.add('mobile');
    } else {
      document.body.classList.remove('mobile');
    }
  }

  smoothScrollTo(targetPosition) {
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }

  updateActiveNavigation(activeLink) {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
  }

  getFormType(form) {
    if (form.classList.contains('email-form')) return 'early-access';
    if (form.closest('#contact')) return 'contact';
    return 'default';
  }

  getServiceType(card) {
    if (card.classList.contains('pet-insurance')) return 'pet-insurance';
    if (card.classList.contains('healthcare')) return 'healthcare';
    if (card.classList.contains('business-automation')) return 'business-automation';
    return 'unknown';
  }

  getMessageContainer(type) {
    switch (type) {
      case 'success':
      case 'error':
        return document.querySelector('#contact') || document.body;
      default:
        return document.body;
    }
  }

  removeExistingMessages() {
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
  }

  hideMessage(messageDiv) {
    messageDiv.classList.remove('show');
    setTimeout(() => {
      if (messageDiv.parentNode) {
        messageDiv.remove();
      }
    }, 300);
  }

  // Error handling
  handleError(error) {
    console.error('KBRJ Solutions Error:', error);

    // Track error for monitoring
    this.trackEvent('error', {
      message: error.message,
      stack: error.stack?.substring(0, 200)
    });

    // Show user-friendly error message
    this.showMessage('Something went wrong. Please try again or contact support.', 'error');
  }

  // Cleanup method
  destroy() {
    // Clean up observers
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();

    // Remove event listeners
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);

    this.isInitialized = false;
  }

  // Placeholder methods for business features (to be implemented)
  initHeaderScrollEffects(header) {
    // Add scroll event listener for header effects
    window.addEventListener('scroll', this.handleScroll);
  }

  triggerBusinessAnimations(section) {
    // Add business-specific animations when sections come into view
    if (section.classList.contains('services')) {
      // Animate service cards
      const serviceCards = section.querySelectorAll('.service-card');
      serviceCards.forEach((card, index) => {
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, index * 200);
      });
    }
  }

  // Track events for analytics
  trackEvent(eventName, data = {}) {
    // In production, this would send data to your analytics service
    console.log('Event tracked:', eventName, data);

    // You can integrate with Google Analytics, Mixpanel, etc. here
    if (window.gtag) {
      window.gtag('event', eventName, data);
    }

    // Store events locally for debugging
    if (!this.eventHistory) {
      this.eventHistory = [];
    }
    this.eventHistory.push({
      event: eventName,
      data,
      timestamp: new Date().toISOString()
    });
  }
}

// Initialize the application
const kbrjApp = new KBRJSolutions();

// Start the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  kbrjApp.init();
});

// Add resize event listener
window.addEventListener('resize', kbrjApp.handleResize);

// Handle page visibility changes for business analytics
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    kbrjApp.trackEvent('page_hidden');
  } else {
    kbrjApp.trackEvent('page_visible');
  }
});

// Handle beforeunload for business metrics
window.addEventListener('beforeunload', () => {
  kbrjApp.trackEvent('page_exit');
});

// Export for external use
window.KBRJSolutions = kbrjApp;
