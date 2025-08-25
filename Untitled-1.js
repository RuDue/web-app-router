// KBRJ Solutions Website JavaScript

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Email form submission
document.querySelector('.email-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const email = this.querySelector('.email-input').value;

  // Basic email validation
  if (!isValidEmail(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  // Here you would integrate with your email service (Mailchimp, ConvertKit, etc.)
  // For now, we'll show a success message
  alert('Thanks for joining! We\'ll notify you when we launch.');
  this.querySelector('.email-input').value = '';

  // Track the email signup (you can integrate with Google Analytics, etc.)
  trackEmailSignup(email);
});

// Service CTA buttons
document.querySelectorAll('.service-cta').forEach(button => {
  button.addEventListener('click', function () {
    const service = this.closest('.service-card').classList[1];
    let message = '';

    if (service === 'pet-insurance') {
      message = 'Thanks for your interest in Pet Insurance Claims automation! We\'ll notify you on October 1st when we launch.';
    } else if (service === 'healthcare') {
      message = 'Thanks for your interest in Healthcare Practice AI! We\'ll be in touch to discuss your specific needs.';
    } else {
      message = 'Thanks for your interest in Business Automation! Let\'s discuss how we can help your specific business.';
    }

    alert(message);

    // Track the specific service interest
    trackServiceInterest(service);

    // Here you would track the specific interest and potentially redirect to a more detailed form
  });
});

// Helper function to validate email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Helper function to track email signups (integrate with your analytics)
function trackEmailSignup(email) {
  // Example: Google Analytics event tracking
  // gtag('event', 'email_signup', {
  //     'email': email,
  //     'page_location': window.location.href
  // });

  console.log('Email signup tracked:', email);
}

// Helper function to track service interest (integrate with your analytics)
function trackServiceInterest(service) {
  // Example: Google Analytics event tracking
  // gtag('event', 'service_interest', {
  //     'service_type': service,
  //     'page_location': window.location.href
  // });

  console.log('Service interest tracked:', service);
}

// Add loading state to forms
function showLoading(button) {
  button.disabled = true;
  button.textContent = 'Processing...';
}

function hideLoading(button, originalText) {
  button.disabled = false;
  button.textContent = originalText;
}
