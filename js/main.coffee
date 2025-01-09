adjustMenu = ->
	col = $("#js-col-right")
	if col[0]
		top = col.offset().top
		scroll = $(window).scrollTop()
		screenWidth = $(window).width()
		menu = $("#js-nav-left")

		if screenWidth >= 750
			if scroll > top
				menu.css "top", "0px"
			else
				menu.css "top", "#{top - scroll}px" 
		else
			menu.css "top", "#{top}px"

selectpickerDefaults = {
		mobile: true,
		style: 'mod-white',
		title: null,
		noneSelectedText: '----'
	}

initSelect = ->
	$("select").selectpicker(selectpickerDefaults);	
	$(".form-select").selectpicker(selectpickerDefaults);	
	$(".dropdown-toggle").selectpicker(selectpickerDefaults);	

initNetteAjax = ->
	$.nette.init()
	$('#ajax-spinner').html('<div class="loader"></div><span class="loader-title">Probíhá načítání</span>')

initTableSort = ->
	tsorter.create('tsorter-tournament-stats-0')
	tsorter.create('tsorter-tournament-tournament-1')
	tsorter.create('tsorter-tournament-table-2')

initMagnificPopup = ->
	$(".magnific-popup").magnificPopup({
  		type: 'image'
	})

initRWDimageMaps = ->
	if $("img.usemap").length then $("img.usemap").rwdImageMaps()

(($) ->
	$(window).on "load scroll resize", ->
		adjustMenu()
) jQuery

(($) ->
	$(window).on "load", ->
		initSelect()
		initNetteAjax()
		initTableSort()
		initMagnificPopup()
		initRWDimageMaps()
) jQuery
