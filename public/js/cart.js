document.addEventListener('DOMContentLoaded', async () => {
  const navToggle = document.getElementById('navToggle');
  const navbar = document.getElementById('navbar');
  if (navToggle && navbar) {
    navToggle.addEventListener('click', () => {
      navbar.classList.toggle('open');
    });
  }

  let cartItemsData = [];

  const cartItemsContainer = document.querySelector('.cart-items');
  const cartTotalEl = document.getElementById('cart-total');

  const checkoutButton = document.querySelector('.checkout-button');
  if (checkoutButton) {
    checkoutButton.addEventListener('click', async (e) => {
      e.preventDefault(); 

      if (!cartItemsData || cartItemsData.length === 0) {
        alert('There are no items in your cart.');
        return;
      }

      try {
        const response = await fetch('/session-status', {
          method: 'GET',
          credentials: 'include'
        });
        const data = await response.json();
        if (!data.isLoggedIn) {
          alert('You are not logged in. Please log in to proceed.');
          return;
        }
      } catch (err) {
        console.error('Error checking session status:', err);
        alert('Unable to verify login status.');
        return;
      }

      window.location.href = '/order-details';
    });
  }

  function updateTotal(items) {
    let total = 0;
    items.forEach(item => {
      total += (item.price * item.quantity);
    });
    cartTotalEl.textContent = total.toFixed(2);
  }

  function renderCartItems(items) {
    cartItemsContainer.innerHTML = '';

    if (!items || items.length === 0) {
      cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
      cartTotalEl.textContent = '0.00';
      return;
    }

    items.forEach(item => {
      const cartItemDiv = document.createElement('div');
      cartItemDiv.classList.add('cart-item');

      const detailsDiv = document.createElement('div');
      detailsDiv.classList.add('cart-item-details');

      const titleEl = document.createElement('div');
      titleEl.classList.add('cart-item-title');
      titleEl.textContent = item.title || 'Unnamed Item';

      const priceEl = document.createElement('div');
      priceEl.classList.add('cart-item-price');
      priceEl.textContent = `$${item.price} x ${item.quantity}`;

      detailsDiv.appendChild(titleEl);
      detailsDiv.appendChild(priceEl);

      const removeBtn = document.createElement('button');
      removeBtn.classList.add('remove-button');
      removeBtn.type = 'button';
      removeBtn.textContent = 'Remove';

      removeBtn.addEventListener('click', async () => {
        try {
          const response = await fetch('/cartDeleteProduct', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productId: item._id })
          });

          if (!response.ok) {
            throw new Error(`Failed to remove item. Status: ${response.status}`);
          }

          await loadCart();
        } catch (err) {
          console.error('Error removing item:', err);
          alert('Error removing item: ' + err.message);
        }
      });

      cartItemDiv.appendChild(detailsDiv);
      cartItemDiv.appendChild(removeBtn);
      cartItemsContainer.appendChild(cartItemDiv);
    });

    updateTotal(items);
  }

  async function loadCart() {
    try {
      const response = await fetch('/api/cart', {
        method: 'GET',
        credentials: 'include'
      });

      if (!response.ok) {
        console.error('Cart request failed:', response.status);
        if (response.status === 401) {
          cartItemsContainer.innerHTML = '<p>Please log in to see your cart.</p>';
        } else {
          cartItemsContainer.innerHTML = '<p>Your cart is empty or unauthorized.</p>';
        }
        cartTotalEl.textContent = '0.00';
        cartItemsData = [];
        return;
      }

      const data = await response.json();
      cartItemsData = data.cart; 
      renderCartItems(cartItemsData);
    } catch (err) {
      console.error('Error fetching cart:', err);
      cartItemsContainer.innerHTML = '<p>Unable to fetch cart data.</p>';
      cartTotalEl.textContent = '0.00';
      cartItemsData = [];
    }
  }

  loadCart();
});
