const navToggle = document.getElementById('navToggle');
  const navbar = document.getElementById('navbar');

  navToggle.addEventListener('click', () => {
    navbar.classList.toggle('open');
  });
