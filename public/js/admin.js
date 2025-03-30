document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/orders')
      .then(res => {
        if (!res.ok) {
          throw new Error(`Failed to fetch orders: ${res.status}`);
        }
        return res.json();
      })
      .then(orders => {
        const ordersBody = document.getElementById('ordersBody');
        if (!ordersBody) return;
  
        ordersBody.innerHTML = '';
  
        orders.forEach(order => {
          let itemsDisplay = '';
          if (Array.isArray(order.items) && order.items.length > 0) {
            itemsDisplay = order.items
              .map(item => `${item.title} (x${item.quantity})`)
              .join('<br>');
          }
  
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${order._id}</td>
            <td>${order.name}</td>
            <td>${order.email}</td>
            <td>${order.phone}</td>
            <td>${order.address}</td>
            <td>${order.postalCode || ''}</td>
            <td>${itemsDisplay}</td>
            <td>${order.notes || ''}</td>
            <td>$${order.totalPrice.toFixed(2)}</td>
            <td>${new Date(order.createdAt).toLocaleString()}</td>
            <td>
              <!-- Anchor link styled like a button -->
              <a 
                href="/api/orders/${order._id}"
                class="delete-link delete-btn"
                data-id="${order._id}"
              >
                Delete
              </a>
            </td>
          `;
          const deleteLink = row.querySelector('.delete-link');
          deleteLink.addEventListener('click', (event) => {
            event.preventDefault(); 
  
            const orderId = deleteLink.dataset.id; 
            const deleteUrl = `/api/orders/${orderId}`;
  
            fetch(deleteUrl, { method: 'DELETE' })
              .then(res => {
                if (!res.ok) {
                  throw new Error(`Delete request failed: ${res.status}`);
                }
                row.remove();
              })
              .catch(err => console.error('Error deleting order:', err));
          });
  
          ordersBody.appendChild(row);
        });
      })
      .catch(err => console.error('Error loading orders:', err));
  });