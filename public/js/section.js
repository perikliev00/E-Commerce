document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const navbar = document.getElementById('navbar');
  if (navToggle && navbar) {
    navToggle.addEventListener('click', () => {
      navbar.classList.toggle('open');
    });
  }

  const initialPage = getPageFromURL();


  if (!window.history.state) {
    window.history.replaceState({ page: initialPage }, '', setPageParamInURL(initialPage));
  }

  fetchPage(initialPage, true);

  window.addEventListener('popstate', (event) => {
    const state = event.state;
    const page = state && typeof state.page === 'number' ? state.page : getPageFromURL();
    fetchPage(page, true);
  });
});

function getPageFromURL() {
  const params = new URLSearchParams(window.location.search);
  const pageParam = parseInt(params.get('page'), 10);
  return isNaN(pageParam) ? 1 : pageParam;
}

function setPageParamInURL(page) {
  const params = new URLSearchParams(window.location.search);
  params.set('page', page);
  return `${window.location.pathname}?${params.toString()}`;
}

/**
 * @param {Number} page  Which page number to load (default=1)
 * @param {Boolean} skipPush If true, do NOT pushState this navigation
 */
async function fetchPage(page = 1, skipPush = false) {
  if (!skipPush) {
    pushPageState(page);
  }

  const endpoint = getBackendEndpoint();
  await fetch(`${endpoint}?page=${page}`)
    .then((res) => {
      if (!res.ok) {
        return res.text().then((text) => {
          throw new Error(`Fetch error (${res.status}): ${text}`);
        });
      }
      return res.json();
    })
    .then((data) => {
      const heroTitle = document.querySelector('.hero h1');
      const heroDesc = document.querySelector('.hero p');
      if (heroTitle) heroTitle.textContent = data['description-title'] || 'No Title';
      if (heroDesc) heroDesc.textContent = data.description || 'No description';

      renderProducts(data.products);

      renderPagination(data);
    })
    .catch((err) => {
      console.error('Error fetching data:', err);
    });
}


function pushPageState(page) {
  const newUrl = setPageParamInURL(page);
  window.history.pushState({ page }, '', newUrl);
}


function getBackendEndpoint() {
  const path = window.location.pathname;

  if (path === '/cpu') return '/api/cpus';
  if (path === '/ram') return '/api/ram';
  if (path === '/cores') return '/api/cores';
  if (path === '/cooling-systems') return '/api/cooling';
  if (path === '/graphics-card') return '/api/graphics-card';
  if (path === '/other-pc-parts') return '/api/other-pc-parts';
  if (path === '/storage') return '/api/storage';
  if (path === '/power-supply') return '/api/power-supply';
  if (path === '/pc-cases') return '/api/pc-cases';

  return '/api/home';
}


function renderProducts(products) {
  const cardsContainer = document.getElementById('cards');
  if (!cardsContainer) return;

  cardsContainer.innerHTML = '';

  if (!products || products.length === 0) {
    cardsContainer.innerHTML = '<p>No products found.</p>';
    return;
  }

  const currentCategory = window.location.pathname.slice(1) || 'home';

  products.forEach(prod => {
    const title = prod.productTitle || 'No Title';
    const description = prod.productDescription || 'No description available.';
    const imageUrl = prod.imageUrl || 'https://via.placeholder.com/400x250';
    const productId = prod._id || '';
    const priceVal = typeof prod.price === 'number' ? prod.price.toFixed(2) : '0.00';

    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';

    const img = document.createElement('img');
    img.className = 'card-img';
    img.src = imageUrl;
    img.alt = title;
    img.loading = 'lazy';
    cardDiv.appendChild(img);

    const h2 = document.createElement('h2');
    h2.textContent = title;
    cardDiv.appendChild(h2);

    const p = document.createElement('p');
    p.textContent = description;
    cardDiv.appendChild(p);

    const priceElem = document.createElement('p');
    priceElem.className = 'price';
    priceElem.textContent = 'Price: $' + priceVal;
    cardDiv.appendChild(priceElem);

    const btnContainer = document.createElement('div');
    btnContainer.className = 'card-buttons';

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/postCart';

    const hiddenId = document.createElement('input');
    hiddenId.type = 'hidden';
    hiddenId.name = 'productId';
    hiddenId.value = productId;
    form.appendChild(hiddenId);

    const hiddenTitle = document.createElement('input');
    hiddenTitle.type = 'hidden';
    hiddenTitle.name = 'productTitle';
    hiddenTitle.value = title;
    form.appendChild(hiddenTitle);

    const hiddenPrice = document.createElement('input');
    hiddenPrice.type = 'hidden';
    hiddenPrice.name = 'price';
    hiddenPrice.value = priceVal;
    form.appendChild(hiddenPrice);

    const hiddenCategory = document.createElement('input');
    hiddenCategory.type = 'hidden';
    hiddenCategory.name = 'category';
    hiddenCategory.value = currentCategory;
    form.appendChild(hiddenCategory);

    const cartBtn = document.createElement('button');
    cartBtn.type = 'submit';
    cartBtn.className = 'cart-btn';
    cartBtn.textContent = 'Add to Cart';
    form.appendChild(cartBtn);

    const detailsBtn = document.createElement('button');
    detailsBtn.type = 'button';
    detailsBtn.className = 'details-btn';
    detailsBtn.textContent = 'Details';
    detailsBtn.style.marginLeft = '10px'; 
    detailsBtn.addEventListener('click', () => {
      window.location.href = `/productDetails/${productId}?category=${encodeURIComponent(currentCategory)}`;
    });
    form.appendChild(detailsBtn);

    btnContainer.appendChild(form);
    cardDiv.appendChild(btnContainer);
    cardsContainer.appendChild(cardDiv);
  });
}

function renderPagination(data) {
  const paginationContainer = document.getElementById('pagination');
  if (!paginationContainer) return;

  paginationContainer.innerHTML = '';

  if (data.hasPreviousPage) {
    const prevLink = document.createElement('a');
    prevLink.href = '#cards';
    prevLink.textContent = '«';
    prevLink.addEventListener('click', (e) => {
      e.preventDefault();
      fetchPage(data.previousPage);
    });
    paginationContainer.appendChild(prevLink);
  }

  const currentPageLink = document.createElement('a');
  currentPageLink.href = '#cards';
  currentPageLink.classList.add('active');
  currentPageLink.textContent = data.currentPage;
  paginationContainer.appendChild(currentPageLink);

  if (data.hasNextPage) {
    const nextLink = document.createElement('a');
    nextLink.href = '#cards';
    nextLink.textContent = '»';
    nextLink.addEventListener('click', (e) => {
      e.preventDefault();
      fetchPage(data.nextPage);
    });
    paginationContainer.appendChild(nextLink);
  }
}
