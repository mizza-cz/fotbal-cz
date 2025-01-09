/*!
 * nav.js
 */
(function () {
  // Toggle nav
  const header = document.getElementById("js-header");
  const headerNavPrimary = document.getElementById("js-header-navPrimary");
  const headerSearch = document.getElementById("js-headerSearch");
  const headerSearchMobileContainer = document.getElementById("js-headerSearchMobileContainer");
  const nav = document.getElementById("js-nav");
  const navButton = document.getElementById("js-nav-toggle");

  const isActive = "is-active";
  const isMenuOpen = "is-menuOpen";

  const mqMobileNav = "(min-width: 1201px)";
  const mqMobileNavMethod = window.matchMedia(mqMobileNav);

  if (headerSearch && headerSearchMobileContainer && headerNavPrimary) {
    const handleViewportChange = (ev) => {
      if (ev.media === mqMobileNav) {
        if (ev.matches) {
          headerNavPrimary.appendChild(headerSearch);
          root.style.setProperty("--header-height", header.offsetHeight + "px");
        } else {
          headerSearchMobileContainer.appendChild(headerSearch);
          root.style.setProperty("--header-height", header.offsetHeight + "px");
        }
      }
    };

    mqMobileNavMethod.addEventListener("change", handleViewportChange);
    handleViewportChange(mqMobileNavMethod);
  }

  // Match calendar top offset
  root.style.setProperty("--header-height", header.offsetHeight + "px");

  const inactiveNav = () => {
    // Fix Headroom bug on page with custom scrollbar
    // header && header.classList.remove("is-pinned");

    nav.classList.remove(isActive);
    // nav.style.top = "100%";
    // nav.style.height = "auto";
    navButton.classList.remove(isActive);
    navButton.setAttribute("aria-expanded", false);
    document.body.classList.remove(isMenuOpen);
  };

  if (nav && navButton) {
    navButton.addEventListener("click", () => {
      // Fix Headroom bug on page with custom scrollbar
      // header && header.classList.toggle("is-pinned");

      // Get top position relative to the viewport for calculate nav height
      // const navOffsetTop = nav.getBoundingClientRect().top;
      // nav.style.top = `${navOffsetTop}px`;
      // nav.style.height = `calc(100% - ${navOffsetTop}px)`;

      nav.classList.toggle(isActive);
      navButton.classList.toggle(isActive);
      navButton.setAttribute("aria-expanded", nav.classList.contains(isActive));
      document.body.classList.toggle(isMenuOpen, nav.classList.contains(isActive));

      // if (!nav.classList.contains(isActive)) {
      //   nav.style.top = "100%";
      //   nav.style.height = "auto";
      // }
    });

    document.addEventListener("click", (ev) => {
      if (nav.classList.contains(isActive) && !nav.contains(ev.target) && !navButton.contains(ev.target)) {
        inactiveNav();
      }
    });

    document.addEventListener("keydown", (ev) => {
      if (ev.key === "Escape") {
        inactiveNav();
      }
    });

    window.addEventListener("resize", () => {
      inactiveNav();
    });
  }

  // Toggle submenus
  const subMenuLinks = document.querySelectorAll(".js-subMenu-toggle");

  const inactiveSubMenu = (navItem, subMenuLink, subMenu) => {
    navItem.classList.remove(isActive);
    subMenuLink.classList.remove(isActive);
    subMenuLink.setAttribute("aria-expanded", false);
    subMenu.classList.remove(isActive);
  };

  if (subMenuLinks.length) {
    subMenuLinks.forEach((subMenuLink) => {
      subMenuLink.addEventListener("click", (ev) => {
        ev.preventDefault();

        const navItem = subMenuLink.parentElement;
        const subMenu = subMenuLink.nextElementSibling;

        if (subMenu) {
          console.log(subMenu);
          navItem.classList.toggle(isActive);
          subMenuLink.classList.toggle(isActive);
          subMenu.classList.toggle(isActive);
          console.log(subMenu.classList.contains(isActive));
          subMenuLink.setAttribute("aria-expanded", subMenu.classList.contains(isActive));
        } else {
          return false;
        }

        const onPressEscape = (ev) => {
          if (ev.key === "Escape") {
            if (subMenu.classList.contains(isActive)) {
              inactiveSubMenu(navItem, subMenuLink, subMenu);
            }
            document.removeEventListener("keydown", onPressEscape);
          }
        };

        const onClickOutside = (ev) => {
          if (subMenu.classList.contains(isActive) && !subMenuLink.contains(ev.target) && !subMenu.contains(ev.target)) {
            inactiveSubMenu(navItem, subMenuLink, subMenu);
            document.removeEventListener("click", onClickOutside);
          }
        };

        // document.addEventListener("keydown", onPressEscape);
        // document.addEventListener("click", onClickOutside);
      });
    });
  }

  // Lang switcher
  const langButton = document.getElementById("js-langSwitcher-toggle");
  const langMenu = document.getElementById("js-langSwitcher-menu");

  const inactiveLangMenu = () => {
    langMenu.classList.remove(isActive);
    langButton.setAttribute("aria-expanded", false);
    langButton.classList.remove(isActive);
  };

  if (langButton && langMenu) {
    langButton.addEventListener("click", () => {
      langMenu.classList.toggle(isActive);
      langButton.classList.toggle(isActive);
      langButton.setAttribute("aria-expanded", langMenu.classList.contains(isActive));
    });

    document.addEventListener("click", (ev) => {
      if (langMenu.classList.contains(isActive) && !langButton.contains(ev.target)) {
        inactiveLangMenu();
      }
    });

    document.addEventListener("keydown", (ev) => {
      if (ev.key === "Escape" && langMenu.classList.contains(isActive)) {
        inactiveLangMenu();
      }
    });
  }

  // Match calendar toggle
  const matchCalendarButton = document.getElementById("js-matchCalendar-toggle");
  const matchCalendar = document.getElementById("js-matchCalendar");

  const inactiveMatchCalendar = () => {
    matchCalendar.classList.remove(isActive);
    matchCalendarButton.setAttribute("aria-expanded", false);
    matchCalendarButton.classList.remove(isActive);
    document.body.classList.remove(isMenuOpen);
  };

  if (matchCalendarButton && matchCalendar) {
    matchCalendarButton.addEventListener("click", () => {
      matchCalendar.classList.toggle(isActive);
      matchCalendarButton.classList.toggle(isActive);
      matchCalendarButton.setAttribute("aria-expanded", matchCalendar.classList.contains(isActive));
      document.body.classList.toggle(isMenuOpen);
    });

    document.addEventListener("click", (ev) => {
      if (matchCalendar.classList.contains(isActive) && !matchCalendarButton.contains(ev.target)) {
        inactiveMatchCalendar();
      }
    });

    document.addEventListener("keydown", (ev) => {
      if (ev.key === "Escape" && matchCalendar.classList.contains(isActive)) {
        inactiveMatchCalendar();
      }
    });

    window.addEventListener("resize", () => {
      inactiveMatchCalendar();
    });
  }

  // Side nav toggle
  const sideNavButton = document.getElementById("js-sideNav-toggle");
  const sideNav = document.getElementById("js-sideNav");

  const inactiveSideNav = () => {
    sideNav.classList.remove(isActive);
    sideNavButton.setAttribute("aria-expanded", false);
    sideNavButton.classList.remove(isActive);
    document.body.classList.remove(isMenuOpen);
  };

  if (sideNavButton && sideNav) {
    sideNavButton.addEventListener("click", () => {
      sideNav.classList.toggle(isActive);
      sideNavButton.classList.toggle(isActive);
      sideNavButton.setAttribute("aria-expanded", sideNav.classList.contains(isActive));
      document.body.classList.toggle(isMenuOpen);
    });

    document.addEventListener("click", (ev) => {
      if (sideNav.classList.contains(isActive) && !sideNavButton.contains(ev.target) && !ev.target.closest("#js-sideNav")) {
        inactiveSideNav();
      }
    });

    document.addEventListener("keydown", (ev) => {
      if (ev.key === "Escape" && sideNav.classList.contains(isActive)) {
        inactiveSideNav();
      }
    });

    window.addEventListener("resize", () => {
      inactiveSideNav();
    });
  }
})();
