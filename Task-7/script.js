/**
 * User Directory App
 * Fetches and displays user data from JSONPlaceholder API
 */

const API_URL = 'https://jsonplaceholder.typicode.com/users';
const userGrid = document.getElementById('user-grid');
const reloadBtn = document.getElementById('reload-btn');
const errorContainer = document.getElementById('error-container');
const errorMessage = document.getElementById('error-message');
const retryBtn = document.getElementById('retry-btn');

/**
 * Fetch users from the API
 */
async function fetchUsers() {
    try {
        // UI State: Loading
        toggleLoading(true);
        hideError();
        
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const users = await response.json();
        
        // UI State: Success
        displayUsers(users);
    } catch (error) {
        console.error('Fetch error:', error);
        showError(error.message || 'Unable to connect to the server. Please check your internet connection.');
    } finally {
        toggleLoading(false);
    }
}

/**
 * Display user data in the grid
 * @param {Array} users 
 */
function displayUsers(users) {
    userGrid.innerHTML = '';
    
    if (users.length === 0) {
        userGrid.innerHTML = '<div class="initial-state"><p>No users found.</p></div>';
        return;
    }
    
    users.forEach((user, index) => {
        const card = createUserCard(user, index);
        userGrid.appendChild(card);
    });
}

/**
 * Create a user card element
 * @param {Object} user 
 * @param {Number} index 
 * @returns {HTMLElement}
 */
function createUserCard(user, index) {
    const card = document.createElement('article');
    card.className = 'user-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    // Get initials for avatar
    const initials = user.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase();

    card.innerHTML = `
        <div class="user-avatar">${initials}</div>
        <h2 class="user-name">${user.name}</h2>
        <a href="mailto:${user.email}" class="user-email">${user.email}</a>
        
        <div class="user-info">
            <div class="user-info-item">
                <div>
                    <p class="info-label">Address</p>
                    <p class="info-text">
                        ${user.address.suite}, ${user.address.street}<br>
                        ${user.address.city}, ${user.address.zipcode}
                    </p>
                </div>
            </div>
            
            <div class="user-info-item">
                <div>
                    <p class="info-label">Company</p>
                    <p class="info-text">${user.company.name}</p>
                </div>
            </div>

            <div class="user-info-item">
                <div>
                    <p class="info-label">Website</p>
                    <p class="info-text">${user.website}</p>
                </div>
            </div>
        </div>
    `;
    
    return card;
}

/**
 * Toggle button loading state
 * @param {Boolean} isLoading 
 */
function toggleLoading(isLoading) {
    if (isLoading) {
        reloadBtn.classList.add('loading');
        reloadBtn.disabled = true;
    } else {
        reloadBtn.classList.remove('loading');
        reloadBtn.disabled = false;
    }
}

/**
 * Show error message
 * @param {String} message 
 */
function showError(message) {
    errorMessage.textContent = message;
    errorContainer.classList.remove('hidden');
    userGrid.style.opacity = '0.3';
}

/**
 * Hide error message
 */
function hideError() {
    errorContainer.classList.add('hidden');
    userGrid.style.opacity = '1';
}

// Event Listeners
reloadBtn.addEventListener('click', fetchUsers);
retryBtn.addEventListener('click', fetchUsers);

// Initial Load
document.addEventListener('DOMContentLoaded', fetchUsers);
