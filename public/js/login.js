async function postUser(event) {
  event.preventDefault();
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  try {
    const response = await fetch('/login-api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include', 
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Invalid email or password');
    }

    sessionStorage.setItem('email', email);
    sessionStorage.setItem('loggedIn', true);
    
    window.location.href = '/';
  
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}

const form = document.querySelector('form');
if (form) {
  form.addEventListener('submit', postUser);
}