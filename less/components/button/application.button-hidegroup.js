/**
	Hide group

	Skrýt veškeré vypsané elementy a zneaktivnit tlačítka - primárně určené pro dashboard soutěže
	- package: Fotbal.cz
	- author: eSports.cz, s.r.o. - Petr Kysela petr@kysela.biz
*/

(function($, app) {
	'use strict';
	
	app.hideGroup = function(btn, selector) {
		var container = $(selector),
			buttons = container.find('.btn'),
			lists = container.find('.js-hide'),
			$btnClicked = $(btn);	

		if($btnClicked.hasClass('active')){ return; }

		buttons.each(function(){
			var btn = $(this).removeClass('active');
		});	
		
		lists.each(function(){
			var list = $(this).hide();
		});

	}

})(jQuery, app);