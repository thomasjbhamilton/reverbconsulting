$(document).ready(function(){const e=$(".nav-link"),t=$(".nav-modal__link-description");window.location.pathname;$("#menuButton").on("click",function(){$(".nav-modal").fadeIn()}),$("#closeMenuButton").on("click",function(){$(".nav-modal").fadeOut()}),e.hover(function(){var e=$(this).text().trim();switch(e){case"home":t.text("Return home.");break;case"services":t.text("See our services.");break;case"about":t.text("Learn more about us.");break;case"blog":t.text("Read our musings.");break;case"contact":t.text("Get in touch.")}})});