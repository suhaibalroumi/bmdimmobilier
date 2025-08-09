
// Main JavaScript file for Bmd Immobilier

// Global variables
let currentPage = 'home';
let filteredProperties = [...properties];
let favorites = JSON.parse(localStorage.getItem('bmd_favorites')) || [];
let userBehavior = JSON.parse(localStorage.getItem('bmd_user_behavior')) || {
    visitedCategories: {},
    favoritedTypes: {},
    viewedProperties: []
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize application
function initializeApp() {
    // Set current page based on URL
    const path = window.location.pathname;
    if (path.includes('index.html') || path === '/') {
        currentPage = 'home';
        loadHomePage();
    } else if (path.includes('properties.html')) {
        currentPage = 'properties';
        loadPropertiesPage();
    } else if (path.includes('property.html')) {
        currentPage = 'property';
        loadPropertyDetailsPage();
    } else if (path.includes('categories.html')) {
        currentPage = 'categories';
        loadCategoriesPage();
    } else if (path.includes('favorites.html')) {
        currentPage = 'favorites';
        loadFavoritesPage();
    } else if (path.includes('settings.html')) {
        currentPage = 'settings';
        loadSettingsPage();
    }

    // Update navigation
    updateNavigation();
    
    // Apply dark mode if enabled
    applyDarkMode();
}

// Navigation functions
function navigateTo(page) {
    window.location.href = page;
}

function updateNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
        const href = item.getAttribute('href');
        if ((currentPage === 'home' && href.includes('index.html')) ||
            (currentPage === 'properties' && href.includes('properties.html')) ||
            (currentPage === 'categories' && href.includes('categories.html')) ||
            (currentPage === 'favorites' && href.includes('favorites.html')) ||
            (currentPage === 'settings' && href.includes('settings.html'))) {
            item.classList.add('active');
        }
    });
}

// Home page functions
function loadHomePage() {
    loadFeaturedProperties();
    loadRecommendedProperties();
}

function loadFeaturedProperties() {
    const container = document.getElementById('featured-properties');
    if (!container) return;

    const featuredProperties = properties.filter(property => property.featured);
    container.innerHTML = '';

    featuredProperties.forEach(property => {
        const propertyCard = createPropertyCard(property);
        container.appendChild(propertyCard);
    });
}

function loadRecommendedProperties() {
    const container = document.getElementById('recommended-properties');
    if (!container) return;

    const recommendedProperties = getRecommendedProperties();
    container.innerHTML = '';

    if (recommendedProperties.length === 0) {
        // Show random properties if no recommendations
        const randomProperties = properties.slice(0, 3);
        randomProperties.forEach(property => {
            const propertyCard = createPropertyCard(property);
            container.appendChild(propertyCard);
        });
    } else {
        recommendedProperties.forEach(property => {
            const propertyCard = createPropertyCard(property);
            container.appendChild(propertyCard);
        });
    }
}

// Property card creation
function createPropertyCard(property) {
    const card = document.createElement('div');
    card.className = 'property-card';
    card.onclick = () => viewProperty(property.id);

    card.innerHTML = `
        <img src="${property.images[0]}" alt="${property.name}" class="property-image">
        <div class="property-content">
            <h3 class="property-title">${property.name}</h3>
            <div class="property-price">${property.price}</div>
            <div class="property-details">
                ${property.area} • ${property.bedrooms > 0 ? property.bedrooms + ' غرف نوم' : ''} 
                ${property.bathrooms > 0 ? '• ' + property.bathrooms + ' حمام' : ''}
            </div>
            <div class="property-location">📍 ${property.location}</div>
            <div class="flex justify-between align-center">
                <button class="btn" onclick="event.stopPropagation(); viewProperty('${property.id}')">
                    عرض التفاصيل
                </button>
                <button class="btn-favorite ${favorites.includes(property.id) ? 'active' : ''}" 
                        onclick="event.stopPropagation(); toggleFavorite('${property.id}')">
                    ${favorites.includes(property.id) ? '❤️' : '🤍'}
                </button>
            </div>
        </div>
    `;

    return card;
}

// Property viewing
function viewProperty(propertyId) {
    // Track user behavior
    trackPropertyView(propertyId);
    
    // Store property ID in localStorage
    localStorage.setItem('bmd_current_property', propertyId);
    
    // Navigate to property details page
    navigateTo('property.html');
}

// Favorites management
function toggleFavorite(propertyId) {
    const index = favorites.indexOf(propertyId);
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(propertyId);
        // Track favorite behavior
        trackFavorite(propertyId);
    }
    
    // Save to localStorage
    localStorage.setItem('bmd_favorites', JSON.stringify(favorites));
    
    // Update UI
    updateFavoriteButtons();
    
    // Reload favorites page if currently on it
    if (currentPage === 'favorites') {
        loadFavoritesPage();
    }
}

function updateFavoriteButtons() {
    const favoriteButtons = document.querySelectorAll('.btn-favorite');
    favoriteButtons.forEach(button => {
        const propertyId = button.getAttribute('onclick').match(/'([^']+)'/)[1];
        if (favorites.includes(propertyId)) {
            button.classList.add('active');
            button.innerHTML = '❤️';
        } else {
            button.classList.remove('active');
            button.innerHTML = '🤍';
        }
    });
}

// User behavior tracking
function trackPropertyView(propertyId) {
    const property = properties.find(p => p.id === propertyId);
    if (property) {
        // Track viewed properties
        if (!userBehavior.viewedProperties.includes(propertyId)) {
            userBehavior.viewedProperties.push(propertyId);
        }
        
        // Track category visits
        if (!userBehavior.visitedCategories[property.type]) {
            userBehavior.visitedCategories[property.type] = 0;
        }
        userBehavior.visitedCategories[property.type]++;
        
        // Save behavior
        localStorage.setItem('bmd_user_behavior', JSON.stringify(userBehavior));
    }
}

function trackFavorite(propertyId) {
    const property = properties.find(p => p.id === propertyId);
    if (property) {
        if (!userBehavior.favoritedTypes[property.type]) {
            userBehavior.favoritedTypes[property.type] = 0;
        }
        userBehavior.favoritedTypes[property.type]++;
        
        // Save behavior
        localStorage.setItem('bmd_user_behavior', JSON.stringify(userBehavior));
    }
}

function trackCategoryVisit(categoryType) {
    if (!userBehavior.visitedCategories[categoryType]) {
        userBehavior.visitedCategories[categoryType] = 0;
    }
    userBehavior.visitedCategories[categoryType]++;
    
    // Save behavior
    localStorage.setItem('bmd_user_behavior', JSON.stringify(userBehavior));
}

// Recommendation algorithm
function getRecommendedProperties() {
    if (userBehavior.viewedProperties.length === 0 && Object.keys(userBehavior.favoritedTypes).length === 0) {
        return [];
    }

    let scores = {};
    
    properties.forEach(property => {
        scores[property.id] = 0;
        
        // Score based on favorited types
        if (userBehavior.favoritedTypes[property.type]) {
            scores[property.id] += userBehavior.favoritedTypes[property.type] * 3;
        }
        
        // Score based on visited categories
        if (userBehavior.visitedCategories[property.type]) {
            scores[property.id] += userBehavior.visitedCategories[property.type];
        }
        
        // Score based on same city as favorited properties
        const favoritedProperties = properties.filter(p => favorites.includes(p.id));
        favoritedProperties.forEach(favProp => {
            if (favProp.city === property.city && favProp.id !== property.id) {
                scores[property.id] += 2;
            }
        });
        
        // Don't recommend already favorited properties
        if (favorites.includes(property.id)) {
            scores[property.id] = 0;
        }
        
        // Don't recommend recently viewed properties
        if (userBehavior.viewedProperties.includes(property.id)) {
            scores[property.id] *= 0.5;
        }
    });
    
    // Sort by score and return top 3
    const sortedProperties = Object.keys(scores)
        .sort((a, b) => scores[b] - scores[a])
        .slice(0, 3)
        .map(id => properties.find(p => p.id === id))
        .filter(p => p && scores[p.id] > 0);
    
    return sortedProperties;
}

// Dark mode functionality
function toggleDarkMode() {
    const isDarkMode = localStorage.getItem('bmd_dark_mode') === 'true';
    const newDarkMode = !isDarkMode;
    
    localStorage.setItem('bmd_dark_mode', newDarkMode.toString());
    applyDarkMode();
}

function applyDarkMode() {
    const isDarkMode = localStorage.getItem('bmd_dark_mode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
    
    // Update toggle switch if on settings page
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        if (isDarkMode) {
            darkModeToggle.classList.add('active');
        } else {
            darkModeToggle.classList.remove('active');
        }
    }
}

// Utility functions
function formatPrice(price) {
    return price.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getPropertyById(id) {
    return properties.find(property => property.id === id);
}

// Export functions for use in other pages
window.BmdImmobilier = {
    navigateTo,
    viewProperty,
    toggleFavorite,
    toggleDarkMode,
    trackCategoryVisit,
    getPropertyById,
    createPropertyCard,
    loadFeaturedProperties,
    loadRecommendedProperties
};



// Enhanced smart features and recommendation improvements

// Enhanced recommendation algorithm with more sophisticated scoring
function getEnhancedRecommendedProperties() {
    if (userBehavior.viewedProperties.length === 0 && Object.keys(userBehavior.favoritedTypes).length === 0) {
        return [];
    }

    let scores = {};
    
    properties.forEach(property => {
        scores[property.id] = 0;
        
        // Score based on favorited types (highest weight)
        if (userBehavior.favoritedTypes[property.type]) {
            scores[property.id] += userBehavior.favoritedTypes[property.type] * 5;
        }
        
        // Score based on visited categories
        if (userBehavior.visitedCategories[property.type]) {
            scores[property.id] += userBehavior.visitedCategories[property.type] * 2;
        }
        
        // Score based on same city as favorited properties
        const favoritedProperties = properties.filter(p => favorites.includes(p.id));
        favoritedProperties.forEach(favProp => {
            if (favProp.city === property.city && favProp.id !== property.id) {
                scores[property.id] += 3;
            }
            
            // Score based on similar price range
            const favPrice = parseFloat(favProp.price.replace(/[^\d]/g, ''));
            const propPrice = parseFloat(property.price.replace(/[^\d]/g, ''));
            const priceDiff = Math.abs(favPrice - propPrice) / favPrice;
            
            if (priceDiff < 0.3) { // Within 30% price range
                scores[property.id] += 2;
            }
        });
        
        // Boost featured properties slightly
        if (property.featured) {
            scores[property.id] += 1;
        }
        
        // Don't recommend already favorited properties
        if (favorites.includes(property.id)) {
            scores[property.id] = 0;
        }
        
        // Reduce score for recently viewed properties
        if (userBehavior.viewedProperties.includes(property.id)) {
            scores[property.id] *= 0.3;
        }
    });
    
    // Sort by score and return top properties
    const sortedProperties = Object.keys(scores)
        .sort((a, b) => scores[b] - scores[a])
        .slice(0, 6)
        .map(id => properties.find(p => p.id === id))
        .filter(p => p && scores[p.id] > 0);
    
    return sortedProperties;
}

// Smart search functionality
function smartSearch(query) {
    if (!query || query.trim() === '') {
        return properties;
    }
    
    const searchTerms = query.toLowerCase().trim().split(' ');
    
    return properties.filter(property => {
        const searchableText = `
            ${property.name} 
            ${property.type} 
            ${property.city} 
            ${property.location} 
            ${property.description}
        `.toLowerCase();
        
        return searchTerms.every(term => searchableText.includes(term));
    });
}

// Price range suggestions based on user behavior
function getPriceRangeSuggestions() {
    const favoritedProperties = properties.filter(p => favorites.includes(p.id));
    
    if (favoritedProperties.length === 0) {
        return null;
    }
    
    const prices = favoritedProperties.map(p => parseFloat(p.price.replace(/[^\d]/g, '')));
    const avgPrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    
    return {
        min: Math.floor(avgPrice * 0.7),
        max: Math.floor(avgPrice * 1.3),
        average: Math.floor(avgPrice)
    };
}

// Auto-complete suggestions for search
function getSearchSuggestions(query) {
    if (!query || query.length < 2) {
        return [];
    }
    
    const suggestions = new Set();
    const lowerQuery = query.toLowerCase();
    
    properties.forEach(property => {
        // Add property names
        if (property.name.toLowerCase().includes(lowerQuery)) {
            suggestions.add(property.name);
        }
        
        // Add cities
        if (property.city.toLowerCase().includes(lowerQuery)) {
            suggestions.add(property.city);
        }
        
        // Add types
        if (property.type.toLowerCase().includes(lowerQuery)) {
            suggestions.add(property.type);
        }
        
        // Add locations
        if (property.location.toLowerCase().includes(lowerQuery)) {
            suggestions.add(property.location);
        }
    });
    
    return Array.from(suggestions).slice(0, 5);
}

// Trending properties based on user interactions
function getTrendingProperties() {
    // Simulate trending based on featured properties and user behavior
    const trendingScores = {};
    
    properties.forEach(property => {
        trendingScores[property.id] = 0;
        
        // Featured properties get higher trending score
        if (property.featured) {
            trendingScores[property.id] += 10;
        }
        
        // Properties in frequently visited categories
        if (userBehavior.visitedCategories[property.type]) {
            trendingScores[property.id] += userBehavior.visitedCategories[property.type] * 2;
        }
        
        // Properties in same city as favorites
        const favoritedProperties = properties.filter(p => favorites.includes(p.id));
        favoritedProperties.forEach(favProp => {
            if (favProp.city === property.city) {
                trendingScores[property.id] += 3;
            }
        });
        
        // Add some randomness to simulate real trending
        trendingScores[property.id] += Math.random() * 5;
    });
    
    return Object.keys(trendingScores)
        .sort((a, b) => trendingScores[b] - trendingScores[a])
        .slice(0, 4)
        .map(id => properties.find(p => p.id === id));
}

// Recently viewed properties
function getRecentlyViewedProperties() {
    const recentIds = userBehavior.viewedProperties.slice(-5).reverse();
    return recentIds.map(id => properties.find(p => p.id === id)).filter(p => p);
}

// Property comparison functionality
function compareProperties(propertyIds) {
    return propertyIds.map(id => properties.find(p => p.id === id)).filter(p => p);
}

// Save search history
function saveSearchQuery(query) {
    if (!query || query.trim() === '') return;
    
    let searchHistory = JSON.parse(localStorage.getItem('bmd_search_history')) || [];
    
    // Remove if already exists
    searchHistory = searchHistory.filter(item => item !== query);
    
    // Add to beginning
    searchHistory.unshift(query);
    
    // Keep only last 10 searches
    searchHistory = searchHistory.slice(0, 10);
    
    localStorage.setItem('bmd_search_history', JSON.stringify(searchHistory));
}

// Get search history
function getSearchHistory() {
    return JSON.parse(localStorage.getItem('bmd_search_history')) || [];
}

// Advanced filtering with multiple criteria
function advancedFilter(criteria) {
    return properties.filter(property => {
        // Type filter
        if (criteria.type && property.type !== criteria.type) {
            return false;
        }
        
        // City filter
        if (criteria.city && property.city !== criteria.city) {
            return false;
        }
        
        // Price range filter
        const propertyPrice = parseFloat(property.price.replace(/[^\d]/g, ''));
        if (criteria.minPrice && propertyPrice < criteria.minPrice) {
            return false;
        }
        if (criteria.maxPrice && propertyPrice > criteria.maxPrice) {
            return false;
        }
        
        // Bedrooms filter
        if (criteria.minBedrooms && property.bedrooms < criteria.minBedrooms) {
            return false;
        }
        
        // Bathrooms filter
        if (criteria.minBathrooms && property.bathrooms < criteria.minBathrooms) {
            return false;
        }
        
        // Area filter
        if (criteria.minArea) {
            const propertyArea = parseFloat(property.area.replace(/[^\d]/g, ''));
            if (propertyArea < criteria.minArea) {
                return false;
            }
        }
        
        // Featured filter
        if (criteria.featuredOnly && !property.featured) {
            return false;
        }
        
        return true;
    });
}

// Property sorting options
function sortProperties(properties, sortBy) {
    const sortedProperties = [...properties];
    
    switch (sortBy) {
        case 'price_low':
            return sortedProperties.sort((a, b) => {
                const priceA = parseFloat(a.price.replace(/[^\d]/g, ''));
                const priceB = parseFloat(b.price.replace(/[^\d]/g, ''));
                return priceA - priceB;
            });
            
        case 'price_high':
            return sortedProperties.sort((a, b) => {
                const priceA = parseFloat(a.price.replace(/[^\d]/g, ''));
                const priceB = parseFloat(b.price.replace(/[^\d]/g, ''));
                return priceB - priceA;
            });
            
        case 'area_large':
            return sortedProperties.sort((a, b) => {
                const areaA = parseFloat(a.area.replace(/[^\d]/g, ''));
                const areaB = parseFloat(b.area.replace(/[^\d]/g, ''));
                return areaB - areaA;
            });
            
        case 'area_small':
            return sortedProperties.sort((a, b) => {
                const areaA = parseFloat(a.area.replace(/[^\d]/g, ''));
                const areaB = parseFloat(b.area.replace(/[^\d]/g, ''));
                return areaA - areaB;
            });
            
        case 'featured':
            return sortedProperties.sort((a, b) => {
                if (a.featured && !b.featured) return -1;
                if (!a.featured && b.featured) return 1;
                return 0;
            });
            
        default:
            return sortedProperties;
    }
}

// Update the main recommendation function to use enhanced version
function getRecommendedProperties() {
    return getEnhancedRecommendedProperties();
}

// Export enhanced functions
window.BmdImmobilier = {
    ...window.BmdImmobilier,
    smartSearch,
    getPriceRangeSuggestions,
    getSearchSuggestions,
    getTrendingProperties,
    getRecentlyViewedProperties,
    compareProperties,
    saveSearchQuery,
    getSearchHistory,
    advancedFilter,
    sortProperties,
    getEnhancedRecommendedProperties
};


// Slider functionality
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let slideInterval;

// Initialize slider
function initializeSlider() {
    if (slides.length > 0) {
        showSlide(0);
        startAutoSlide();
    }
}

// Show specific slide
function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show current slide
    if (slides[index]) {
        slides[index].classList.add('active');
    }
    if (dots[index]) {
        dots[index].classList.add('active');
    }
    
    currentSlideIndex = index;
}

// Change slide (next/previous)
function changeSlide(direction) {
    let newIndex = currentSlideIndex + direction;
    
    if (newIndex >= slides.length) {
        newIndex = 0;
    } else if (newIndex < 0) {
        newIndex = slides.length - 1;
    }
    
    showSlide(newIndex);
    resetAutoSlide();
}

// Go to specific slide
function currentSlide(index) {
    showSlide(index - 1);
    resetAutoSlide();
}

// Auto slide functionality
function startAutoSlide() {
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000); // Change slide every 5 seconds
}

function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
}

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeSlider();
});

// Pause auto slide on hover
document.addEventListener('DOMContentLoaded', function() {
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
            startAutoSlide();
        });
    }
});


// Advanced Search functionality
function initializeAdvancedSearch() {
    const searchForm = document.getElementById('advancedSearchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', handleAdvancedSearch);
    }
}

function handleAdvancedSearch(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const searchParams = {
        keyword: formData.get('keyword'),
        listingType: formData.get('listingType'),
        propertyType: formData.get('propertyType'),
        condition: formData.get('condition'),
        minPrice: formData.get('minPrice'),
        maxPrice: formData.get('maxPrice')
    };
    
    // Store search parameters
    localStorage.setItem('bmd_search_params', JSON.stringify(searchParams));
    
    // Navigate to search results page
    window.location.href = 'search-results.html';
}

function clearSearch() {
    const form = document.getElementById('advancedSearchForm');
    if (form) {
        form.reset();
    }
    
    // Clear stored search parameters
    localStorage.removeItem('bmd_search_params');
}

function performAdvancedSearch(searchParams) {
    let results = [...properties];
    
    // Filter by keyword
    if (searchParams.keyword && searchParams.keyword.trim() !== '') {
        const keyword = searchParams.keyword.toLowerCase().trim();
        results = results.filter(property => {
            const searchableText = `
                ${property.name} 
                ${property.type} 
                ${property.city} 
                ${property.location} 
                ${property.description || ''}
            `.toLowerCase();
            return searchableText.includes(keyword);
        });
    }
    
    // Filter by listing type (offer)
    if (searchParams.listingType && searchParams.listingType !== '') {
        results = results.filter(property => 
            property.offer === searchParams.listingType
        );
    }
    
    // Filter by property type
    if (searchParams.propertyType && searchParams.propertyType !== '') {
        results = results.filter(property => 
            property.type === searchParams.propertyType
        );
    }
    
    // Filter by condition
    if (searchParams.condition && searchParams.condition !== '') {
        results = results.filter(property => 
            property.condition === searchParams.condition
        );
    }
    
    // Filter by price range
    if (searchParams.minPrice && searchParams.minPrice !== '') {
        const minPrice = parseFloat(searchParams.minPrice);
        results = results.filter(property => {
            const price = parseFloat(property.price.replace(/[^\d]/g, ''));
            return price >= minPrice;
        });
    }
    
    if (searchParams.maxPrice && searchParams.maxPrice !== '') {
        const maxPrice = parseFloat(searchParams.maxPrice);
        results = results.filter(property => {
            const price = parseFloat(property.price.replace(/[^\d]/g, ''));
            return price <= maxPrice;
        });
    }
    
    return results;
}

// Initialize advanced search when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAdvancedSearch();
});

// Search suggestions functionality
function initializeSearchSuggestions() {
    const keywordInput = document.getElementById('keyword');
    if (keywordInput) {
        let suggestionTimeout;
        
        keywordInput.addEventListener('input', function() {
            clearTimeout(suggestionTimeout);
            suggestionTimeout = setTimeout(() => {
                showSearchSuggestions(this.value);
            }, 300);
        });
        
        keywordInput.addEventListener('blur', function() {
            setTimeout(() => {
                hideSearchSuggestions();
            }, 200);
        });
    }
}

function showSearchSuggestions(query) {
    if (!query || query.length < 2) {
        hideSearchSuggestions();
        return;
    }
    
    const suggestions = getSearchSuggestions(query);
    if (suggestions.length === 0) {
        hideSearchSuggestions();
        return;
    }
    
    let suggestionBox = document.getElementById('search-suggestions');
    if (!suggestionBox) {
        suggestionBox = document.createElement('div');
        suggestionBox.id = 'search-suggestions';
        suggestionBox.className = 'search-suggestions';
        
        const keywordField = document.getElementById('keyword').parentElement;
        keywordField.appendChild(suggestionBox);
    }
    
    suggestionBox.innerHTML = suggestions.map(suggestion => 
        `<div class="suggestion-item" onclick="selectSuggestion('${suggestion}')">${suggestion}</div>`
    ).join('');
    
    suggestionBox.style.display = 'block';
}

function hideSearchSuggestions() {
    const suggestionBox = document.getElementById('search-suggestions');
    if (suggestionBox) {
        suggestionBox.style.display = 'none';
    }
}

function selectSuggestion(suggestion) {
    const keywordInput = document.getElementById('keyword');
    if (keywordInput) {
        keywordInput.value = suggestion;
    }
    hideSearchSuggestions();
}

// Initialize search suggestions
document.addEventListener('DOMContentLoaded', function() {
    initializeSearchSuggestions();
});

