// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add scroll effect to header
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (window.scrollY > 100) {
    header.style.background = 'rgba(16, 164, 201, 0.95)';
    header.style.backdropFilter = 'blur(10px)';
  } else {
    header.style.background = '#125350ff';
    header.style.backdropFilter = 'none';
  }
});

// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all service cards and tool cards
document.querySelectorAll('.service-card, .tool-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(card);
});

// Add hover effects to badges
document.querySelectorAll('.badge').forEach(badge => {
  badge.addEventListener('mouseenter', () => {
    badge.style.transform = 'scale(1.05)';
  });
  
  badge.addEventListener('mouseleave', () => {
    badge.style.transform = 'scale(1)';
  });
});

// Add click handlers for buttons
document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', (e) => {
    // Add ripple effect
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
  button {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Mobile menu toggle (if needed)
const createMobileMenu = () => {
  if (window.innerWidth <= 768) {
    const nav = document.querySelector('.nav');
    const header = document.querySelector('.header .container');
    
    if (!document.querySelector('.mobile-menu-toggle')) {
      const toggleButton = document.createElement('button');
      toggleButton.className = 'mobile-menu-toggle';
      toggleButton.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" stroke-width="2"/>
        </svg>
      `;
      
      toggleButton.addEventListener('click', () => {
        nav.classList.toggle('mobile-nav-open');
      });
      
      header.appendChild(toggleButton);
    }
  }
};

// Initialize mobile menu on load and resize
window.addEventListener('load', createMobileMenu);
window.addEventListener('resize', createMobileMenu);

// Add mobile navigation styles
const mobileStyle = document.createElement('style');
mobileStyle.textContent = `
  @media (max-width: 768px) {
    .mobile-menu-toggle {
      display: block;
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      padding: 8px;
    }
    
    .nav {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: #2388a1ff;
      flex-direction: column;
      padding: 1rem;
      transform: translateY(-100%);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    }
    
    .nav.mobile-nav-open {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }
  }
  
  @media (min-width: 769px) {
    .mobile-menu-toggle {
      display: none;
    }
  }
`;
document.head.appendChild(mobileStyle);
