const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        category: "electronics",
        price: 79.99,
        icon: "🎧"
    },
    {
        id: 2,
        name: "Smart Watch",
        category: "electronics",
        price: 129.99,
        icon: "⌚"
    },
    {
        id: 3,
        name: "Laptop",
        category: "electronics",
        price: 899.99,
        icon: "💻"
    },
    {
        id: 4,
        name: "Running Shoes",
        category: "fashion",
        price: 59.99,
        icon: "👟"
    },
    {
        id: 5,
        name: "Classic T-Shirt",
        category: "fashion",
        price: 24.99,
        icon: "👕"
    },
    {
        id: 6,
        name: "Backpack",
        category: "fashion",
        price: 44.99,
        icon: "🎒"
    },
    {
        id: 7,
        name: "Coffee Maker",
        category: "home",
        price: 69.99,
        icon: "☕"
    },
    {
        id: 8,
        name: "Table Lamp",
        category: "home",
        price: 39.99,
        icon: "💡"
    }
];


let cart = JSON.parse(
    localStorage.getItem("cart")
) || [];

let currentCategory = "all";


/* Display products */

function displayProducts(productList) {

    const container =
        document.getElementById("products-container");

    container.innerHTML = "";

    if (productList.length === 0) {

        container.innerHTML = `
            <p>
                No products found.
            </p>
        `;

        return;
    }

    productList.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `

            <div class="product-image">
                ${product.icon}
            </div>

            <div class="product-info">

                <div class="product-category">
                    ${product.category}
                </div>

                <h3 class="product-name">
                    ${product.name}
                </h3>

                <div class="product-price">
                    $${product.price.toFixed(2)}
                </div>

                <button
                    class="add-button"
                    onclick="addToCart(${product.id})">

                    Add to Cart

                </button>

            </div>
        `;

        container.appendChild(card);
    });
}


/* Filter products */

function filterProducts(category, button) {

    currentCategory = category;

    document
        .querySelectorAll(".category")
        .forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");

    applyFilters();
}


/* Search */

function searchProducts() {
    applyFilters();
}


function applyFilters() {

    const searchTerm =
        document
            .getElementById("search")
            .value
            .toLowerCase();

    let filtered = products.filter(product => {

        const matchesCategory =
            currentCategory === "all" ||
            product.category === currentCategory;

        const matchesSearch =
            product.name
                .toLowerCase()
                .includes(searchTerm);

        return matchesCategory && matchesSearch;
    });

    displayProducts(filtered);
}


/* Add to cart */

function addToCart(productId) {

    const product =
        products.find(p => p.id === productId);

    const existing =
        cart.find(item => item.id === productId);

    if (existing) {
        existing.quantity++;
    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    saveCart();

    updateCart();

    alert(`${product.name} added to cart!`);
}


/* Change quantity */

function changeQuantity(productId, change) {

    const item =
        cart.find(item => item.id === productId);

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {

        cart =
            cart.filter(item => item.id !== productId);

    }

    saveCart();

    updateCart();
}


/* Remove product */

function removeFromCart(productId) {

    cart =
        cart.filter(item => item.id !== productId);

    saveCart();

    updateCart();
}


/* Save cart */

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
}


/* Update cart */

function updateCart() {

    const cartItems =
        document.getElementById("cart-items");

    const cartCount =
        document.getElementById("cart-count");

    const cartTotal =
        document.getElementById("cart-total");


    const totalQuantity =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );

    const totalPrice =
        cart.reduce(
            (total, item) =>
                total + item.price * item.quantity,
            0
        );


    cartCount.textContent = totalQuantity;

    cartTotal.textContent =
        `$${totalPrice.toFixed(2)}`;


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                Your cart is empty 🛒
            </div>
        `;

        return;
    }


    cartItems.innerHTML = "";


    cart.forEach(item => {

        const element =
            document.createElement("div");

        element.className = "cart-item";

        element.innerHTML = `

            <div class="cart-item-image">
                ${item.icon}
            </div>

            <div class="cart-item-info">

                <h4>
                    ${item.name}
                </h4>

                <div class="cart-item-price">
                    $${item.price.toFixed(2)}
                </div>

                <div class="quantity-controls">

                    <button
                        onclick="changeQuantity(
                            ${item.id},
                            -1
                        )">
                        -
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="changeQuantity(
                            ${item.id},
                            1
                        )">
                        +
                    </button>

                    <button
                        class="remove-button"
                        onclick="removeFromCart(
                            ${item.id}
                        )">
                        Remove
                    </button>

                </div>

            </div>
        `;

        cartItems.appendChild(element);
    });
}


/* Open / close cart */

function toggleCart() {

    document
        .getElementById("cart")
        .classList.toggle("active");

    document
        .getElementById("cart-overlay")
        .classList.toggle("active");
}


/* Checkout */

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }

    alert(
        "Checkout functionality would connect to a payment backend."
    );
}


/* Initial load */

displayProducts(products);

updateCart();
