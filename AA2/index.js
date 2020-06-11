// find viewing window height and apply it to splash video
function windowH() {
    var wH = $(window).height();

    $('#cover').css({
        height: wH
    });
}
// execute the code
windowH();


// load video on page load
$(window).on('load', function () {
    //////code to call//////
    $("#P1").YTPlayer();
    $(".loader .inner").fadeOut(800, function () {
        $(".loader").fadeOut(900);
    });
});



// things done when the document is ready
$(document).ready(function () {

    // sets the typing text for the splash page
    $('.demo').textyle({
        duration: 100,
        delay: 120,
        easing: 'swing',
        callback: function () {
            $(this).css({
                color: 'white',
                transition: '1s',
            });
        }
    });

    var mySwiper = new Swiper('.swiper-container', {
        init: true,
        loop: true,
        grabCursor: true,
        spaceBetween: 0,
        slidesPerView: 8
        // options here
    })

    // sets the animation of the text on the screen
    $('.transition').smoove({
        offset: 150,
        opacity: 0,
        transition: "all 1s ease, opacity 1.5s ease",
        transformStyle: 'preserve-3d',
        transformOrigin: false,
        perspective: 1000,
        min_width: 768,
        min_height: false
    });

    // sets the smooth transition when links are clicked on navbar
    $("#navigation li a").click(function (e) {
        e.preventDefault();

        var targetElement = $(this).attr("href");
        var targetPosition = $(targetElement).offset().top;
        $("html, body").animate({
            scrollTop: targetPosition - 75
        }, "slow")
    });

    // sets a fixed "sticky" nav once we scroll far enough down the page
    const nav = $("#navigation");
    const navTop = nav.offset().top;

    $(window).on("scroll", stickyNavigation);

    function stickyNavigation() {

        var body = $("body");

        if ($(window).scrollTop() >= navTop) {
            body.css("padding-top", nav.outerHeight() + "px");
            body.addClass("fixedNav");
        } else {
            body.css("padding-top", 0);
            body.removeClass("fixedNav");
        }

    }

    // in case we want to add a slider
    var mySwiper = new Swiper('.swiper-container', {
        slidesPerView: 1
    });

    // modals for info on each coach when clicked (view their profile)
    $('a.open-modal').click(function (event) {
        $(this).modal({
            fadeDuration: 250
        });
        return false;
    });

    // var gallery = $('.gallery a').simpleLightbox({});



});