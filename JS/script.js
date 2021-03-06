$(window).on("load", function () {
    // load icon
    $(".loader .inner").fadeOut(500, function () {
        $(".loader").fadeOut(700);
    });

    // fancy slides and transitions for the portfolio section
    $(".items").isotope({
        filter: '*',
        animationOptions: {
            duration: 1500,
            easing: "linear",
            queue: false
        }
    });
})

$(document).ready(function () {
    // slides on the splash page
    $('#slides').superslides({
        animation: "fade",
        play: 5000,
        pagination: false
    });

    // splash page text
    var typed = new Typed(".typed", {
        strings: ["Software Developer", "Coach"],
        typeSpeed: 80,
        loop: true,
        startDelay: 1000,
        showCursor: false
    });

    // Skills Section -- responsive carousel slider
    $('.owl-carousel').owlCarousel({
        loop: true,
        items: 6,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            480: {
                items: 2
            },
            768: {
                items: 4
            },
            938: {
                items: 6
            }
        }
    });


    // optional animations for skills and stats below
    var skillsTopOffset = $(".skillsSection").offset().top;
    var statsTopOffset = $(".statsSection").offset().top;
    var countFinished = false;

    $(window).scroll(function () {
        if (window.pageYOffset > skillsTopOffset - $(window).height() + 200) {
            $('.chart').easyPieChart({
                easing: "easeInOut",
                barColor: "white",
                trackColor: false,
                scaleColor: false,
                lineWidth: 4,
                size: 152,
                onStep: function (from, to, percent) {
                    $(this.el).find('.percent').text(Math.round(percent));
                }
            });

        }
        if (!countFinished && window.pageYOffset > statsTopOffset - $(window).height() + 200) {
            $('.counter').each(function () {
                $(this).prop('Counter', 0).animate({
                    Counter: $(this).text()
                }, {
                    duration: 1000,
                    easing: 'swing',
                    step: function (now) {
                        $(this).text(Math.ceil(now));
                    }
                });
            });
            countFinished = true;
        }
    });

    // Making a fancy box section with portfolio
    $("[data-fancybox]").fancybox();


    // toggles which icons are shown
    $("#filters a").click(function () {
        $("#filters .current").removeClass("current");
        $(this).addClass("current");

        var selector = $(this).attr("data-filter");

        $(".items").isotope({
            filter: selector,
            animationOptions: {
                duration: 1500,
                easing: "linear",
                queue: false
            }
        });

        return false;

    });

    // Navigation link click smooth scrolling
    $("#navigation li a").click(function (e) {
        e.preventDefault();

        var targetElement = $(this).attr("href");
        var targetPosition = $(targetElement).offset().top;
        $("html, body").animate({
            scrollTop: targetPosition - 50
        }, "slow")
    });

    // sticky navigaation once scrolled past
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
});