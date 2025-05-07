document.addEventListener('DOMContentLoaded', function() {
  // Initialize cart functionality
  initCart();
  
  // Load cart items
  loadCartItems();
  
  // Initialize related products on cart page
  if (document.querySelector('.cart-page')) {
    loadRelatedProducts();
  }
});

// Initialize cart functionality
function initCart() {
  // Cart icon click handler
  const cartIcon = document.getElementById('cartIcon');
  const cartSidebar = document.getElementById('cartSidebar');
  const cartOverlay = document.getElementById('cartOverlay');
  const closeCart = document.getElementById('closeCart');
  
  if (cartIcon && cartSidebar && cartOverlay && closeCart) {
    cartIcon.addEventListener('click', function(e) {
      if (!e.target.closest('a').href.endsWith('cart.html')) {
        e.preventDefault();
        openCart();
      }
    });
    
    closeCart.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
  }
  
  // Continue shopping button
  const continueShoppingBtn = document.querySelector('.cart-footer .btn-outline-secondary');
  if (continueShoppingBtn) {
    continueShoppingBtn.addEventListener('click', function() {
      closeCart();
    });
  }
  
  // Cart page buttons
  if (document.querySelector('.cart-page')) {
    const clearCartBtn = document.getElementById('clearCart');
    const updateCartBtn = document.getElementById('updateCart');
    const applyPromoBtn = document.getElementById('applyPromo');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (clearCartBtn) {
      clearCartBtn.addEventListener('click', function() {
        clearCart();
        loadCartItems();
      });
    }
    
    if (updateCartBtn) {
      updateCartBtn.addEventListener('click', function() {
        updateCart();
        showNotification('Cart updated successfully!', 'success');
      });
    }
    
    if (applyPromoBtn) {
      applyPromoBtn.addEventListener('click', function() {
        const promoCode = document.getElementById('promoCode').value.trim();
        
        if (promoCode) {
          // Check for valid promo code
          if (promoCode.toUpperCase() === 'DISCOUNT20') {
            applyDiscount(20);
            showNotification('Promo code applied successfully!', 'success');
          } else {
            showNotification('Invalid promo code.', 'error');
          }
        } else {
          showNotification('Please enter a promo code.', 'error');
        }
      });
    }
    
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', function() {
        const cart = getCart();
        
        if (cart.items.length === 0) {
          showNotification('Your cart is empty!', 'error');
          return;
        }
        
        // Show checkout modal
        const checkoutModal = new bootstrap.Modal(document.getElementById('checkoutModal'));
        checkoutModal.show();
        
        // Update checkout modal summary
        document.getElementById('modalSubtotal').textContent = `$${cart.subtotal.toFixed(2)}`;
        document.getElementById('modalShipping').textContent = `$${cart.shipping.toFixed(2)}`;
        document.getElementById('modalTax').textContent = `$${cart.tax.toFixed(2)}`;
        document.getElementById('modalTotal').textContent = `$${cart.total.toFixed(2)}`;
        
        if (cart.discount > 0) {
          document.getElementById('modalDiscountRow').style.display = 'flex';
          document.getElementById('modalDiscount').textContent = `-$${cart.discount.toFixed(2)}`;
        } else {
          document.getElementById('modalDiscountRow').style.display = 'none';
        }
      });
    }
    
    // Place order button
    const placeOrderBtn = document.getElementById('placeOrderBtn');
    if (placeOrderBtn) {
      placeOrderBtn.addEventListener('click', function() {
        const checkoutModal = bootstrap.Modal.getInstance(document.getElementById('checkoutModal'));
        checkoutModal.hide();
        
        // Show order confirmation
        setTimeout(() => {
          const orderConfirmationModal = new bootstrap.Modal(document.getElementById('orderConfirmationModal'));
          
          // Generate random order number
          const orderNumber = 'BWO-' + Math.floor(10000 + Math.random() * 90000);
          document.getElementById('orderNumber').textContent = orderNumber;
          
          // Get email from form
          const email = document.getElementById('email').value || 'your email';
          document.getElementById('confirmationEmail').textContent = email;
          
          orderConfirmationModal.show();
          
          // Clear cart after successful order
          clearCart();
          updateCartDisplay();
        }, 500);
      });
    }
    
    // Continue shopping after order
    const continueShopping = document.getElementById('continueShopping');
    if (continueShopping) {
      continueShopping.addEventListener('click', function() {
        window.location.href = 'index.html';
      });
    }
  }
}

// Open cart sidebar
function openCart() {
  const cartSidebar = document.getElementById('cartSidebar');
  const cartOverlay = document.getElementById('cartOverlay');
  
  if (cartSidebar && cartOverlay) {
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

// Close cart sidebar
function closeCart() {
  const cartSidebar = document.getElementById('cartSidebar');
  const cartOverlay = document.getElementById('cartOverlay');
  
  if (cartSidebar && cartOverlay) {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Get cart from local storage
function getCart() {
  const cart = localStorage.getItem('cart');
  
  if (cart) {
    return JSON.parse(cart);
  }
  
  return {
    items: [],
    subtotal: 0,
    shipping: 0,
    tax: 0,
    discount: 0,
    total: 0
  };
}

// Save cart to local storage
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Add item to cart
function addToCart(productId, quantity) {
  const cart = getCart();
  const product = productData.find(p => p.id === parseInt(productId));
  
  if (!product) return;
  
  // Check if product already in cart
  const existingItem = cart.items.find(item => item.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: quantity,
      category: product.category
    });
  }
  
  // Calculate totals
  calculateCartTotals(cart);
  
  // Save cart
  saveCart(cart);
  
  // Update cart display
  updateCartDisplay();
}

// Remove item from cart
function removeFromCart(productId) {
  const cart = getCart();
  
  cart.items = cart.items.filter(item => item.id !== parseInt(productId));
  
  // Calculate totals
  calculateCartTotals(cart);
  
  // Save cart
  saveCart(cart);
  
  // Update cart display
  updateCartDisplay();
}

// Update item quantity in cart
function updateCartItemQuantity(productId, quantity) {
  const cart = getCart();
  const item = cart.items.find(item => item.id === parseInt(productId));
  
  if (item) {
    item.quantity = parseInt(quantity);
    
    // Remove item if quantity is 0
    if (item.quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    // Calculate totals
    calculateCartTotals(cart);
    
    // Save cart
    saveCart(cart);
    
    // Update cart display
    updateCartDisplay();
  }
}

// Calculate cart totals
function calculateCartTotals(cart) {
  // Calculate subtotal
  cart.subtotal = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Calculate shipping (free over $100, otherwise $10)
  cart.shipping = cart.subtotal > 100 ? 0 : 10;
  
  // Calculate tax (8%)
  cart.tax = cart.subtotal * 0.08;
  
  // Calculate total
  cart.total = cart.subtotal + cart.shipping + cart.tax - cart.discount;
}

// Apply discount to cart
function applyDiscount(percent) {
  const cart = getCart();
  
  cart.discount = cart.subtotal * (percent / 100);
  cart.total = cart.subtotal + cart.shipping + cart.tax - cart.discount;
  
  saveCart(cart);
  updateCartDisplay();
}

// Clear cart
function clearCart() {
  const cart = {
    items: [],
    subtotal: 0,
    shipping: 0,
    tax: 0,
    discount: 0,
    total: 0
  };
  
  saveCart(cart);
  updateCartDisplay();
}

// Update cart display
function updateCartDisplay() {
  const cart = getCart();
  
  // Update cart count
  const cartCount = document.querySelectorAll('.cart-count');
  cartCount.forEach(count => {
    count.textContent = cart.items.reduce((total, item) => total + item.quantity, 0);
  });
  
  // Update cart sidebar
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  
  if (cartItems) {
    if (cart.items.length === 0) {
      cartItems.innerHTML = `
        <div class="empty-cart">
          <i class="fas fa-shopping-bag"></i>
          <p>Your cart is empty</p>
        </div>
      `;
    } else {
      cartItems.innerHTML = '';
      
      cart.items.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        
        cartItem.innerHTML = `
          <div class="cart-item-image">
            <img src="${item.image}" alt="${item.title}">
          </div>
          <div class="cart-item-content">
            <div class="cart-item-title">${item.title}</div>
            <div class="cart-item-variant">${item.category}</div>
            <div class="cart-item-price">
              <div class="cart-item-quantity">
                <button class="cart-quantity-btn decrease" data-id="${item.id}">-</button>
                <input type="number" class="cart-quantity-input" value="${item.quantity}" min="1" max="10" data-id="${item.id}">
                <button class="cart-quantity-btn increase" data-id="${item.id}">+</button>
              </div>
              <div class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</div>
              <div class="cart-item-remove" data-id="${item.id}"><i class="fas fa-trash-alt"></i></div>
            </div>
          </div>
        `;
        
        cartItems.appendChild(cartItem);
        
        // Add event listeners
        const decreaseBtn = cartItem.querySelector('.decrease');
        const increaseBtn = cartItem.querySelector('.increase');
        const quantityInput = cartItem.querySelector('.cart-quantity-input');
        const removeBtn = cartItem.querySelector('.cart-item-remove');
        
        decreaseBtn.addEventListener('click', function() {
          const id = this.dataset.id;
          const currentQty = parseInt(quantityInput.value);
          if (currentQty > 1) {
            updateCartItemQuantity(id, currentQty - 1);
          }
        });
        
        increaseBtn.addEventListener('click', function() {
          const id = this.dataset.id;
          const currentQty = parseInt(quantityInput.value);
          updateCartItemQuantity(id, currentQty + 1);
        });
        
        quantityInput.addEventListener('change', function() {
          const id = this.dataset.id;
          const newQty = parseInt(this.value);
          if (newQty >= 1) {
            updateCartItemQuantity(id, newQty);
          } else {
            this.value = 1;
            updateCartItemQuantity(id, 1);
          }
        });
        
        removeBtn.addEventListener('click', function() {
          const id = this.dataset.id;
          removeFromCart(id);
        });
      });
    }
  }
  
  if (cartTotal) {
    cartTotal.textContent = `$${cart.total.toFixed(2)}`;
  }
  
  // Update cart page if on cart page
  if (document.querySelector('.cart-page')) {
    updateCartPage(cart);
  }
}

// Update cart page
function updateCartPage(cart) {
  const cartTableBody = document.getElementById('cartTableBody');
  const emptyCartRow = document.getElementById('emptyCartRow');
  const cartItemCount = document.getElementById('cartItemCount');
  const cartSubtotal = document.getElementById('cartSubtotal');
  const shippingCost = document.getElementById('shippingCost');
  const taxAmount = document.getElementById('taxAmount');
  const discountAmount = document.getElementById('discountAmount');
  const discountRow = document.getElementById('discountRow');
  const orderTotal = document.getElementById('orderTotal');
  
  if (cartTableBody && emptyCartRow) {
    if (cart.items.length === 0) {
      emptyCartRow.style.display = 'table-row';
      cartTableBody.innerHTML = '';
      cartTableBody.appendChild(emptyCartRow);
    } else {
      emptyCartRow.style.display = 'none';
      cartTableBody.innerHTML = '';
      
      cart.items.forEach(item => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
          <td>
            <div class="cart-product">
              <div class="cart-product-image">
                <img src="${item.image}" alt="${item.title}">
              </div>
              <div class="cart-product-info">
                <h4>${item.title}</h4>
                <div class="cart-product-variant">${item.category}</div>
              </div>
            </div>
          </td>
          <td>$${item.price.toFixed(2)}</td>
          <td>
            <div class="cart-quantity">
              <button class="cart-quantity-btn decrease" data-id="${item.id}">-</button>
              <input type="number" class="cart-quantity-input" value="${item.quantity}" min="1" max="10" data-id="${item.id}">
              <button class="cart-quantity-btn increase" data-id="${item.id}">+</button>
            </div>
          </td>
          <td>$${(item.price * item.quantity).toFixed(2)}</td>
          <td>
            <button class="cart-remove" data-id="${item.id}">
              <i class="fas fa-times"></i>
            </button>
          </td>
        `;
        
        cartTableBody.appendChild(row);
        
        // Add event listeners
        const decreaseBtn = row.querySelector('.decrease');
        const increaseBtn = row.querySelector('.increase');
        const quantityInput = row.querySelector('.cart-quantity-input');
        const removeBtn = row.querySelector('.cart-remove');
        
        decreaseBtn.addEventListener('click', function() {
          const id = this.dataset.id;
          const currentQty = parseInt(quantityInput.value);
          if (currentQty > 1) {
            updateCartItemQuantity(id, currentQty - 1);
          }
        });
        
        increaseBtn.addEventListener('click', function() {
          const id = this.dataset.id;
          const currentQty = parseInt(quantityInput.value);
          updateCartItemQuantity(id, currentQty + 1);
        });
        
        quantityInput.addEventListener('change', function() {
          const id = this.dataset.id;
          const newQty = parseInt(this.value);
          if (newQty >= 1) {
            updateCartItemQuantity(id, newQty);
          } else {
            this.value = 1;
            updateCartItemQuantity(id, 1);
          }
        });
        
        removeBtn.addEventListener('click', function() {
          const id = this.dataset.id;
          removeFromCart(id);
        });
      });
    }
  }
  
  // Update cart summary
  if (cartItemCount) {
    const itemCount = cart.items.reduce((total, item) => total + item.quantity, 0);
    cartItemCount.textContent = `(${itemCount} item${itemCount !== 1 ? 's' : ''})`;
  }
  
  if (cartSubtotal) cartSubtotal.textContent = `$${cart.subtotal.toFixed(2)}`;
  if (shippingCost) shippingCost.textContent = `$${cart.shipping.toFixed(2)}`;
  if (taxAmount) taxAmount.textContent = `$${cart.tax.toFixed(2)}`;
  
  if (discountAmount && discountRow) {
    if (cart.discount > 0) {
      discountRow.style.display = 'flex';
      discountAmount.textContent = `-$${cart.discount.toFixed(2)}`;
    } else {
      discountRow.style.display = 'none';
    }
  }
  
  if (orderTotal) orderTotal.textContent = `$${cart.total.toFixed(2)}`;
}

// Load cart items
function loadCartItems() {
  updateCartDisplay();
}

// Update cart (for update button on cart page)
function updateCart() {
  // This function would normally sync with a server
  // For this demo, we'll just recalculate totals
  const cart = getCart();
  calculateCartTotals(cart);
  saveCart(cart);
  updateCartDisplay();
}

// Load related products on cart page
function loadRelatedProducts() {
  const relatedProductsContainer = document.getElementById('relatedProductsContainer');
  if (!relatedProductsContainer) return;
  
  const cart = getCart();
  
  // Get unique categories from cart items
  const cartCategories = [...new Set(cart.items.map(item => item.category))];
  
  // Get related products not in cart
  let relatedProducts = productData.filter(product => 
    cartCategories.includes(product.category) && 
    !cart.items.some(item => item.id === product.id)
  );
  
  // If not enough related products, add some featured products
  if (relatedProducts.length < 4) {
    const featuredProducts = productData.filter(product => 
      product.isFeatured && 
      !cart.items.some(item => item.id === product.id) &&
      !relatedProducts.some(rp => rp.id === product.id)
    );
    
    relatedProducts = [...relatedProducts, ...featuredProducts];
  }
  
  // Limit to 4 products
  relatedProducts = relatedProducts.slice(0, 4);
  
  relatedProductsContainer.innerHTML = '';
  
  relatedProducts.forEach(product => {
    relatedProductsContainer.appendChild(createProductCard(product));
  });
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