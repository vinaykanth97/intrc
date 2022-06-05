let heroSwiper = new Swiper(".hero-carousel", {
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