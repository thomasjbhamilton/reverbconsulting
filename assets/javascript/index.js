$(document).ready(function(){

  const navLink = $('.nav-link');
  const linkDescription = $('.nav-modal__link-description');
  const url = window.location.pathname;

  $('#menuButton').on('click', function(){
    $('.nav-modal').fadeIn();
    $('body').css('overflow', 'hidden');
  })

  $('#closeMenuButton').on('click', function(){
    $('.nav-modal').fadeOut();
    $('body').css('overflow', 'auto');
  })

  $('#closeModalButton').on('click', function(){
    $('.contact-modal').fadeOut();
  })

  $('#to-top').on('click', function(){
    $("html, body").animate({ scrollTop: 0 }, "slow");
  })

  navLink.hover(function(){
    var text = $(this).text().trim();

    switch (text) {
      case 'home':
        linkDescription.text('Return home.')
        break;

      case 'services':
        linkDescription.text('See our services.')
        break;

      case 'about':
        linkDescription.text('Learn more about us.')
        break;

      case 'blog':
        linkDescription.text('Read our musings.')
        break;

      case 'contact':
        linkDescription.text('Get in touch.')
        break;
    }
  })



})
