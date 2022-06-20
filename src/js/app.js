
if ($('.homepage').length > 0) {
    new Swiper(".hero-carousel", {
        slidesPerView: 1,
        effect: "fade",
        autoplay: true,
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
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 16
            }, 1024: {
                slidesPerView: 3,
                spaceBetween: 16
            }
        }
    });
    ClientSwiper()
    ScrollToDown('.down-arrow svg', '.who-we-are')
}
if ($('.aboutus').length > 0) {
    ClientSwiper()
    ScrollToDown('.down-arrow', '.our-mission')
}
if ($('.services').length > 0) {
    ScrollToDown('.down-arrow', '.headline-para')
    FaqAnswers()
}
if ($('.services-inner').length > 0) {
    ScrollToDown('.down-arrow', '.tab-sec')
    FaqAnswers()
}
function ClientSwiper() {
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

// Tabs
function SelectTabs() {
    $('.tab-items a').on('click', function () {
        $('.tab-items li').removeClass('active')
        $(this).parent().addClass('active')
        $(`.tab-content > .content`).removeClass('show')
        let clickedData = $(this).parent().data('id')
        $(`.tab-content > .content[data-id=${clickedData}]`).addClass('show')
    })
}
SelectTabs()
// Faqs
function FaqAnswers() {
    $('.question-box').on('click', function () {
        let currentQuestionDataId = $(this).data('target')
        $(this).toggleClass('active')
        $(`.answer[data-target=${currentQuestionDataId}]`).slideToggle()
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

// Header burgerMenu
$(".burger2").on('click', function () {
    $(".burger2").toggleClass("open");
    $('.header-box nav').toggleClass('show-nav')
})

// Sub-menus{}
$('.client-portal').on('click', function () {
    $('.submenu').slideToggle()
    $(this).toggleClass('rotate')
})