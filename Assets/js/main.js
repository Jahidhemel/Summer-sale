/* =========================================================
   Summer Sale — Bootstrap landing page interactions
   Author: Md. Jahidul Islam Hemel
   ========================================================= */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    /* -----------------------------------------------------
       1. Auto-update copyright year
    ----------------------------------------------------- */
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();


    /* -----------------------------------------------------
       2. Navbar shadow on scroll
    ----------------------------------------------------- */
    const nav = document.getElementById('mainNav');
    if (nav) {
        window.addEventListener('scroll', () => {
            nav.classList.toggle('scrolled', window.scrollY > 8);
        });
    }


    /* -----------------------------------------------------
       3. Cart state
    ----------------------------------------------------- */
    const COUPON_CODE = 'SELL200';
    const COUPON_DISCOUNT = 0.20; // 20%
    const COUPON_MIN_TOTAL = 200;

    const cart = new Map(); // name -> { name, price, qty }
    let couponApplied = false;

    const cartListEl   = document.getElementById('cartList');
    const cartTotalsEl = document.getElementById('cartTotals');
    const subtotalEl   = document.getElementById('subtotal');
    const discountRow  = document.getElementById('discountRow');
    const discountEl   = document.getElementById('discount');
    const totalEl      = document.getElementById('total');
    const cartBadge    = document.getElementById('cartBadge');
    const couponMsg    = document.getElementById('couponMsg');


    /* -----------------------------------------------------
       4. Toast helper (Bootstrap Toast)
    ----------------------------------------------------- */
    const toastHolder = document.getElementById('toastHolder');
    function showToast(message, variant = 'dark') {
        if (!toastHolder) return;
        const wrap = document.createElement('div');
        wrap.innerHTML = `
            <div class="toast align-items-center text-bg-${variant} border-0 shadow" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">${message}</div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        `;
        const toastEl = wrap.firstElementChild;
        toastHolder.appendChild(toastEl);
        const t = new bootstrap.Toast(toastEl, { delay: 3000 });
        t.show();
        toastEl.addEventListener('hidden.bs.toast', () => toastEl.remove());
    }


    /* -----------------------------------------------------
       5. Render cart UI from state
    ----------------------------------------------------- */
    function fmt(n) { return n.toFixed(2).replace(/\.00$/, '') + ' TK'; }

    function render() {
        // Items
        if (cart.size === 0) {
            cartListEl.innerHTML = `
                <div class="empty">
                    <i class="bi bi-bag fs-1 d-block mb-2 text-secondary opacity-50"></i>
                    Your cart is empty.<br>
                    <small>Pick a product to get started.</small>
                </div>`;
            cartTotalsEl.style.display = 'none';
            cartBadge.textContent = '0';
            return;
        }

        cartListEl.innerHTML = '';
        let totalQty = 0;
        let subtotal = 0;
        cart.forEach(item => {
            totalQty += item.qty;
            subtotal += item.qty * item.price;
            const row = document.createElement('div');
            row.className = 'cart-item';
            row.innerHTML = `
                <div class="me-2">
                    <div class="fw-semibold small">${item.name}</div>
                    <div class="text-secondary small">${fmt(item.price)} each</div>
                </div>
                <div class="d-flex align-items-center gap-1">
                    <button class="qty-btn qty-dec" data-name="${item.name}" aria-label="Decrease quantity">−</button>
                    <span class="px-1 small fw-semibold" style="min-width:18px;text-align:center">${item.qty}</span>
                    <button class="qty-btn qty-inc" data-name="${item.name}" aria-label="Increase quantity">+</button>
                    <button class="qty-btn ms-1 text-danger qty-rm" data-name="${item.name}" aria-label="Remove">
                        <i class="bi bi-x"></i>
                    </button>
                </div>
            `;
            cartListEl.appendChild(row);
        });

        // Pricing
        cartTotalsEl.style.display = 'block';
        subtotalEl.textContent = fmt(subtotal);
        cartBadge.textContent = totalQty;

        // Validate coupon vs threshold
        let discount = 0;
        if (couponApplied && subtotal >= COUPON_MIN_TOTAL) {
            discount = subtotal * COUPON_DISCOUNT;
            discountRow.style.display = 'flex';
            discountEl.textContent = '−' + fmt(discount);
        } else {
            discountRow.style.display = 'none';
        }
        totalEl.textContent = fmt(subtotal - discount);

        // If coupon was applied but cart fell below threshold, warn
        if (couponApplied && subtotal < COUPON_MIN_TOTAL) {
            couponMsg.className = 'form-text small mt-1 text-warning';
            couponMsg.textContent = `Add ${fmt(COUPON_MIN_TOTAL - subtotal)} more to unlock 20% off.`;
        }
    }


    /* -----------------------------------------------------
       6. Add to cart
    ----------------------------------------------------- */
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', () => {
            const name  = btn.dataset.name;
            const price = parseFloat(btn.dataset.price);
            if (cart.has(name)) {
                cart.get(name).qty += 1;
            } else {
                cart.set(name, { name, price, qty: 1 });
            }
            render();
            showToast(`<i class="bi bi-check-circle me-1"></i> Added <strong>${name}</strong> to cart`, 'success');
        });
    });


    /* -----------------------------------------------------
       7. Cart quantity controls (event delegation)
    ----------------------------------------------------- */
    cartListEl.addEventListener('click', e => {
        const btn = e.target.closest('button');
        if (!btn) return;
        const name = btn.dataset.name;
        if (!name || !cart.has(name)) return;

        const item = cart.get(name);
        if (btn.classList.contains('qty-inc')) {
            item.qty += 1;
        } else if (btn.classList.contains('qty-dec')) {
            item.qty -= 1;
            if (item.qty <= 0) cart.delete(name);
        } else if (btn.classList.contains('qty-rm')) {
            cart.delete(name);
        }
        render();
    });


    /* -----------------------------------------------------
       8. Coupon form
    ----------------------------------------------------- */
    const couponForm  = document.getElementById('couponForm');
    const couponInput = document.getElementById('couponInput');
    if (couponForm && couponInput) {
        couponForm.addEventListener('submit', e => {
            e.preventDefault();
            const code = couponInput.value.trim().toUpperCase();
            if (!code) {
                couponMsg.className = 'form-text small mt-1 text-secondary';
                couponMsg.textContent = '';
                return;
            }
            if (code === COUPON_CODE) {
                couponApplied = true;
                couponMsg.className = 'form-text small mt-1 text-success';
                couponMsg.textContent = '✓ Coupon applied — 20% off orders 200+';
                showToast('🎉 Coupon applied — 20% off when your cart hits 200 TK', 'success');
                render();
            } else {
                couponApplied = false;
                couponMsg.className = 'form-text small mt-1 text-danger';
                couponMsg.textContent = `Invalid code. Try “${COUPON_CODE}”.`;
                showToast('Invalid coupon code', 'danger');
                render();
            }
        });
    }


    /* -----------------------------------------------------
       9. Copy promo code
    ----------------------------------------------------- */
    const copyBtn = document.getElementById('copyCodeBtn');
    if (copyBtn) {
        copyBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(COUPON_CODE);
                showToast(`<i class="bi bi-clipboard-check me-1"></i> Code <strong>${COUPON_CODE}</strong> copied!`, 'success');
            } catch (err) {
                showToast('Could not copy. Code is <strong>SELL200</strong>.', 'warning');
            }
        });
    }


    /* -----------------------------------------------------
       10. Cart icon → scroll to cart on mobile
    ----------------------------------------------------- */
    const cartBtn = document.getElementById('cartIconBtn');
    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            const cartEl = document.querySelector('.cart-sidebar');
            if (cartEl) cartEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }


    /* -----------------------------------------------------
       11. Make Purchase → demo modal
    ----------------------------------------------------- */
    const purchaseBtn = document.getElementById('purchaseBtn');
    const demoModalEl = document.getElementById('demoModal');
    if (purchaseBtn && demoModalEl) {
        const demoModal = new bootstrap.Modal(demoModalEl);
        purchaseBtn.addEventListener('click', () => {
            if (cart.size === 0) {
                showToast('Add something to your cart first!', 'warning');
                return;
            }
            demoModal.show();
        });
    }


    /* -----------------------------------------------------
       12. Initial render
    ----------------------------------------------------- */
    render();

});
