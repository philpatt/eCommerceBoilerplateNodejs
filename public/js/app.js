console.log('app.js loaded..')

// Nav UX/UI logic
// load mobile nav

const $burger = $('.burger')
const $nav = $('.nav__list')
const $navLinks = $('.nav__link')

$burger.click(function(){
    // toggle active
    $nav.toggleClass('nav__list--active');

    // burger animation
    $burger.toggleClass('burger--active');


    // fade in links
    $navLinks.each((i, link) => {
        if(link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${i / 5 + 0.1}s`;
        }
    });


});

// reset active nav if outside of mobile and nav is active
$(window).resize(function(){
    console.log('ww = ', $(window).width())
    if ($(window).width() > 768 && $('burger--active') ) {

        $burger.removeClass('burger--active');
        $nav.removeClass('nav__list--active');

        $navLinks.each((i, link) => {
            link.style.animation ? 
                link.style.animation = '' :
                false;
            });
    }
})