/**
	Same height

	Funkce pro sjednocení výšky vybraných elementů,
	daným elementům stačí přiřadit data atribut s breakpointem data-sameheight="medium"

	- package: Fotbal.cz
	- author: eSports.cz, s.r.o. - Petr Kysela <petr@kysela.biz>
*/

(function($, app) {
	'use strict';
	
	app.sameHeight = {

		init: function() {
			var $elements = $('[data-sameheight]'),
				newHeight = 0;

			$elements.each(function(){
				var thisHeight = $(this).outerHeight();
				(thisHeight > newHeight) ? newHeight = thisHeight : null;
			});

			$elements.each(function(){
				var $element = $(this),
					breakpoint = $element.data('sameheight');
					
				if (app.breakpoints[breakpoint] > $(window).width()) {
					newHeight = 0;
				} 
				$(this).css({minHeight: newHeight});

			});
		}
	}

})(jQuery, app);

$(window).on("load resize",function(e){
    app.sameHeight.init();
});