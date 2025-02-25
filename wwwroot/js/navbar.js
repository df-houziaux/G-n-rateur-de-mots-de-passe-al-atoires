
// ajouter un effet de défilement lorsque la navbar devient sticky
window.onscroll = function () {
    const navbar = document.querySelector('.custom-navbar');
    if (window.scrollY > 0) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
};

