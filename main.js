document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS animations
  AOS.init({
    duration: 800,
    easing: 'ease',
    once: true,
    offset: 50
  });

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  }
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Search functionality
  const searchIcon = document.getElementById('searchIcon');
  const searchOverlay = document.getElementById('searchOverlay');
  const closeSearch = document.getElementById('closeSearch');
  
  if (searchIcon && searchOverlay && closeSearch) {
    searchIcon.addEventListener('click', function(e) {
      e.preventDefault();
      searchOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      // Focus on search input
      const searchInput = searchOverlay.querySelector('input');
      if (searchInput) {
        setTimeout(() => {
          searchInput.focus();
        }, 100);
      }
    });
    
    closeSearch.addEventListener('click', function() {
      searchOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
    
    // Close search on ESC key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
        searchOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Hero slider functionality
  initHeroSlider();

  // Testimonial slider
  initTestimonialSlider();

  // Back to top button
  const backToTopBtn = document.querySelector('.back-to-top');
  
  if (backToTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('active');
      } else {
        backToTopBtn.classList.remove('active');
      }
    });
    
    backToTopBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Quick View functionality
  initQuickView();
});

// Hero Slider functionality
function initHeroSlider() {
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroDots = document.querySelector('.hero-dots');
  const prevSlide = document.querySelector('.prev-slide');
  const nextSlide = document.querySelector('.next-slide');
  
  if (heroSlides.length === 0) return;
  
  let currentSlide = 0;
  let slideInterval;
  
  // Create dots
  if (heroDots) {
    heroSlides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('hero-dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        clearInterval(slideInterval);
        goToSlide(index);
        startSlideInterval();
      });
      heroDots.appendChild(dot);
    });
  }
  
  // Control buttons
  if (prevSlide) {
    prevSlide.addEventListener('click', () => {
      clearInterval(slideInterval);
      goToSlide(currentSlide - 1);
      startSlideInterval();
    });
  }
  
  if (nextSlide) {
    nextSlide.addEventListener('click', () => {
      clearInterval(slideInterval);
      goToSlide(currentSlide + 1);
      startSlideInterval();
    });
  }
  
  // Change slide
  function goToSlide(index) {
    heroSlides[currentSlide].classList.remove('active');
    
    const dots = document.querySelectorAll('.hero-dot');
    if (dots.length > 0) {
      dots[currentSlide].classList.remove('active');
    }
    
    currentSlide = (index + heroSlides.length) % heroSlides.length;
    
    heroSlides[currentSlide].classList.add('active');
    if (dots.length > 0) {
      dots[currentSlide].classList.add('active');
    }
  }
  
  // Auto slide
  function startSlideInterval() {
    slideInterval = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 5000);
  }
  
  startSlideInterval();
}

// Testimonial Slider functionality
function initTestimonialSlider() {
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const testimonialDots = document.querySelector('.testimonial-dots');
  const prevTestimonial = document.querySelector('.prev-testimonial');
  const nextTestimonial = document.querySelector('.next-testimonial');
  
  if (testimonialSlides.length === 0) return;
  
  let currentTestimonial = 0;
  
  // Create dots
  if (testimonialDots) {
    testimonialSlides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('testimonial-dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        goToTestimonial(index);
      });
      testimonialDots.appendChild(dot);
    });
  }
  
  // Control buttons
  if (prevTestimonial) {
    prevTestimonial.addEventListener('click', () => {
      goToTestimonial(currentTestimonial - 1);
    });
  }
  
  if (nextTestimonial) {
    nextTestimonial.addEventListener('click', () => {
      goToTestimonial(currentTestimonial + 1);
    });
  }
  
  // Change testimonial
  function goToTestimonial(index) {
    testimonialSlides[currentTestimonial].classList.remove('active');
    
    const dots = document.querySelectorAll('.testimonial-dot');
    if (dots.length > 0) {
      dots[currentTestimonial].classList.remove('active');
    }
    
    currentTestimonial = (index + testimonialSlides.length) % testimonialSlides.length;
    
    testimonialSlides[currentTestimonial].classList.add('active');
    if (dots.length > 0) {
      dots[currentTestimonial].classList.add('active');
    }
  }
}

// Quick View functionality
function initQuickView() {
  const quickViewModal = document.getElementById('quickViewModal');
  
  if (!quickViewModal) return;
  
  const quickViewBtns = document.querySelectorAll('.quick-view-btn');
  
  quickViewBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // In a real application, you would fetch product data
      // Here we're using demo data
      const productCard = this.closest('.product-card');
      const productId = productCard.dataset.id;
      
      // Populate quick view modal with product data
      populateQuickView(productId);
      
      // Show the modal
      const bsModal = new bootstrap.Modal(quickViewModal);
      bsModal.show();
    });
  });
  
  // Add to cart from quick view
  const quickViewAddToCart = document.getElementById('quickViewAddToCart');
  if (quickViewAddToCart) {
    quickViewAddToCart.addEventListener('click', function() {
      const productId = this.dataset.productId;
      const quantity = parseInt(document.getElementById('quickViewQuantity').value, 10);
      
      // Add to cart logic
      addToCart(productId, quantity);
      
      // Close the modal
      const bsModal = bootstrap.Modal.getInstance(quickViewModal);
      bsModal.hide();
      
      // Show success message
      showNotification('Product added to cart!', 'success');
    });
  }
  
  // Quantity buttons
  const decreaseBtn = document.getElementById('decreaseQuantity');
  const increaseBtn = document.getElementById('increaseQuantity');
  const quantityInput = document.getElementById('quickViewQuantity');
  
  if (decreaseBtn && increaseBtn && quantityInput) {
    decreaseBtn.addEventListener('click', function() {
      let quantity = parseInt(quantityInput.value, 10);
      if (quantity > 1) {
        quantityInput.value = quantity - 1;
      }
    });
    
    increaseBtn.addEventListener('click', function() {
      let quantity = parseInt(quantityInput.value, 10);
      quantityInput.value = quantity + 1;
    });
  }
}

// Populate Quick View with product data
function populateQuickView(productId) {
  // In a real application, you would fetch this data from an API
  // Here we're using demo data
  const productData = {
    title: 'Premium Leather Sneakers',
    price: '$129.99',
    oldPrice: '$159.99',
    rating: '4.5 (120 reviews)',
    description: 'Premium quality leather sneakers with comfortable cushioning and durable construction. Perfect for everyday wear and casual outings.',
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    sizes: ['7', '8', '9', '10', '11'],
    colors: [
      { name: 'Black', code: '#000000' },
      { name: 'White', code: '#FFFFFF' },
      { name: 'Brown', code: '#795548' },
      { name: 'Navy', code: '#0A2463' }
    ]
  };
  
  // Set product data in modal
  const modal = document.getElementById('quickViewModal');
  if (!modal) return;
  
  document.getElementById('quickViewTitle').textContent = productData.title;
  document.getElementById('quickViewPrice').textContent = productData.price;
  document.getElementById('quickViewOldPrice').textContent = productData.oldPrice;
  document.getElementById('quickViewRating').textContent = productData.rating;
  document.getElementById('quickViewDescription').textContent = productData.description;
  document.getElementById('quickViewImage').src = productData.image;
  document.getElementById('quickViewAddToCart').dataset.productId = productId;
  
  // Populate sizes
  const sizesContainer = document.getElementById('quickViewSizes');
  sizesContainer.innerHTML = '';
  
  productData.sizes.forEach(size => {
    const sizeElement = document.createElement('div');
    sizeElement.classList.add('size-option');
    sizeElement.textContent = size;
    sizeElement.addEventListener('click', function() {
      document.querySelectorAll('#quickViewSizes .size-option').forEach(el => {
        el.classList.remove('active');
      });
      this.classList.add('active');
    });
    sizesContainer.appendChild(sizeElement);
  });
  
  // Populate colors
  const colorsContainer = document.getElementById('quickViewColors');
  colorsContainer.innerHTML = '';
  
  productData.colors.forEach(color => {
    const colorElement = document.createElement('div');
    colorElement.classList.add('color-option');
    colorElement.style.backgroundColor = color.code;
    if (color.name === 'White') {
      colorElement.style.border = '1px solid #ddd';
    }
    colorElement.title = color.name;
    colorElement.addEventListener('click', function() {
      document.querySelectorAll('#quickViewColors .color-option').forEach(el => {
        el.classList.remove('active');
      });
      this.classList.add('active');
    });
    colorsContainer.appendChild(colorElement);
  });
  
  // Reset quantity
  document.getElementById('quickViewQuantity').value = 1;
}

// Show notification
function showNotification(message, type = 'info') {
  // Check if notification container exists, if not create it
  let notifContainer = document.querySelector('.notification-container');
  
  if (!notifContainer) {
    notifContainer = document.createElement('div');
    notifContainer.classList.add('notification-container');
    document.body.appendChild(notifContainer);
    
    // Style the container
    notifContainer.style.position = 'fixed';
    notifContainer.style.top = '20px';
    notifContainer.style.right = '20px';
    notifContainer.style.zIndex = '9999';
  }
  
  // Create notification
  const notification = document.createElement('div');
  notification.classList.add('notification', `notification-${type}`);
  notification.innerHTML = `
    <div class="notification-content">
      <p>${message}</p>
    </div>
    <button class="notification-close">&times;</button>
  `;
  
  // Style notification
  notification.style.backgroundColor = type === 'success' ? '#2ECC71' : '#3498DB';
  notification.style.color = '#FFF';
  notification.style.padding = '12px 20px';
  notification.style.borderRadius = '4px';
  notification.style.marginBottom = '10px';
  notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
  notification.style.display = 'flex';
  notification.style.justifyContent = 'space-between';
  notification.style.alignItems = 'center';
  notification.style.opacity = '0';
  notification.style.transform = 'translateX(50px)';
  notification.style.transition = 'all 0.3s ease';
  
  // Style close button
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.style.background = 'none';
  closeBtn.style.border = 'none';
  closeBtn.style.color = '#FFF';
  closeBtn.style.fontSize = '20px';
  closeBtn.style.cursor = 'pointer';
  closeBtn.style.marginLeft = '10px';
  
  // Add to container
  notifContainer.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.opacity = '1';
    notification.style.transform = 'translateX(0)';
  }, 10);
  
  // Close on button click
  closeBtn.addEventListener('click', () => {
    closeNotification(notification);
  });
  
  // Auto close after 3 seconds
  setTimeout(() => {
    closeNotification(notification);
  }, 3000);
}

// Close notification function
function closeNotification(notification) {
  notification.style.opacity = '0';
  notification.style.transform = 'translateX(50px)';
  
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 300);
}