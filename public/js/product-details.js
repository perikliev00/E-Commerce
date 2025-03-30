const pathParts = window.location.pathname.split('/');
const productId = pathParts[pathParts.length - 1];

const params = new URLSearchParams(window.location.search);
const category = params.get('category') || 'home';

function getProductEndpoint(productId, category) {
  return `/api/productDetails/${productId}/${encodeURIComponent(category)}`;
}

const endpoint = getProductEndpoint(productId, category);

fetch(endpoint)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error fetching product details: ${response.status}`);
    }
    return response.json();
  })
  .then(product => {
    document.getElementById('product-title').textContent = product.productTitle || "No Title";
    let imageUrl = product.imageUrl || "https://via.placeholder.com/400x250";
    if (!imageUrl.startsWith('/')) {
      imageUrl = '/' + imageUrl;
    }
    document.getElementById('product-image').src = imageUrl;
    
    document.getElementById('product-description').textContent = product.productDescription || "No description available.";

    const specsDiv = document.getElementById('specifications');
    specsDiv.innerHTML = "";
    const basicFields = ['_id', 'productTitle', 'productDescription', 'price', 'imageUrl'];
    for (let key in product) {
      if (product.hasOwnProperty(key) && !basicFields.includes(key) && product[key]) {
        let p = document.createElement('p');
        let displayKey = key.charAt(0).toUpperCase() + key.slice(1);
        p.textContent = `${displayKey}: ${product[key]}`;
        specsDiv.appendChild(p);
      }
    }

    document.getElementById('product-details').textContent = product.productDetails || "";
    document.getElementById('cart-product-id').value = productId;
    document.getElementById('cart-product-title').value = product.productTitle || "";
    document.getElementById('cart-product-price').value = product.price || "";
    document.getElementById('cart-category').value = category;
    if (product.price !== undefined) {
      document.getElementById('product-price').textContent = `Price: $${product.price}`;
    }
  })
  .catch(err => {
    console.error(err);
    document.getElementById('product-title').textContent = "Error loading product details";
  });

const navToggle = document.getElementById('navToggle');
const navbar = document.getElementById('navbar');
if (navToggle && navbar) {
  navToggle.addEventListener('click', () => {
    navbar.classList.toggle('open');
  });
}
