var menu, menuApp;

menuApp = function() {
  var api, coverCurtainClick, hideMobileMenu, hideMobileNav, menuCurtainClick, showMobileMenu, showMobileNav, showSubmenu;
  api = {};
  showSubmenu = function() {
    return $(".js-submenu-opener > a").on("click", function(e) {
      e.preventDefault();
      return $(this).parent("li").toggleClass("mod-is-opened");
    });
  };
  showMobileMenu = function() {
    return $("#js-mobile-menu-opener").on("click", function(e) {
      e.preventDefault();
      hideMobileNav();
      return $("body").toggleClass("mod-mobile-menu-open");
    });
  };
  hideMobileMenu = function() {
    return $("body").removeClass("mod-mobile-menu-open");
  };
  showMobileNav = function() {
    return $("#js-mobile-nav-opener").on("click", function(e) {
      e.preventDefault();
      hideMobileMenu();
      return $("body").toggleClass("mod-mobile-nav-open");
    });
  };
  hideMobileNav = function() {
    return $("body").removeClass("mod-mobile-nav-open");
  };
  menuCurtainClick = function() {
    return $("#js-menu-curtain").on("click", function(e) {
      e.preventDefault();
      hideMobileMenu();
      return hideMobileNav();
    });
  };
  coverCurtainClick = function() {
    return $(".cover-curtain, .cover-close").on("click", function(e) {
      e.preventDefault();
      return $("body").removeClass("cover-active");
    });
  };
  api.init = function() {
    showSubmenu();
    showMobileMenu();
    showMobileNav();
    menuCurtainClick();
    return coverCurtainClick();
  };
  return api;
};

menu = menuApp();

menu = menu.init();
