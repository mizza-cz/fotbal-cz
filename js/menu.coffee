menuApp = ->
	api = {}

	showSubmenu = ->
		$(".js-submenu-opener > a").on "click", (e) ->
			e.preventDefault()
			$(this).parent("li").toggleClass "mod-is-opened"

	showMobileMenu = ->
		$("#js-mobile-menu-opener").on "click", (e) ->
			e.preventDefault()
			# if Modernizr.mq('only screen and (max-width: 970px)')
			hideMobileNav()
			$("body").toggleClass "mod-mobile-menu-open"

	hideMobileMenu = ->
		$("body").removeClass "mod-mobile-menu-open"

	showMobileNav = ->
		$("#js-mobile-nav-opener").on "click", (e) ->
			e.preventDefault()
			# if Modernizr.mq('only screen and (max-width: 970px)')
			hideMobileMenu()
			$("body").toggleClass "mod-mobile-nav-open"

	hideMobileNav = ->
		$("body").removeClass "mod-mobile-nav-open"

	menuCurtainClick = ->
		$("#js-menu-curtain").on "click", (e) ->
			e.preventDefault()
			hideMobileMenu()
			hideMobileNav()

	coverCurtainClick = ->
		$(".cover-curtain, .cover-close").on "click", (e) ->
			e.preventDefault()
			# Cookies.set('cover', 'disabled', {expires: 365});
			$("body").removeClass "cover-active"

	# ieVersion = ->
	# 	IE = (!! window.ActiveXObject && +(/msie\s(\d+)/i.exec(navigator.userAgent)[1])) || NaN;

	api.init = ->
		showSubmenu()
		showMobileMenu()
		showMobileNav()
		menuCurtainClick()
		coverCurtainClick()

	api

menu = menuApp()
menu = menu.init()