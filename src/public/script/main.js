document.querySelector('.date').textContent = new Date().getFullYear();

const navBar = document.querySelector('.bar');
const nav = document.querySelector('.nav');

navBar.addEventListener('click', () => {
    nav.classList.toggle('show');
    navBar.classList.toggle('active');
});