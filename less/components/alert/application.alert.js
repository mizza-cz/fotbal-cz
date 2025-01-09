/**
	Alert 

	Blok výstrahy
	- package: Fotbal.cz
	- author: eSports.cz, s.r.o. - Michal Kobelka michalkobelka@gmail.com
	- author: eSports.cz, s.r.o. - Petr Kysela petr@kysela.biz
*/

(function($, app) {
	'use strict';
	
	app.alertFadeOut = function(element) {
		$(element).parent().fadeOut();
	}

})(jQuery, app);