import { Product } from './product.js';

//  TASK 1 & 4 – Fetch & Display and Loading/Error States
const fetchBtn = document.querySelector('#fetch-btn');
const userContainer = document.querySelector('#user-cards');
fetchBtn.addEventListener('click', async () => {
    // Show loading
    userContainer.innerHTML = `<p class="loading">⏳ Loading users...</p>`;

    try {
        // Intentionally break the URL to test error: change 'users' to 'usrs'
        const res = await fetch('https://jsonplaceholder.typicode.com/users');

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        const users = await res.json();

        userContainer.innerHTML = users
            .map(
                (u) => `
                    <div class="card">
                        <h4>${u.name}</h4>
                        <p class="email">📧 ${u.email}</p>
                    </div>
                `
            )
            .join('');
    } catch (error) {
        userContainer.innerHTML = `
            <p class="error-msg">
                ❌ Failed to load users. Please try again.<br />
                <small>(${error.message})</small>
            </p>
        `;
        console.error('Fetch error:', error);
    }
});

// 2: Create products using the Product class
const products = [
    new Product('Gaming Laptop', 12000),
    new Product('Wireless Earbuds', 2500),
    new Product('Smart Watch', 4500),
    new Product('Mechanical Keyboard', 1800),
];

// 3: Cart state – load from localStorage
let cart = JSON.parse(localStorage.getItem('lab10_cart')) || [];

const productList = document.querySelector('#product-list');
const cartContainer = document.querySelector('#cart-items');
const cartTotalSpan = document.querySelector('#cart-total');

// Helper to save and re-render
function saveCartAndRender() {
    localStorage.setItem('lab10_cart', JSON.stringify(cart));
    renderCart();
}

// Render the cart
function renderCart() {
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="placeholder">Cart is empty.</p>';
        cartTotalSpan.textContent = '0.00';
        return;
    }

    cartContainer.innerHTML = cart
        .map(
            (item) => `
                <div class="cart-item">
                    <span>${item.name}</span>
                    <span>K${item.price.toFixed(2)}</span>
                </div>
            `
        )
        .join('');

    const total = cart.reduce((sum, item) => sum + item.withTax(), 0);
    cartTotalSpan.textContent = total.toFixed(2);
}

// Render product cards
function renderProducts() {
    productList.innerHTML = '';

    products.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
            <h4>${product.name}</h4>
            <p class="price">K${product.price.toFixed(2)} (tax: K${product.withTax().toFixed(2)})</p>
            <button class="btn-sm" data-index="${index}">Add to Cart</button>
        `;

        const btn = card.querySelector('button');
        btn.addEventListener('click', () => {
            cart.push(products[index]);
            saveCartAndRender();
            btn.textContent = '✅ Added!';
            setTimeout(() => (btn.textContent = 'Add to Cart'), 800);
        });

        productList.appendChild(card);
    });
}
renderProducts();
renderCart();