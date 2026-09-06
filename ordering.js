// =========================================
// FOOD DATA
// =========================================

const foods = [
    {
        id: 1,
        name: "Masala Dosa",
        price: 40
    },
    {
        id: 2,
        name: "Idli",
        price: 25
    },
    {
        id: 3,
        name: "South Indian Meals",
        price: 70
    },
    {
        id: 4,
        name: "Veg Fried Rice",
        price: 60
    },
    {
        id: 5,
        name: "Samosa",
        price: 15
    },
    {
        id: 6,
        name: "Veg Sandwich",
        price: 45
    },
    {
        id: 7,
        name: "Fresh Lime Juice",
        price: 25
    },
    {
        id: 8,
        name: "Cold Coffee",
        price: 50
    }
];


// =========================================
// CART
// =========================================

function getCart() {

    return JSON.parse(
        localStorage.getItem("canteenCart")
    ) || [];

}


function saveCart(cart) {

    localStorage.setItem(
        "canteenCart",
        JSON.stringify(cart)
    );

}


// =========================================
// ADD TO CART
// =========================================

function addToCart(foodId) {

    let cart = getCart();

    const food = foods.find(function(item) {
        return item.id === foodId;
    });

    if (!food) {
        return;
    }

    const existingItem = cart.find(function(item) {
        return item.id === foodId;
    });

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            id: food.id,
            name: food.name,
            price: food.price,
            quantity: 1
        });

    }

    saveCart(cart);

    updateCartCount();

    alert(food.name + " added to cart.");

}


// =========================================
// CART COUNT
// =========================================

function updateCartCount() {

    const cartCount =
        document.getElementById("cartCount");

    if (!cartCount) {
        return;
    }

    const cart = getCart();

    let totalItems = 0;

    cart.forEach(function(item) {

        totalItems += item.quantity;

    });

    cartCount.textContent = totalItems;

}


// =========================================
// CHANGE QUANTITY
// =========================================

function changeQuantity(foodId, change) {

    let cart = getCart();

    const item = cart.find(function(item) {

        return item.id === foodId;

    });

    if (!item) {
        return;
    }

    item.quantity += change;

    if (item.quantity <= 0) {

        cart = cart.filter(function(item) {

            return item.id !== foodId;

        });

    }

    saveCart(cart);

    updateCartCount();

    displayCart();

}


// =========================================
// REMOVE ITEM
// =========================================

function removeFromCart(foodId) {

    let cart = getCart();

    cart = cart.filter(function(item) {

        return item.id !== foodId;

    });

    saveCart(cart);

    updateCartCount();

    displayCart();

}


// =========================================
// CALCULATE TOTAL
// =========================================

function calculateTotal() {

    const cart = getCart();

    let total = 0;

    cart.forEach(function(item) {

        total += item.price * item.quantity;

    });

    return total;

}


// =========================================
// DISPLAY CART
// =========================================

function displayCart() {

    const cartContainer =
        document.getElementById("cartItems");

    if (!cartContainer) {
        return;
    }

    const cart = getCart();

    cartContainer.innerHTML = "";


    if (cart.length === 0) {

        cartContainer.innerHTML = `

            <div class="empty-cart">

                <h3>Your cart is empty</h3>

                <p>
                    Add some food from the menu.
                </p>

                <a href="menu.html">
                    Browse Menu
                </a>

            </div>

        `;

        updateCartTotal();

        return;
    }


    cart.forEach(function(item) {

        const itemTotal =
            item.price * item.quantity;


        const cartItem =
            document.createElement("div");


        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <div class="cart-item-info">

                <h3>
                    ${item.name}
                </h3>

                <p>
                    ₹${item.price} each
                </p>

            </div>


            <div class="quantity-controls">

                <button
                    type="button"
                    onclick="changeQuantity(${item.id}, -1)">
                    −
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    type="button"
                    onclick="changeQuantity(${item.id}, 1)">
                    +
                </button>

            </div>


            <div class="cart-item-price">

                <strong>
                    ₹${itemTotal}
                </strong>

            </div>


            <button
                type="button"
                class="remove-btn"
                onclick="removeFromCart(${item.id})">

                Remove

            </button>

        `;


        cartContainer.appendChild(cartItem);

    });


    updateCartTotal();

}


// =========================================
// UPDATE CART TOTAL
// =========================================

function updateCartTotal() {

    const total =
        calculateTotal();


    const cartTotal =
        document.getElementById("cartTotal");


    const finalTotal =
        document.getElementById("finalTotal");


    if (cartTotal) {

        cartTotal.textContent =
            "₹" + total;

    }


    if (finalTotal) {

        finalTotal.textContent =
            "₹" + total;

    }

}


// =========================================
// GO TO CHECKOUT
// =========================================

function goToCheckout() {

    const cart = getCart();


    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }


    window.location.href =
        "checkout.html";

}


// =========================================
// MENU SEARCH
// =========================================

function setupSearch() {

    const searchInput =
        document.getElementById("searchInput");


    if (!searchInput) {
        return;
    }


    searchInput.addEventListener(
        "input",
        function() {

            const searchText =
                searchInput.value
                    .toLowerCase()
                    .trim();


            const cards =
                document.querySelectorAll(
                    ".menu-food-card"
                );


            let visibleCount = 0;


            cards.forEach(function(card) {

                const foodName =
                    (
                        card.dataset.name || ""
                    ).toLowerCase();


                if (
                    foodName.includes(searchText)
                ) {

                    card.style.display = "";

                    visibleCount++;

                } else {

                    card.style.display = "none";

                }

            });


            const noResults =
                document.getElementById(
                    "noResults"
                );


            if (noResults) {

                noResults.style.display =
                    visibleCount === 0
                        ? "block"
                        : "none";

            }

        }
    );

}


// =========================================
// CATEGORY FILTER
// =========================================

function setupCategoryFilter() {

    const categoryButtons =
        document.querySelectorAll(
            ".category-btn"
        );


    categoryButtons.forEach(function(button) {

        button.addEventListener(
            "click",
            function() {


                categoryButtons.forEach(
                    function(btn) {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                const category =
                    button.dataset.category;


                const cards =
                    document.querySelectorAll(
                        ".menu-food-card"
                    );


                let visibleCount = 0;


                cards.forEach(function(card) {

                    if (
                        category === "all" ||
                        card.dataset.category === category
                    ) {

                        card.style.display = "";

                        visibleCount++;

                    } else {

                        card.style.display = "none";

                    }

                });


                const noResults =
                    document.getElementById(
                        "noResults"
                    );


                if (noResults) {

                    noResults.style.display =
                        visibleCount === 0
                            ? "block"
                            : "none";

                }

            }
        );

    });

}


// =========================================
// CHECKOUT ITEMS
// =========================================

function displayCheckoutItems() {

    const checkoutItems =
        document.getElementById(
            "checkoutItems"
        );


    if (!checkoutItems) {
        return;
    }


    const cart = getCart();


    checkoutItems.innerHTML = "";


    cart.forEach(function(item) {

        const div =
            document.createElement("div");


        div.className =
            "checkout-item";


        div.innerHTML = `

            <div class="checkout-item-name">

                <strong>
                    ${item.name}
                </strong>

                <span>
                    Qty: ${item.quantity}
                </span>

            </div>


            <strong>
                ₹${item.price * item.quantity}
            </strong>

        `;


        checkoutItems.appendChild(div);

    });


    const foodTotal =
        document.getElementById(
            "foodTotal"
        );


    if (foodTotal) {

        foodTotal.textContent =
            "₹" + calculateTotal();

    }

}


// =========================================
// COVER CHARGE
// =========================================

function updateCoverCharge() {

    const coverSelected =
        document.querySelector(
            'input[name="coverOption"]:checked'
        );


    const coverChargeElement =
        document.getElementById(
            "coverCharge"
        );


    const finalTotalElement =
        document.getElementById(
            "finalTotal"
        );


    const foodTotal =
        calculateTotal();


    let coverCharge = 0;


    if (
        coverSelected &&
        coverSelected.value === "cover"
    ) {

        coverCharge = 5;

    }


    if (coverChargeElement) {

        coverChargeElement.textContent =
            "₹" + coverCharge;

    }


    if (finalTotalElement) {

        finalTotalElement.textContent =
            "₹" + (foodTotal + coverCharge);

    }

}


// =========================================
// PLACE ORDER
// =========================================

function placeOrder() {

    const cart = getCart();


    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }


    const pickupTimeElement =
        document.getElementById(
            "pickupTime"
        );


    if (!pickupTimeElement) {
        return;
    }


    const pickupTime =
        pickupTimeElement.value;


    if (!pickupTime) {

        alert(
            "Please select a pickup time."
        );

        return;
    }


    const coverElement =
        document.querySelector(
            'input[name="coverOption"]:checked'
        );


    const paymentElement =
        document.querySelector(
            'input[name="paymentMethod"]:checked'
        );


    const coverOption =
        coverElement
            ? coverElement.value
            : "no-cover";


    const paymentMethod =
        paymentElement
            ? paymentElement.value
            : "cash";


    const foodTotal =
        calculateTotal();


    const coverCharge =
        coverOption === "cover"
            ? 5
            : 0;


    const total =
        foodTotal + coverCharge;


    const order = {

        orderId:
            "ORD" + Date.now(),

        items:
            cart,

        foodTotal:
            foodTotal,

        coverOption:
            coverOption,

        coverCharge:
            coverCharge,

        total:
            total,

        pickupTime:
            pickupTime,

        paymentMethod:
            paymentMethod,

        status:
            "Order Placed",

        createdAt:
            new Date().toLocaleString()

    };


    const orders =
        JSON.parse(
            localStorage.getItem(
                "canteenOrders"
            )
        ) || [];


    orders.push(order);


    localStorage.setItem(
        "canteenOrders",
        JSON.stringify(orders)
    );


    localStorage.removeItem(
        "canteenCart"
    );


    alert(
        "Order placed successfully!"
    );


    window.location.href =
        "order-details.html?id=" +
        order.orderId;

}


// =========================================
// DISPLAY ORDERS
// =========================================

function displayOrders() {

    const ordersList =
        document.getElementById(
            "ordersList"
        );


    if (!ordersList) {
        return;
    }


    const orders =
        JSON.parse(
            localStorage.getItem(
                "canteenOrders"
            )
        ) || [];


    ordersList.innerHTML = "";


    if (orders.length === 0) {

        ordersList.innerHTML = `

            <div class="empty-orders">

                <h2>
                    No orders yet
                </h2>

                <p>
                    You haven't placed any
                    orders yet.
                    Start by choosing something
                    from the menu.
                </p>

                <a
                    href="menu.html"
                    class="order-food-btn">

                    Browse Menu

                </a>

            </div>

        `;

        return;
    }


    // Newest order first

    const reversedOrders =
        [...orders].reverse();


    reversedOrders.forEach(
        function(order) {

            const card =
                document.createElement("div");


            card.className =
                "order-card";


            const status =
                order.status ||
                "Order Placed";


            let statusClass =
                "status-placed";


            if (status === "Confirmed") {

                statusClass =
                    "status-confirmed";

            }
            else if (
                status === "Preparing"
            ) {

                statusClass =
                    "status-preparing";

            }
            else if (
                status === "Ready for Pickup"
            ) {

                statusClass =
                    "status-ready";

            }
            else if (
                status === "Completed"
            ) {

                statusClass =
                    "status-completed";

            }
            else if (
                status === "Cancelled"
            ) {

                statusClass =
                    "status-cancelled";

            }


            let itemsHTML = "";


            order.items.forEach(
                function(item) {

                    itemsHTML += `

                        <div class="order-item">

                            <span>
                                ${item.name}
                            </span>

                            <span
                                class="order-item-quantity">

                                ${item.quantity}
                                × ₹${item.price}

                            </span>

                        </div>

                    `;

                }
            );


            card.innerHTML = `

                <div class="order-top">

                    <div class="order-id-section">

                        <span class="order-id">

                            ${order.orderId}

                        </span>

                        <span class="order-date">

                            ${order.createdAt}

                        </span>

                    </div>


                    <span
                        class="order-status
                        ${statusClass}">

                        ${status}

                    </span>

                </div>


                <div class="order-info">

                    <div class="info-item">

                        <span class="info-label">
                            Pickup Time
                        </span>

                        <span class="info-value">

                            ${order.pickupTime}

                        </span>

                    </div>


                    <div class="info-item">

                        <span class="info-label">
                            Payment
                        </span>

                        <span class="info-value">

                            ${
                                order.paymentMethod === "cash"
                                ? "Cash at Pickup"
                                : "Online Payment"
                            }

                        </span>

                    </div>


                    <div class="info-item">

                        <span class="info-label">
                            Cover
                        </span>

                        <span class="info-value">

                            ${
                                order.coverOption === "cover"
                                ? "With Cover"
                                : "No Cover"
                            }

                        </span>

                    </div>

                </div>


                <div class="order-items">

                    <div class="order-items-title">
                        Items
                    </div>

                    ${itemsHTML}

                </div>


                <div class="order-bottom">

                    <div class="order-total">

                        <span class="order-total-label">
                            Total Amount
                        </span>

                        <span class="order-total-value">

                            ₹${order.total}

                        </span>

                    </div>


                    <a
                        href="order-details.html?id=${order.orderId}"
                        class="view-order-btn">

                        View Details

                    </a>

                </div>

            `;


            ordersList.appendChild(card);

        }
    );

}


// =========================================
// DISPLAY ORDER DETAILS
// =========================================

function displayOrderDetails() {

    const orderDetails =
        document.getElementById(
            "orderDetails"
        );


    if (!orderDetails) {
        return;
    }


    const params =
        new URLSearchParams(
            window.location.search
        );


    const orderId =
        params.get("id");


    const orders =
        JSON.parse(
            localStorage.getItem(
                "canteenOrders"
            )
        ) || [];


    const order =
        orders.find(
            function(item) {

                return item.orderId === orderId;

            }
        );


    if (!order) {

        orderDetails.innerHTML = `

            <div class="order-not-found">

                <h2>
                    Order Not Found
                </h2>

                <p>
                    We couldn't find this order.
                </p>

                <a
                    href="orders.html"
                    class="order-action-btn
                           primary-action">

                    Go to My Orders

                </a>

            </div>

        `;

        return;
    }


    let itemsHTML = "";


    order.items.forEach(
        function(item) {

            itemsHTML += `

                <div class="detail-item-row">

                    <div class="detail-item-name">

                        <strong>
                            ${item.name}
                        </strong>

                        <span
                            class="detail-item-quantity">

                            Quantity:
                            ${item.quantity}

                        </span>

                    </div>


                    <span
                        class="detail-item-price">

                        ₹${item.price *
                           item.quantity}

                    </span>

                </div>

            `;

        }
    );


    orderDetails.innerHTML = `

        <div class="order-success">

            <div class="success-icon">
                ✓
            </div>

            <h1>
                Order Placed Successfully
            </h1>

            <p>
                Your order has been received
                by the canteen.
            </p>

        </div>


        <div class="details-card">

            <h2>
                Order Information
            </h2>


            <div class="order-id-box">

                <div>

                    <div class="order-id-label">
                        Order ID
                    </div>

                    <div class="order-id-value">
                        ${order.orderId}
                    </div>

                </div>


                <span class="details-status">

                    ${order.status ||
                      "Order Placed"}

                </span>

            </div>


            <div class="details-info">

                <div class="detail-item">

                    <span class="detail-label">
                        Order Date
                    </span>

                    <span class="detail-value">
                        ${order.createdAt}
                    </span>

                </div>


                <div class="detail-item">

                    <span class="detail-label">
                        Pickup Time
                    </span>

                    <span class="detail-value">
                        ${order.pickupTime}
                    </span>

                </div>


                <div class="detail-item">

                    <span class="detail-label">
                        Payment Method
                    </span>

                    <span class="detail-value">

                        ${
                            order.paymentMethod === "cash"
                            ? "Cash at Pickup"
                            : "Online Payment"
                        }

                    </span>

                </div>


                <div class="detail-item">

                    <span class="detail-label">
                        Cover
                    </span>

                    <span class="detail-value">

                        ${
                            order.coverOption === "cover"
                            ? "With Cover"
                            : "No Cover"
                        }

                    </span>

                </div>

            </div>

        </div>


        <div class="details-card">

            <h2>
                Ordered Items
            </h2>


            <div class="detail-items">

                ${itemsHTML}

            </div>


            <div class="total-section">

                <div class="total-row">

                    <span>
                        Food Total
                    </span>

                    <span>
                        ₹${order.foodTotal}
                    </span>

                </div>


                <div class="total-row">

                    <span>
                        Cover Charge
                    </span>

                    <span>
                        ₹${order.coverCharge}
                    </span>

                </div>


                <div class="total-row total-final">

                    <span>
                        Total
                    </span>

                    <span>
                        ₹${order.total}
                    </span>

                </div>

            </div>

        </div>


        <div class="order-actions">

            <a
                href="orders.html"
                class="order-action-btn
                       secondary-action">

                View My Orders

            </a>


            <a
                href="menu.html"
                class="order-action-btn
                       primary-action">

                Order More Food

            </a>

        </div>

    `;

}


// =========================================
// INITIALIZE
// =========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateCartCount();

        displayCart();

        displayCheckoutItems();

        updateCoverCharge();

        displayOrders();

        displayOrderDetails();

        setupSearch();

        setupCategoryFilter();

    }
);