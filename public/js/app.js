console.log('app.js loaded..')


// load mobile nav
const $burger = $('.burger')
const $nav = $('.nav__list')
const $navLinks = $('.nav__link')
$burger.click(function(){
    // toggle active
    $nav.toggleClass('nav__list--active');

    // fade in links
    $navLinks.each((i, link) => {
        if(link.style.animation) {
            console.log('remove animation')
            link.style.animation = ''
        } else {
            console.log('add animation')
            link.style.animation = `navLinkFade 0.5s ease forwards ${i / 5 + 0.1}s`;
        }
    });

    // burger animation
    $burger.toggleClass('burger--active');
});