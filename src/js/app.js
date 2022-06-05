
if ($('.homepage').length > 0) {
    new Swiper(".hero-carousel", {
        slidesPerView: 1,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        preloadImages: true,
        lazyLoading: true,
        lazy: {
            loadPrevNext: true,
            loadPrevNextAmount: 1
        }
    });
}

// Header scroll
window.addEventListener('scroll', () => {
    let header = document.querySelector('header')
    window.pageYOffset > 100 ? header.classList.add('active') : header.classList.remove('active')
})