document.addEventListener('DOMContentLoaded', () => {
    const itemsBox = document.getElementById('checkoutItems');
    const totalBox = document.getElementById('checkoutTotal');
    const form = document.getElementById('checkoutForm');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (!cart.length) {
        itemsBox.innerHTML = '<p>Корзина пуста</p>';
        totalBox.textContent = '0 руб.';
        return;
    }

    render();

    function render() {
        let total = 0;

        itemsBox.innerHTML = cart.map((item, index) => {
            total += item.price * item.count;

            return `
            <div class="checkout-item">
                <img src="${item.img}">
                <div class="checkout-info">
                    <p>${item.title}</p>
                    <b>${item.price * item.count} руб.</b>
                </div>

                <div class="checkout-counter">
                    <button class="minus" data-i="${index}">−</button>
                    <span>${item.count}</span>
                    <button class="plus" data-i="${index}">+</button>
                </div>
            </div>
            `;
        }).join('');

        totalBox.textContent = total + ' руб.';
        bindCounterButtons();
    }

    function bindCounterButtons() {
        document.querySelectorAll('.plus').forEach(btn => {
            btn.addEventListener('click', () => {
                const i = btn.dataset.i;
                cart[i].count++;
                saveAndRender();
            });
        });

        document.querySelectorAll('.minus').forEach(btn => {
            btn.addEventListener('click', () => {
                const i = btn.dataset.i;

                if (cart[i].count > 1) {
                    cart[i].count--;
                } else {
                    cart.splice(i, 1);
                }

                saveAndRender();
            });
        });
    }

    function saveAndRender() {
        localStorage.setItem('cart', JSON.stringify(cart));
        render();
    }

    form.addEventListener('submit', e => {
        e.preventDefault();

        const user = JSON.parse(localStorage.getItem('currentUser'));

        if (!user) {
            alert('Сначала войдите в аккаунт');
            window.location.href = 'index.html';
            return;
        }

        const order = {
            userEmail: user.email,  
            name: name.value,
            phone: phone.value,
            address: address.value,
            items: cart,
            total: totalBox.textContent,
            date: new Date().toLocaleString()
        };


        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));

        localStorage.removeItem('cart');
        alert('Заказ успешно оформлен!');
        window.location.href = 'profile.html';
    });

});
