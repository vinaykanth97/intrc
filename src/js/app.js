
if ($('.homepage').length > 0) {
    new Swiper(".hero-carousel", {
        slidesPerView: 1,
        effect: "fade",
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
    new Swiper(".testimonials", {
        slidesPerView: 3,
        spaceBetween: 16,
        navigation: {
            nextEl: '.swiper-button-next-unique',
            prevEl: '.swiper-button-prev-unique'
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
    new Swiper(".client-partner-slider", {
        slidesPerView: 3,
        spaceBetween: 16,
        navigation: {
            nextEl: '.swiper-button-next-unique',
            prevEl: '.swiper-button-prev-unique'
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
    ScrollToDown('.down-arrow', '.who-we-are')
}

function ScrollToDown(element, downElement) {
    $(element).on('click', function () {
        let nextSec = $(downElement).offset().top - $('header').height()
        window.scrollTo({
            top: nextSec,
            behavior: 'smooth'
        })
    })
}

// Header scroll
function ScrollActiveHeader() {
    let header = document.querySelector('header')
    window.pageYOffset > 100 ? header.classList.add('active') : header.classList.remove('active')
}
ScrollActiveHeader()
window.addEventListener('scroll', () => {
    ScrollActiveHeader()
})