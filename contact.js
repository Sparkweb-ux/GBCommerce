document.addEventListener('DOMContentLoaded', function() {
  // Initialize contact form
  initContactForm();
});

// Initialize contact form
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Validate form
      if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields.', 'error');
        return;
      }
      
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
      }
      
      // Simulate form submission
      contactForm.reset();
      
      // Show success message
      const formSuccess = document.getElementById('formSuccess');
      
      if (formSuccess) {
        formSuccess.style.display = 'block';
        
        setTimeout(() => {
          formSuccess.style.display = 'none';
        }, 5000);
      }
      
      showNotification('Your message has been sent successfully!', 'success');
    });
  }
}

// Show notification function (duplicated from main.js for modularity)
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
  notification.style.backgroundColor = type === 'success' ? '#2ECC71' : type === 'error' ? '#E74C3C' : '#3498DB';
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