function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}
// Don't miss to make cart icon with class cart-count
function updateCartCount() {
    const cart = getCart();
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }
}

function renderCart() {
    const cart = getCart();
    const container = document.getElementById('cart-items-container');

    if (!container) return;

    container.innerHTML = '';

    if (cart.length === 0) {
        container.innerHTML = '<p style="text-align:center; padding: 20px;">Your cart is empty.</p>';
        updateTotals();
        return;
    }

    cart.forEach(item => {
        const total = (item.price * item.quantity).toFixed(2);

        const itemHTML = `
            <div class="cart-item" data-id="${item.id}">
                <div class="col-product product-info">
                    <div class="product-image">
                        <img src="${item.image}" alt="${item.name}">
                        <button class="remove-btn" onclick="removeItem(${item.id})">×</button>
                    </div>
                    <div class="product-details">
                        <h4>${item.name}</h4>
                        <p>Color: ${item.color}</p>
                        <p>Size: ${item.size}</p>
                    </div>
                </div>
                <div class="col-price">$${item.price.toFixed(2)}</div>
                <div class="col-quantity">
                    <div class="quantity-box">
                        <button onclick="changeQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="changeQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <div class="col-total">£${total}</div>
            </div>
        `;
        container.innerHTML += itemHTML;
    });

    updateTotals();
    updateCartCount();
}

function updateTotals() {
    const cart = getCart();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const subtotalEl = document.getElementById('cart-subtotal');
    const totalEl = document.getElementById('cart-total');
    if (subtotalEl) subtotalEl.textContent = `£${subtotal.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `£${subtotal.toFixed(2)}`;
}

function changeQuantity(id, change) {
    const cart = getCart();
    const itemIndex = cart.findIndex(item => item.id === id);

    if (itemIndex > -1) {
        cart[itemIndex].quantity += change;

        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }

        saveCart(cart);
        renderCart();
    }
}

function removeItem(id) {
    const cart = getCart();
    const updatedCart = cart.filter(item => item.id !== id);
    saveCart(updatedCart);
    renderCart();
}

function clearCart() {
    localStorage.removeItem('cart');
    renderCart();
}

document.addEventListener('DOMContentLoaded', () => {

    renderCart();

    const clearBtn = document.getElementById('clear-cart-btn');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearCart);
    }

    const updateBtn = document.getElementById('update-cart-btn');
    if (updateBtn) {
        updateBtn.addEventListener('click', () => {
            location.reload();
        });
    }
});
window.removeItem = removeItem;
window.changeQuantity = changeQuantity;
