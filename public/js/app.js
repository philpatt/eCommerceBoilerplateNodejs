console.log('app.js loaded..')

// Nav UX/UI logic
// load mobile nav

const $burger = $('.burger');
const $nav = $('.nav__list');
const $navLinks = $('.nav__link');
let animateLinks = false;

$burger.click(function(){
    console.log('start', animateLinks)

    // toggle active
    $nav.toggleClass('nav__list--active');

    // burger animation
    $burger.toggleClass('burger--active');


    // link animation
    // animateLinks = !animateLinks;
    // $navLinks.each((i, link) => {
    //     if(link.style.animation) {
    //         link.style.animation = '';
    //     } else {
    //         link.style.animation = `navLinkFadeIn 0.5s ease forwards ${i / 5 + 0.1}s`;
    //     }
    // });




});
$()
// reset active nav if outside of mobile and nav is active
$(window).resize(function(){
    if ($(window).width() > 991 && $('burger--active') ) {

        $burger.removeClass('burger--active');
        $nav.removeClass('nav__list--active');

        $navLinks.each((i, link) => {
            link.style.animation ? 
                link.style.animation = '' :
                false;
            });
    }
})