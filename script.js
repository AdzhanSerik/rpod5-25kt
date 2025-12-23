document.addEventListener('DOMContentLoaded', () => {
    /* ======================
    CART — WORKING VERSION
 ====================== */



    const cartBtn = document.getElementById('cartBtn');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartItems = document.getElementById('cartItems');
    const cartFooter = document.getElementById('cartFooter');
    const cartEmpty = document.getElementById('cartEmpty');
    const closeCart = document.getElementById('closeCart');
    const totalPriceEl = document.getElementById('totalPrice');
    const backBtn = document.getElementById('backFromCart');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function renderCart() {
        if (!cartItems) return;

        cartItems.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartEmpty.style.display = 'block';
            cartFooter.style.display = 'none';
            totalPriceEl.textContent = '0 руб.';
            return;
        }

        cartEmpty.style.display = 'none';
        cartFooter.style.display = 'block';

        cart.forEach((item, index) => {
            total += item.price * item.count;

            const el = document.createElement('div');
            el.className = 'cart-item';
            el.innerHTML = `
            <img src="${item.img}">
            <div class="cart-item-info">
                <p>${item.title}</p>
                <b>${item.price * item.count} руб.</b>
            </div>
            <button class="remove-btn">✕</button>
        `;

            el.querySelector('.remove-btn').onclick = () => {
                cart.splice(index, 1);
                saveCart();
                renderCart();
            };

            cartItems.appendChild(el);
        });

        totalPriceEl.textContent = total + ' руб.';
    }

    /* ===== OPEN / CLOSE ===== */

    cartBtn?.addEventListener('click', () => {
        cartOverlay.classList.add('active');
        renderCart(); // ← ВАЖНО
    });

    closeCart?.addEventListener('click', () => {
        cartOverlay.classList.remove('active');
    });

    backBtn?.addEventListener('click', () => {
        cartOverlay.classList.remove('active');
    });

    /* ===== ADD TO CART ===== */

    document.querySelectorAll('.add-btn').forEach(btn => {
        const id = btn.dataset.id;

        // если товар уже есть — сразу показываем ✓
        if (cart.find(item => item.id === id)) {
            btn.textContent = '✓';
            btn.classList.add('added');
        }

        btn.addEventListener('click', () => {
            if (cart.find(item => item.id === id)) return;

            cart.push({
                id,
                title: btn.dataset.title,
                price: Number(btn.dataset.price),
                img: btn.dataset.img,
                count: 1
            });

            saveCart();
            btn.textContent = '✓';
            btn.classList.add('added');
        });
    });



    /* ======================
       FAVORITES — ГЛАВНАЯ
    ====================== */

    document.querySelectorAll('.favorite').forEach(fav => {
        const card = fav.closest('.card');
        if (!card) return;

        const addBtn = card.querySelector('.add-btn');
        if (!addBtn) return; // 👉 не главная

        const id = addBtn.dataset.id;
        const img = fav.querySelector('img');

        // начальное состояние
        const favorites = loadFavorites();
        if (favorites.find(item => item.id === id)) {
            fav.classList.add('active');
            img.src = 'heart-filled.svg';
        }

        fav.addEventListener('click', () => {
            let favorites = loadFavorites();
            const exists = favorites.find(item => item.id === id);

            if (exists) {
                favorites = favorites.filter(item => item.id !== id);
                fav.classList.remove('active');
                img.src = 'heart.svg';
            } else {
                favorites.push({
                    id,
                    title: addBtn.dataset.title,
                    price: addBtn.dataset.price,
                    img: addBtn.dataset.img
                });
                fav.classList.add('active');
                img.src = 'heart-filled.svg';
            }

            saveFavorites(favorites);
        });
    });

    /* ======================
       FAVORITES — ЗАКЛАДКИ
    ====================== */

    const favoritesList = document.getElementById('favoritesList');
    if (favoritesList) renderFavorites();

    function renderFavorites() {
        const favorites = loadFavorites();

        // ❌ пусто
        if (favorites.length === 0) {
            favoritesList.innerHTML = `
    <div class="favorites-empty">
      <div class="favorites-empty-inner">
        <div class="emoji">😔</div>
        <h3>Закладок нет :(</h3>
        <p>Вы ничего не добавляли в закладки</p>
        <a href="index.html">
          <button class="back-btn">← Вернуться назад</button>
        </a>
      </div>
    </div>
  `;
            return;
        }

        // карточки
        favoritesList.innerHTML = favorites.map(item => `
      <div class="card">
        <div class="favorite active" data-id="${item.id}">
          <img src="heart-filled.svg">
        </div>

        <img src="${item.img}" class="product-img">

        <h3 class="product-name">${item.title}</h3>

        <div class="price-block">
          <div class="price-text">
            <span class="price-label">ЦЕНА:</span>
            <span class="price-value">${item.price} руб.</span>
          </div>
        </div>
      </div>
    `).join('');

        // удаление
        favoritesList.querySelectorAll('.favorite').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                let favorites = loadFavorites();
                favorites = favorites.filter(item => item.id !== id);
                saveFavorites(favorites);
                renderFavorites();
            });
        });
    }

    /* ======================
   AUTH / REG — CLEAN
====================== */

    const profileBtn = document.getElementById('profileBtn');

    const authOverlay = document.getElementById('autorization');
    const regOverlay = document.getElementById('registration');

    const closeAuth = document.getElementById('closeAutoriz');
    const closeReg = document.getElementById('closeReg');

    const openRegister = document.getElementById('openRegister');
    const backToLogin = document.getElementById('backToLogin');

    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');


    function getUsers() {
        return JSON.parse(localStorage.getItem('users') || '[]');
    }

    function saveUsers(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }

    function getCurrentUser() {
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    function setCurrentUser(user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
    }

    function closeAllAuth() {
        authOverlay?.classList.remove('active');
        regOverlay?.classList.remove('active');
    }


    if (profileBtn) {
        profileBtn.addEventListener('click', () => {
            const user = getCurrentUser();

            if (user) {
                window.location.href = 'profile.html';
            } else {
                closeAllAuth();
                authOverlay.classList.add('active');
            }
        });
    }


    openRegister?.addEventListener('click', () => {
        closeAllAuth();
        regOverlay.classList.add('active');
    });

    backToLogin?.addEventListener('click', () => {
        closeAllAuth();
        authOverlay.classList.add('active');
    });


    closeAuth?.addEventListener('click', closeAllAuth);
    closeReg?.addEventListener('click', closeAllAuth);


    if (loginForm) {
        loginForm.addEventListener('submit', e => {
            e.preventDefault();

            const email = loginEmail.value.trim();
            const password = loginPassword.value.trim();

            const users = getUsers();
            const user = users.find(
                u => u.email === email && u.password === password
            );

            if (!user) {
                alert('Неверный email или пароль');
                return;
            }

            setCurrentUser({ email });
            closeAllAuth();
            window.location.href = 'profile.html';
        });
    }


    if (registerForm) {
        registerForm.addEventListener('submit', e => {
            e.preventDefault();

            const email = regEmail.value.trim();
            const password = regPassword.value.trim();

            if (!email || !password) {
                alert('Заполните все поля');
                return;
            }

            let users = getUsers();

            if (users.find(u => u.email === email)) {
                alert('Пользователь уже существует');
                return;
            }

            users.push({ email, password });
            saveUsers(users);

            setCurrentUser({ email });
            closeAllAuth();
            window.location.href = 'profile.html';
        });
    }
    const logoutBtn = document.getElementById('logoutBtn');

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            window.location.href = 'index.html';
        });
    }
    const goCheckout = document.getElementById('goCheckout');

    if (goCheckout) {
        goCheckout.addEventListener('click', () => {
            window.location.href = 'checkout.html';
        });
    }
    document.addEventListener('DOMContentLoaded', () => {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (!user) return;

        /* ======================
           МОИ ЗАКАЗЫ
        ====================== */

        const ordersBox = document.getElementById('ordersList');
        const orders = JSON.parse(localStorage.getItem('orders') || '[]')
            .filter(o => o.userEmail === user.email)
            .reverse();

        if (orders.length === 0) {
            ordersBox.innerHTML = '<p>Пока заказов нет</p>';
        } else {
            ordersBox.innerHTML = orders.map((order, index) => `
  <div class="order-item">
    <div class="order-header">
      <span>${order.date}</span>
      <b>${order.total} руб.</b>
    </div>

    ${order.items.map(item => `
      <div class="order-product">
        <img src="${item.img}">
        <span>${item.title} × ${item.count}</span>
      </div>
    `).join('')}

    <button class="repeat-btn" data-index="${index}">
      Повторить заказ
    </button>
  </div>
`).join('');

        }

        /* ======================
           АДРЕС ДОСТАВКИ
        ====================== */

        const addressBlock = document.getElementById('addressBlock');
        const addresses = JSON.parse(localStorage.getItem('addresses') || '[]');
        const myAddress = addresses.find(a => a.userEmail === user.email);

        addressBlock.innerHTML = myAddress
            ? `
                <p>${myAddress.address}</p>
                <button id="editAddress">Изменить</button>
            `
            : `
                <input id="addressInput" placeholder="Введите адрес">
                <button id="saveAddress">Сохранить</button>
            `;


        document.getElementById('saveAddress')?.addEventListener('click', () => {
            const address = addressInput.value.trim();
            if (!address) return;

            addresses.push({ userEmail: user.email, address });
            localStorage.setItem('addresses', JSON.stringify(addresses));
            location.reload();
        });

        /* ======================
           СПОСОБ ОПЛАТЫ
        ====================== */

        const paymentBlock = document.getElementById('paymentBlock');
        const payments = JSON.parse(localStorage.getItem('payments') || '[]');
        const myPayment = payments.find(p => p.userEmail === user.email);

        paymentBlock.innerHTML = myPayment
            ? `<p>${myPayment.method}</p>`
            : `
      <select id="paymentSelect">
        <option value="">Выберите способ оплаты</option>
        <option>Банковская карта</option>
        <option>Наличные при получении</option>
      </select>
      <button id="savePayment">Сохранить</button>
    `;

        document.getElementById('savePayment')?.addEventListener('click', () => {
            const method = paymentSelect.value;
            if (!method) return;

            payments.push({ userEmail: user.email, method });
            localStorage.setItem('payments', JSON.stringify(payments));
            location.reload();
        });
    });
    /* ======================
       PROFILE DATA
    ====================== */

    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {

        /* ===== МОИ ЗАКАЗЫ ===== */

        const ordersBox = document.getElementById('ordersList');
        if (ordersBox) {
            const orders = JSON.parse(localStorage.getItem('orders') || '[]')
                .filter(o => o.userEmail === user.email);

            ordersBox.innerHTML = orders.length === 0
                ? '<p>Пока заказов нет</p>'
                : orders.map(order => `
        <div class="order-item">
          <div class="order-header">
            <span>${order.date}</span>
            <b>${order.total} руб.</b>
          </div>

          ${order.items.map(item => `
            <div class="order-product">
              <img src="${item.img}">
              <span>${item.title} × ${item.count}</span>
            </div>
          `).join('')}
        </div>
      `).join('');

        }

        /* ===== АДРЕС ДОСТАВКИ ===== */

        const addressBlock = document.getElementById('addressBlock');
        if (addressBlock) {
            const addresses = JSON.parse(localStorage.getItem('addresses') || '[]');
            const myAddress = addresses.find(a => a.userEmail === user.email);

            addressBlock.innerHTML = myAddress
                ? `<p>${myAddress.address}</p>`
                : `
        <input id="addressInput" placeholder="Введите адрес">
        <button id="saveAddress">Сохранить</button>
      `;

            document.getElementById('saveAddress')?.addEventListener('click', () => {
                const address = addressInput.value.trim();
                if (!address) return;

                addresses.push({ userEmail: user.email, address });
                localStorage.setItem('addresses', JSON.stringify(addresses));
                location.reload();
            });
        }

        /* ===== СПОСОБ ОПЛАТЫ ===== */

        const paymentBlock = document.getElementById('paymentBlock');
        if (paymentBlock) {
            const payments = JSON.parse(localStorage.getItem('payments') || '[]');
            const myPayment = payments.find(p => p.userEmail === user.email);

            paymentBlock.innerHTML = myPayment
                ? `<p>${myPayment.method}</p>`
                : `
        <select id="paymentSelect">
          <option value="">Выберите способ оплаты</option>
          <option>Банковская карта</option>
          <option>Наличные при получении</option>
        </select>
        <button id="savePayment">Сохранить</button>
      `;

            document.getElementById('savePayment')?.addEventListener('click', () => {
                const method = paymentSelect.value;
                if (!method) return;

                payments.push({ userEmail: user.email, method });
                localStorage.setItem('payments', JSON.stringify(payments));
                location.reload();
            });
        }
    }
    document.getElementById('editAddress')?.addEventListener('click', () => {
        addressBlock.innerHTML = `
      <input id="addressInput" value="${myAddress.address}">
      <button id="saveAddress">Сохранить</button>
    `;
    });


});
/* ======================
   FAVORITES STORAGE
====================== */

function loadFavorites() {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
}

function saveFavorites(list) {
    localStorage.setItem('favorites', JSON.stringify(list));
}

function closeAllOverlays() {
    autorization?.classList.remove('active');
    registration?.classList.remove('active');
}

function getProducts() {
    return [
        {
            id: 9,
            title: "Nike Blazer Mid Suede",
            price: 12999,
            imageUrl: "image 6.png"
        },
        {
            id: 10,
            title: "Nike Air Max 270",
            price: 12999,
            imageUrl: "image 7.png"
        },
        {
            id: 11,
            title: "Nike Blazer Mid Suede",
            price: 8499,
            imageUrl: "image 51.png"
        },
        {
            id: 12,
            title: "Puma X Aka Boku Future Rider",
            price: 8999,
            imageUrl: "image 8.png"
        },
        {
            id: 1,
            title: "Under Armour Curry 8",
            price: 15199,
            imageUrl: "image 5.png"
        },
        {
            id: 2,
            title: "Nike Kyrie 7",
            price: 11299,
            imageUrl: "image 5-1.png"
        },
        {
            id: 3,
            title: "Air Jordan 11",
            price: 10799,
            imageUrl: "image 5-2.png"
        },
        {
            id: 4,
            title: "Nike LeBron XVIII",
            price: 16499,
            imageUrl: "image 5-3.png"
        },
        {
            id: 5,
            title: "Nike LeBron XVIII Low",
            price: 13999,
            imageUrl: "image 5-4.png"
        },
        {
            id: 6,
            title: "Nike Blazer Mid Suede",
            price: 8499,
            imageUrl: "image 5-5.png"
        },
        {
            id: 7,
            title: "Puma X Aka Boku Future Rider",
            price: 8999,
            imageUrl: "image 5-6.png"
        },
        {
            id: 8,
            title: "Nike Kyrie Flytrap IV",
            price: 11299,
            imageUrl: "image 5-7.png"
        }
    ];
}

function renderCards() {

    const products = getProducts()

    products.forEach((sneaker) => {
        document.querySelector('.productCase').insertAdjacentHTML("beforeend", `
                    <div class="card">
                        <div class="favorite">
                            <img src="heart.svg" alt="">
                        </div>

                        <img src="${sneaker.imageUrl}" class="product-img">

                        <h3 class="product-name">
                            Мужские Кроссовки<br>
                            ${sneaker.title}
                        </h3>

                        <div class="price-block">
                            <div class="price-text">
                                <span class="price-label">ЦЕНА:</span><br>
                                <span class="price-value">${sneaker.price} тг.</span>
                            </div>

                            <button class="add-btn" data-id="9" data-title="Nike Blazer Mid Suede" data-price="12999"
                                data-img="image 6.png">+</button>
                        </div>
                    </div>
        
        `)


    })




}

renderCards()
