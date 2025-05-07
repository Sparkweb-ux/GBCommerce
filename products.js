document.addEventListener('DOMContentLoaded', function() {
  // Initialize products functionality
  loadFeaturedProducts();
  loadTrendingProducts();
  
  // Initialize product page functionality if on products page
  if (document.querySelector('.products-page')) {
    initProductFilters();
    loadProducts();
  }
});

// Sample product data - in a real application, this would come from an API or backend
const productData = [
  {
    id: 1,
    title: 'Premium Leather Sneakers',
    category: 'shoes',
    price: 129.99,
    oldPrice: 159.99,
    rating: 4.5,
    reviewCount: 120,
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600',
    brand: 'nike',
    colors: ['black', 'white', 'brown'],
    sizes: ['7', '8', '9', '10', '11'],
    description: 'Premium quality leather sneakers with comfortable cushioning and durable construction.',
    isNew: true,
    isFeatured: true,
    isBestSeller: true,
    tags: ['new', 'featured', 'best-seller']
  },
  {
    id: 2,
    title: 'Classic Chronograph Watch',
    category: 'watches',
    price: 249.99,
    oldPrice: 299.99,
    rating: 4.8,
    reviewCount: 85,
    image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=600',
    brand: 'rolex',
    colors: ['silver', 'gold', 'black'],
    sizes: ['one-size'],
    description: 'Elegant chronograph watch with precise movement and water-resistant design.',
    isNew: false,
    isFeatured: true,
    isBestSeller: true,
    tags: ['featured', 'best-seller']
  },
  {
    id: 3,
    title: 'Designer Leather Handbag',
    category: 'accessories',
    price: 189.99,
    oldPrice: 229.99,
    rating: 4.3,
    reviewCount: 64,
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600',
    brand: 'gucci',
    colors: ['brown', 'black', 'tan'],
    sizes: ['one-size'],
    description: 'Stylish leather handbag with multiple compartments and elegant design.',
    isNew: true,
    isFeatured: true,
    isBestSeller: false,
    tags: ['new', 'featured']
  },
  {
    id: 4,
    title: 'Premium Winter Jacket',
    category: 'jackets',
    price: 199.99,
    oldPrice: 249.99,
    rating: 4.6,
    reviewCount: 92,
    image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=600',
    brand: 'nike',
    colors: ['navy', 'black', 'green'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Warm and stylish winter jacket with water-resistant exterior and cozy insulation.',
    isNew: false,
    isFeatured: true,
    isBestSeller: true,
    tags: ['featured', 'best-seller']
  },
  {
    id: 5,
    title: 'Luxury Eau de Parfum',
    category: 'perfumes',
    price: 79.99,
    oldPrice: 99.99,
    rating: 4.9,
    reviewCount: 150,
    image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=600',
    brand: 'chanel',
    colors: ['one-color'],
    sizes: ['100ml', '50ml'],
    description: 'Luxurious fragrance with notes of jasmine, rose, and sandalwood.',
    isNew: true,
    isFeatured: true,
    isBestSeller: true,
    tags: ['new', 'featured', 'best-seller']
  },
  {
    id: 6,
    title: 'Running Shoes Pro',
    category: 'shoes',
    price: 149.99,
    oldPrice: 179.99,
    rating: 4.7,
    reviewCount: 110,
    image: 'https://images.pexels.com/photos/2529157/pexels-photo-2529157.jpeg?auto=compress&cs=tinysrgb&w=600',
    brand: 'adidas',
    colors: ['blue', 'red', 'black'],
    sizes: ['7', '8', '9', '10', '11'],
    description: 'Professional running shoes with responsive cushioning and breathable mesh.',
    isNew: false,
    isFeatured: false,
    isBestSeller: true,
    tags: ['best-seller']
  },
  {
    id: 7,
    title: 'Slim Fit Dress Watch',
    category: 'watches',
    price: 179.99,
    oldPrice: 219.99,
    rating: 4.5,
    reviewCount: 75,
    image: 'https://images.pexels.com/photos/9878238/pexels-photo-9878238.jpeg?auto=compress&cs=tinysrgb&w=600',
    brand: 'rolex',
    colors: ['silver', 'black'],
    sizes: ['one-size'],
    description: 'Elegant slim fit dress watch with genuine leather strap and minimalist design.',
    isNew: true,
    isFeatured: false,
    isBestSeller: false,
    tags: ['new']
  },
  {
    id: 8,
    title: 'Leather Belt Collection',
    category: 'accessories',
    price: 49.99,
    oldPrice: 69.99,
    rating: 4.2,
    reviewCount: 45,
    image: 'https://images.pexels.com/photos/45055/pexels-photo-45055.jpeg?auto=compress&cs=tinysrgb&w=600',
    brand: 'gucci',
    colors: ['brown', 'black'],
    sizes: ['S', 'M', 'L'],
    description: 'Premium leather belts with elegant buckle designs for formal and casual wear.',
    isNew: false,
    isFeatured: true,
    isBestSeller: false,
    tags: ['featured']
  },
  {
    id: 9,
    title: 'Sport Sunglasses',
    category: 'accessories',
    price: 89.99,
    oldPrice: 109.99,
    rating: 4.4,
    reviewCount: 58,
    image: 'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=600',
    brand: 'puma',
    colors: ['black', 'blue'],
    sizes: ['one-size'],
    description: 'Polarized sport sunglasses with UV protection and lightweight frame.',
    isNew: false,
    isFeatured: true,
    isBestSeller: false,
    tags: ['featured']
  },
  {
    id: 10,
    title: 'Leather Ankle Boots',
    category: 'shoes',
    price: 159.99,
    oldPrice: 189.99,
    rating: 4.6,
    reviewCount: 87,
    image: 'https://images.pexels.com/photos/267301/pexels-photo-267301.jpeg?auto=compress&cs=tinysrgb&w=600',
    brand: 'nike',
    colors: ['black', 'brown'],
    sizes: ['7', '8', '9', '10'],
    description: 'Stylish leather ankle boots with comfortable insole and durable construction.',
    isNew: true,
    isFeatured: true,
    isBestSeller: false,
    tags: ['new', 'featured']
  },
  {
    id: 11,
    title: 'Designer Wallet',
    category: 'accessories',
    price: 79.99,
    oldPrice: 99.99,
    rating: 4.3,
    reviewCount: 65,
    image: 'https://images.pexels.com/photos/934063/pexels-photo-934063.jpeg?auto=compress&cs=tinysrgb&w=600',
    brand: 'gucci',
    colors: ['black', 'brown'],
    sizes: ['one-size'],
    description: 'Premium leather wallet with multiple card slots and elegant design.',
    isNew: false,
    isFeatured: false,
    isBestSeller: true,
    tags: ['best-seller']
  },
  {
    id: 12,
    title: 'Summer Fragrance',
    category: 'perfumes',
    price: 69.99,
    oldPrice: 89.99,
    rating: 4.5,
    reviewCount: 95,
    image: 'https://images.pexels.com/photos/3910071/pexels-photo-3910071.jpeg?auto=compress&cs=tinysrgb&w=600',
    brand: 'chanel',
    colors: ['one-color'],
    sizes: ['100ml', '50ml'],
    description: 'Fresh summer fragrance with citrus and floral notes.',
    isNew: true,
    isFeatured: false,
    isBestSeller: true,
    tags: ['new', 'best-seller']
  }
];

// Load featured products for homepage
function loadFeaturedProducts() {
  const featuredContainer = document.getElementById('featuredProductsContainer');
  if (!featuredContainer) return;
  
  const featuredProducts = productData.filter(product => product.isFeatured);
  
  featuredContainer.innerHTML = '';
  
  featuredProducts.slice(0, 4).forEach(product => {
    featuredContainer.appendChild(createProductCard(product));
  });
}

// Load trending products for homepage tabs
function loadTrendingProducts() {
  const newArrivalsContainer = document.getElementById('newArrivalsContainer');
  const bestSellersContainer = document.getElementById('bestSellersContainer');
  const topRatedContainer = document.getElementById('topRatedContainer');
  
  if (!newArrivalsContainer && !bestSellersContainer && !topRatedContainer) return;
  
  const newArrivals = productData.filter(product => product.isNew);
  const bestSellers = productData.filter(product => product.isBestSeller);
  const topRated = [...productData].sort((a, b) => b.rating - a.rating);
  
  if (newArrivalsContainer) {
    newArrivalsContainer.innerHTML = '';
    newArrivals.slice(0, 4).forEach(product => {
      newArrivalsContainer.appendChild(createProductCard(product));
    });
  }
  
  if (bestSellersContainer) {
    bestSellersContainer.innerHTML = '';
    bestSellers.slice(0, 4).forEach(product => {
      bestSellersContainer.appendChild(createProductCard(product));
    });
  }
  
  if (topRatedContainer) {
    topRatedContainer.innerHTML = '';
    topRated.slice(0, 4).forEach(product => {
      topRatedContainer.appendChild(createProductCard(product));
    });
  }
}

// Create a product card element
function createProductCard(product) {
  const col = document.createElement('div');
  col.classList.add('col-6', 'col-md-4', 'col-lg-3');
  col.setAttribute('data-aos', 'fade-up');
  
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
  
  col.innerHTML = `
    <div class="product-card" data-id="${product.id}">
      <div class="product-image">
        <img src="${product.image}" alt="${product.title}">
        ${product.isNew ? '<span class="product-tag tag-new">New</span>' : ''}
        ${discount > 0 ? `<span class="product-tag tag-sale">-${discount}%</span>` : ''}
        <div class="product-actions">
          <button class="action-btn add-to-wishlist" title="Add to wishlist">
            <i class="far fa-heart"></i>
          </button>
          <button class="action-btn quick-view-btn" title="Quick view">
            <i class="far fa-eye"></i>
          </button>
          <button class="action-btn add-to-compare" title="Compare">
            <i class="fas fa-exchange-alt"></i>
          </button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-category">${product.category}</div>
        <h3 class="product-title">${product.title}</h3>
        <div class="product-rating">
          ${getRatingStars(product.rating)}
          <span class="rating-count">(${product.reviewCount})</span>
        </div>
        <div class="product-price">
          <span class="current-price">$${product.price.toFixed(2)}</span>
          ${product.oldPrice ? `<span class="old-price">$${product.oldPrice.toFixed(2)}</span>` : ''}
          ${discount > 0 ? `<span class="discount-percent">${discount}% off</span>` : ''}
        </div>
        <div class="product-colors">
          ${product.colors.slice(0, 3).map(color => {
            if (color === 'one-color') return '';
            return `<div class="color-option" style="background-color: ${getColorCode(color)}" title="${color}"></div>`;
          }).join('')}
        </div>
        <div class="product-footer">
          <button class="add-to-cart" data-id="${product.id}">
            <i class="fas fa-shopping-cart me-2"></i>Add to Cart
          </button>
        </div>
      </div>
    </div>
  `;
  
  // Add event listeners
  const addToCartBtn = col.querySelector('.add-to-cart');
  addToCartBtn.addEventListener('click', function() {
    addToCart(product.id, 1);
    showNotification('Product added to cart!', 'success');
  });
  
  const wishlistBtn = col.querySelector('.add-to-wishlist');
  wishlistBtn.addEventListener('click', function() {
    showNotification('Product added to wishlist!', 'success');
  });
  
  const compareBtn = col.querySelector('.add-to-compare');
  compareBtn.addEventListener('click', function() {
    showNotification('Product added to compare list!', 'success');
  });
  
  return col;
}

// Generate HTML for rating stars
function getRatingStars(rating) {
  let starsHtml = '';
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  for (let i = 0; i < fullStars; i++) {
    starsHtml += '<i class="fas fa-star"></i>';
  }
  
  if (hasHalfStar) {
    starsHtml += '<i class="fas fa-star-half-alt"></i>';
  }
  
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    starsHtml += '<i class="far fa-star"></i>';
  }
  
  return starsHtml;
}

// Get CSS color code from color name
function getColorCode(color) {
  const colorMap = {
    'black': '#000000',
    'white': '#FFFFFF',
    'red': '#E74C3C',
    'blue': '#3498DB',
    'green': '#2ECC71',
    'yellow': '#F1C40F',
    'brown': '#795548',
    'grey': '#95A5A6',
    'silver': '#BDC3C7',
    'gold': '#F39C12',
    'navy': '#0A2463',
    'tan': '#D0B49F'
  };
  
  return colorMap[color] || '#000000';
}

// Load products for the product page
function loadProducts() {
  const productsGrid = document.getElementById('productsGrid');
  if (!productsGrid) return;
  
  // Get URL parameters to filter products
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');
  
  // Update page title and breadcrumb
  if (categoryParam) {
    const categoryTitle = document.getElementById('categoryTitle');
    const breadcrumbCategory = document.getElementById('breadcrumbCategory');
    
    if (categoryTitle) {
      categoryTitle.textContent = `${categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)}`;
    }
    
    if (breadcrumbCategory) {
      breadcrumbCategory.textContent = `${categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)}`;
    }
    
    // Check the corresponding category filter checkbox
    const categoryCheckbox = document.getElementById(`category${categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)}`);
    if (categoryCheckbox) {
      categoryCheckbox.checked = true;
    }
  }
  
  // Filter products based on URL parameter
  let filteredProducts = [...productData];
  if (categoryParam) {
    filteredProducts = productData.filter(product => product.category === categoryParam);
  }
  
  // Update product count
  const productCount = document.getElementById('productCount');
  if (productCount) {
    productCount.textContent = filteredProducts.length;
  }
  
  // Sort products (default: featured)
  sortProducts(filteredProducts);
  
  // Clear grid and add products
  productsGrid.innerHTML = '';
  
  if (filteredProducts.length === 0) {
    productsGrid.innerHTML = `
      <div class="col-12 text-center py-5">
        <div class="no-products">
          <i class="fas fa-search fa-3x mb-3"></i>
          <h3>No products found</h3>
          <p>Try adjusting your filters or search criteria.</p>
        </div>
      </div>
    `;
    return;
  }
  
  filteredProducts.forEach(product => {
    productsGrid.appendChild(createProductCard(product));
  });
  
  // Create pagination
  createPagination(filteredProducts.length);
}

// Create pagination links
function createPagination(totalProducts) {
  const paginationContainer = document.getElementById('pagination');
  if (!paginationContainer) return;
  
  const productsPerPage = 8;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  
  paginationContainer.innerHTML = '';
  
  // Previous button
  const prevLi = document.createElement('li');
  prevLi.classList.add('page-item');
  prevLi.innerHTML = `
    <a class="page-link" href="#" aria-label="Previous">
      <span aria-hidden="true">&laquo;</span>
    </a>
  `;
  paginationContainer.appendChild(prevLi);
  
  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    const pageLi = document.createElement('li');
    pageLi.classList.add('page-item');
    if (i === 1) pageLi.classList.add('active');
    
    pageLi.innerHTML = `<a class="page-link" href="#">${i}</a>`;
    paginationContainer.appendChild(pageLi);
  }
  
  // Next button
  const nextLi = document.createElement('li');
  nextLi.classList.add('page-item');
  nextLi.innerHTML = `
    <a class="page-link" href="#" aria-label="Next">
      <span aria-hidden="true">&raquo;</span>
    </a>
  `;
  paginationContainer.appendChild(nextLi);
  
  // Add event listeners
  const pageLinks = paginationContainer.querySelectorAll('.page-link');
  pageLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // In a real application, this would load the appropriate page of products
      paginationContainer.querySelectorAll('.page-item').forEach(item => {
        item.classList.remove('active');
      });
      
      if (!this.getAttribute('aria-label')) {
        this.parentElement.classList.add('active');
      }
    });
  });
}

// Sort products based on selected option
function sortProducts(products) {
  const sortOptions = document.getElementById('sortOptions');
  if (!sortOptions) return products;
  
  const sortBy = sortOptions.value;
  
  switch (sortBy) {
    case 'price-low':
      products.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      products.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
      products.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      break;
    case 'rating':
      products.sort((a, b) => b.rating - a.rating);
      break;
    case 'featured':
    default:
      products.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
  }
  
  return products;
}

// Initialize product filters
function initProductFilters() {
  // Price Range Slider
  const priceRange = document.getElementById('priceRange');
  if (priceRange && window.noUiSlider) {
    noUiSlider.create(priceRange, {
      start: [0, 300],
      connect: true,
      step: 10,
      range: {
        'min': 0,
        'max': 300
      },
      format: {
        to: function (value) {
          return Math.round(value);
        },
        from: function (value) {
          return Math.round(value);
        }
      }
    });
    
    const priceMin = document.getElementById('priceMin');
    const priceMax = document.getElementById('priceMax');
    
    if (priceMin && priceMax) {
      priceRange.noUiSlider.on('update', function (values, handle) {
        if (handle === 0) {
          priceMin.value = `$${values[0]}`;
        } else {
          priceMax.value = `$${values[1]}`;
        }
      });
    }
  }
  
  // Sort options
  const sortOptions = document.getElementById('sortOptions');
  if (sortOptions) {
    sortOptions.addEventListener('change', function() {
      loadProducts();
    });
  }
  
  // Color filters
  const colorOptions = document.querySelectorAll('.filter-colors .color-option');
  colorOptions.forEach(option => {
    option.addEventListener('click', function() {
      this.classList.toggle('active');
      // Filter products based on selected colors
      loadProducts();
    });
  });
  
  // Size filters
  const sizeOptions = document.querySelectorAll('.filter-sizes .size-option');
  sizeOptions.forEach(option => {
    option.addEventListener('click', function() {
      this.classList.toggle('active');
      // Filter products based on selected sizes
      loadProducts();
    });
  });
  
  // Category filters
  const categoryFilters = document.querySelectorAll('.category-filter');
  categoryFilters.forEach(filter => {
    filter.addEventListener('change', function() {
      // Filter products based on selected categories
      loadProducts();
    });
  });
  
  // Brand filters
  const brandFilters = document.querySelectorAll('.brand-filter');
  brandFilters.forEach(filter => {
    filter.addEventListener('change', function() {
      // Filter products based on selected brands
      loadProducts();
    });
  });
  
  // Rating filters
  const ratingFilters = document.querySelectorAll('.rating-filter');
  ratingFilters.forEach(filter => {
    filter.addEventListener('change', function() {
      // Filter products based on selected ratings
      loadProducts();
    });
  });
  
  // Clear filters button
  const clearFiltersBtn = document.getElementById('clearFilters');
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', function() {
      // Reset all filters
      document.querySelectorAll('.category-filter, .brand-filter, .rating-filter').forEach(checkbox => {
        checkbox.checked = false;
      });
      
      document.querySelectorAll('.filter-colors .color-option, .filter-sizes .size-option').forEach(option => {
        option.classList.remove('active');
      });
      
      if (priceRange && priceRange.noUiSlider) {
        priceRange.noUiSlider.set([0, 300]);
      }
      
      // Reload products
      window.location.href = 'products.html';
    });
  }
  
  // Mobile filters toggle
  const showFiltersBtn = document.getElementById('showFilters');
  const closeFiltersBtn = document.getElementById('closeFilters');
  const filterSidebar = document.querySelector('.filter-sidebar');
  
  if (showFiltersBtn && closeFiltersBtn && filterSidebar) {
    showFiltersBtn.addEventListener('click', function() {
      filterSidebar.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
    
    closeFiltersBtn.addEventListener('click', function() {
      filterSidebar.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
}